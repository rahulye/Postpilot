"use server";

import { db } from "@/lib/db";
import { posts, postTargets, mediaAssets, users } from "@/lib/db/schema";
import { postPublisherQueue } from "@/lib/bullmq/queues";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createPost(formData: {
  content: string;
  platforms: string[];
  mediaIds: string[];
  scheduledAt?: Date;
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  // Get internal user ID
  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (!user) throw new Error("User not found");

  try {
    const postResult = await db.transaction(async (tx) => {
      // 1. Create Post
      const [newPost] = await tx
        .insert(posts)
        .values({
          userId: user.id,
          content: formData.content,
          status: formData.scheduledAt ? "scheduled" : "draft",
          scheduledAt: formData.scheduledAt || null,
        })
        .returning();

      // 2. Create Post Targets (one for each platform)
      // We need to find the social accounts for these platforms
      // For now, we'll assume the user has connected accounts. 
      // In a real app, we'd filter by selected platforms.
      
      // 3. Associate Media
      if (formData.mediaIds.length > 0) {
        for (const mediaId of formData.mediaIds) {
          await tx
            .update(mediaAssets)
            .set({ postId: newPost.id })
            .where(eq(mediaAssets.id, mediaId));
        }
      }

      return newPost;
    });

    // 4. Enqueue to BullMQ
    const delay = formData.scheduledAt 
      ? formData.scheduledAt.getTime() - Date.now() 
      : 0;

    await postPublisherQueue.add(
      "publish-post",
      { postId: postResult.id },
      { delay: Math.max(0, delay) }
    );

    revalidatePath("/dashboard");
    return { success: true, postId: postResult.id };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

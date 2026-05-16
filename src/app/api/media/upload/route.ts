import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { mediaAssets, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: `/postpilot/${user.id}`,
    });

    // Save to DB
    const [asset] = await db
      .insert(mediaAssets)
      .values({
        userId: user.id,
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
        fileName: uploadResponse.name,
        fileType: uploadResponse.fileType,
      })
      .returning();

    return NextResponse.json({
      id: asset.id,
      url: uploadResponse.url,
      thumbnailUrl: uploadResponse.thumbnailUrl,
      fileId: uploadResponse.fileId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

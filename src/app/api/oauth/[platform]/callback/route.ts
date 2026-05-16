import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { socialAccounts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getPlatformConfig } from "@/lib/platforms";

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { platform } = await params;
  const config = getPlatformConfig(platform);

  if (!config) {
    return new NextResponse("Invalid platform", { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse("No code provided", { status: 400 });
  }

  // Get internal user ID
  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (!user) {
    return new NextResponse("User not found in database", { status: 404 });
  }

  // Mock token exchange and account creation
  // In a real app, you'd exchange the code for real tokens
  const mockPlatformAccountId = `pa_${Math.random().toString(36).substring(7)}`;
  const mockPlatformUsername = `${config.name.split(' ')[0]}_User_${Math.random().toString(36).substring(7)}`;

  try {
    await db.insert(socialAccounts).values({
      userId: user.id,
      platform: platform as any,
      platformAccountId: mockPlatformAccountId,
      platformUsername: mockPlatformUsername,
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
      tokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    // Redirect back to accounts page
    return NextResponse.redirect(new URL("/accounts", request.url));
  } catch (error) {
    console.error("Error saving social account:", error);
    return new NextResponse("Error saving account", { status: 500 });
  }
}

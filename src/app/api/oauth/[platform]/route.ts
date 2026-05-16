import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPlatformConfig } from "@/lib/platforms";

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { platform } = await params;
  const config = getPlatformConfig(platform);

  if (!config) {
    return new NextResponse("Invalid platform", { status: 400 });
  }

  // In a real app, you would construct the OAuth URL based on the platform
  // and redirect the user. For this demonstration, we'll redirect to our callback
  // with a mock code to simulate a successful OAuth flow.
  
  const callbackUrl = new URL(`/api/oauth/${platform}/callback`, request.url);
  callbackUrl.searchParams.set("code", "mock_code_" + Math.random().toString(36).substring(7));
  callbackUrl.searchParams.set("state", "mock_state");

  return NextResponse.redirect(callbackUrl);
}

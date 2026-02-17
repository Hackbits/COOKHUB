import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  try {
    console.log("Starting weekly digest generation...");
    // Logic:
    // 1. Fetch popular recipes from the last week
    // 2. Format email/notification content
    // 3. Send to subscribed users

    return NextResponse.json({
      success: true,
      message: "Weekly digest processing started",
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

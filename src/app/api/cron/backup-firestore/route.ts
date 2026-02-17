import { NextRequest, NextResponse } from "next/server";
import { getAdminApp } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  try {
    const app = getAdminApp();
    const client = await app.options.credential?.getAccessToken();
    const accessToken = client?.access_token;

    if (!accessToken) {
      throw new Error("Failed to get access token from service account");
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (!projectId || !bucketName) {
      throw new Error("Missing project ID or storage bucket configuration");
    }

    // Call the Firestore Export REST API
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default):exportDocuments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outputUriPrefix: `gs://${bucketName}/backups/${new Date().toISOString()}`,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Firestore export failed: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, operation: data.name });
  } catch (error: unknown) {
    console.error("Backup cron failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

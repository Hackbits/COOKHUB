import "server-only";
import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Helper to get or initialize the Firebase Admin app
export function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  // Check if we have service account credentials in env
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      "Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable. " +
        "Please add your service account JSON to .env.local or Vercel environment variables.",
    );
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);

    // Fix for private key newline characters in production environments
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(
        /\\n/g,
        "\n",
      );
    }

    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    throw error;
  }
}

export function getAdminFirestore() {
  const app = getAdminApp();
  return getFirestore(app, "default");
}

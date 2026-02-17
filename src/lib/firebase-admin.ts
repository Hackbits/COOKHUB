import "server-only";
import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Helper to get or initialize the Firebase Admin app
export function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  // Check if we have service account credentials in env
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (!serviceAccount) {
    throw new Error(
      "Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable. " +
        "Please add your service account JSON to .env.local or Vercel environment variables.",
    );
  }

  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export function getAdminFirestore() {
  const app = getAdminApp();
  return getFirestore(app);
}

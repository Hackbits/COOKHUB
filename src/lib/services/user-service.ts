/**
 * COOKHUB - User Service (Firestore)
 * Handles user profile CRUD and recipe bookmark/cooked operations.
 * Uses the Firebase Auth UID as the Firestore document ID for O(1) lookups.
 */

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";

export interface FirestoreUser {
  firebaseUid: string;
  name: string;
  fullName: string;
  email: string;
  avatar: string;
  bio?: string;
  savedRecipes: string[];
  cookedRecipes: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

const COLLECTION = "users";

// ---------- READ ----------

export async function getUserByUid(uid: string): Promise<FirestoreUser | null> {
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) return null;
  return { firebaseUid: snap.id, ...snap.data() } as FirestoreUser;
}

// ---------- CREATE ----------

export async function createUser(
  uid: string,
  data: Omit<FirestoreUser, "firebaseUid" | "createdAt" | "updatedAt">,
): Promise<FirestoreUser> {
  const userData = {
    ...data,
    savedRecipes: data.savedRecipes ?? [],
    cookedRecipes: data.cookedRecipes ?? [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(doc(db, COLLECTION, uid), userData);
  return { firebaseUid: uid, ...userData } as FirestoreUser;
}

// ---------- UPDATE ----------

export async function updateUser(
  uid: string,
  data: Partial<Omit<FirestoreUser, "firebaseUid">>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ---------- SAVED RECIPES ----------

export async function toggleSavedRecipe(
  uid: string,
  recipeId: string,
): Promise<{ saved: boolean }> {
  const userDoc = doc(db, COLLECTION, uid);
  const snap = await getDoc(userDoc);

  if (!snap.exists()) throw new Error("User not found");

  const savedRecipes: string[] = snap.data().savedRecipes ?? [];
  const isSaved = savedRecipes.includes(recipeId);

  if (isSaved) {
    await updateDoc(userDoc, {
      savedRecipes: arrayRemove(recipeId),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(userDoc, {
      savedRecipes: arrayUnion(recipeId),
      updatedAt: serverTimestamp(),
    });
  }

  return { saved: !isSaved };
}

// ---------- COOKED RECIPES ----------

export async function markAsCooked(
  uid: string,
  recipeId: string,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, uid), {
    cookedRecipes: arrayUnion(recipeId),
    updatedAt: serverTimestamp(),
  });
}

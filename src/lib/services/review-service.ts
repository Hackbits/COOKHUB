/**
 * COOKHUB - Review Service (Firestore)
 * Handles review CRUD operations.
 */

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import type { Review } from "@/lib/types";

const COLLECTION = "reviews";

// ---------- READ ----------

export async function getReviewsByRecipe(recipeId: string): Promise<Review[]> {
  const q = query(
    collection(db, COLLECTION),
    where("recipeId", "==", recipeId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Review);
}

// ---------- CREATE ----------

export async function addReview(data: Omit<Review, "id">): Promise<Review> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, ...data } as Review;
}

// ---------- DELETE ----------

export async function deleteReview(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

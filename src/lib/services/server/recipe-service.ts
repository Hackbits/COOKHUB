import "server-only";
import { getAdminFirestore } from "@/lib/firebase-admin";
import type { Recipe, Review } from "@/lib/types";

/**
 * Ensures data is a plain object serializable by Next.js Server Components
 */
function serializeData<T>(data: unknown): T {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      // Handle Firestore Timestamps
      if (
        value &&
        typeof value === "object" &&
        "_seconds" in value &&
        "_nanoseconds" in value
      ) {
        return new Date(value._seconds * 1000).toISOString();
      }
      return value;
    }),
  );
}

export async function getServerRecipes(): Promise<Recipe[]> {
  const db = getAdminFirestore();
  const snapshot = await db.collection("recipes").get();
  const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return serializeData<Recipe[]>(data);
}

export async function getServerRecipeById(id: string): Promise<Recipe | null> {
  const db = getAdminFirestore();
  const snap = await db.collection("recipes").doc(id).get();
  if (!snap.exists) return null;
  const data = { id: snap.id, ...snap.data() };
  return serializeData<Recipe>(data);
}

export async function getServerReviewsByRecipe(
  recipeId: string,
): Promise<Review[]> {
  const db = getAdminFirestore();
  const snapshot = await db
    .collection("reviews")
    .where("recipeId", "==", recipeId)
    .get();
  const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return serializeData<Review[]>(data);
}

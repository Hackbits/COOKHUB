import "server-only";
import { getAdminFirestore } from "@/lib/firebase-admin";
import type { Recipe, Review } from "@/lib/types";

export async function getServerRecipes(): Promise<Recipe[]> {
  const db = getAdminFirestore();
  const snapshot = await db.collection("recipes").get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Recipe);
}

export async function getServerRecipeById(id: string): Promise<Recipe | null> {
  const db = getAdminFirestore();
  const snap = await db.collection("recipes").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Recipe;
}

export async function getServerReviewsByRecipe(
  recipeId: string,
): Promise<Review[]> {
  const db = getAdminFirestore();
  const snapshot = await db
    .collection("reviews")
    .where("recipeId", "==", recipeId)
    .get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Review);
}

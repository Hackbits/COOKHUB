/**
 * COOKHUB - Recipe Service (Firestore)
 * Handles all recipe CRUD operations against Cloud Firestore.
 */

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import type { Recipe, Collection } from "@/lib/types";

const COLLECTION = "recipes";

// ---------- READ ----------

export async function getRecipes(filters?: {
  category?: string;
  cuisine?: string;
  search?: string;
}): Promise<Recipe[]> {
  const constraints: ReturnType<typeof where>[] = [];

  if (filters?.category) {
    constraints.push(where("category", "==", filters.category));
  }
  if (filters?.cuisine) {
    constraints.push(where("cuisine", "==", filters.cuisine));
  }

  const q =
    constraints.length > 0
      ? query(collection(db, COLLECTION), ...constraints)
      : query(collection(db, COLLECTION));

  const snapshot = await getDocs(q);
  let recipes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Recipe);

  // Client-side text search (Firestore doesn't support full-text search natively)
  if (filters?.search) {
    const term = filters.search.toLowerCase();
    recipes = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.tags.some((t) => t.toLowerCase().includes(term)),
    );
  }

  return recipes;
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Recipe;
}

// ---------- CREATE ----------

export async function createRecipe(data: Omit<Recipe, "id">): Promise<Recipe> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    rating: data.rating ?? 0,
    reviews: data.reviews ?? 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...data } as Recipe;
}

// ---------- UPDATE ----------

export async function updateRecipe(
  id: string,
  data: Partial<Omit<Recipe, "id">>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ---------- DELETE ----------

export async function deleteRecipe(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// ========== COLLECTIONS ==========

const COLLECTIONS_COL = "collections";

export async function getCollections(userId?: string): Promise<Collection[]> {
  const constraints: ReturnType<typeof where>[] = [];
  if (userId) {
    constraints.push(where("userId", "==", userId));
  }

  const q =
    constraints.length > 0
      ? query(collection(db, COLLECTIONS_COL), ...constraints)
      : query(collection(db, COLLECTIONS_COL));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Collection);
}

export async function createCollection(
  data: Omit<Collection, "id">,
): Promise<Collection> {
  const docRef = await addDoc(collection(db, COLLECTIONS_COL), data);
  return { id: docRef.id, ...data };
}

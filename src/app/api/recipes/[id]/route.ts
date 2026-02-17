import { NextResponse } from "next/server";
import {
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "@/lib/services/recipe-service";
import { z } from "zod/v4";

// Partial update schema — all fields optional
const UpdateRecipeSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  time: z.string().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().optional(),
  servings: z.number().min(1).optional(),
  calories: z.number().min(0).optional(),
  protein: z.string().optional(),
  carbs: z.string().optional(),
  fats: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  cuisine: z.string().optional(),
});

type Params = { params: Promise<{ id: string }> };

// --- GET /api/recipes/[id] ---

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("GET /api/recipes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 },
    );
  }
}

// --- PUT /api/recipes/[id] ---

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await getRecipeById(id);

    if (!existing) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = UpdateRecipeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    await updateRecipe(id, parsed.data);
    const updated = await getRecipeById(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/recipes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 },
    );
  }
}

// --- DELETE /api/recipes/[id] ---

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    await deleteRecipe(id);
    return NextResponse.json({ message: "Recipe deleted", recipe });
  } catch (error) {
    console.error("DELETE /api/recipes/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 },
    );
  }
}

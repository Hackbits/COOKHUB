import { NextResponse } from "next/server";
import { getRecipes, createRecipe } from "@/lib/services/recipe-service";
import { z } from "zod/v4";

// --- Zod Schemas ---

const IngredientSchema = z.object({
  qty: z.string(),
  name: z.string(),
  category: z.enum(["meatSeafood", "pantry", "produce", "dairy"]),
  substitutes: z.array(z.string()).optional(),
});

const StepSchema = z.object({
  title: z.string(),
  description: z.string(),
  time: z.number(),
  phase: z.enum(["Preparation", "Cooking", "Plating"]).optional(),
  proTip: z.string().optional(),
});

const AuthorSchema = z.object({
  name: z.string(),
  avatar: z.string(),
});

const CreateRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  time: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  rating: z.number().min(0).max(5),
  reviews: z.number(),
  servings: z.number().min(1),
  calories: z.number().min(0),
  protein: z.string(),
  carbs: z.string(),
  fats: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  cuisine: z.string(),
  ingredients: z.array(IngredientSchema),
  steps: z.array(StepSchema),
  author: AuthorSchema,
});

// --- GET /api/recipes ---

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const cuisine = searchParams.get("cuisine") || undefined;
    const search = searchParams.get("search") || undefined;

    const recipes = await getRecipes({ category, cuisine, search });
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("GET /api/recipes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

// --- POST /api/recipes ---

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateRecipeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    const newRecipe = await createRecipe(parsed.data);
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("POST /api/recipes error:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}

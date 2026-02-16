import { NextResponse } from "next/server";
import { CookHubData } from "@/lib/data";
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
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().optional(),
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
    const category = searchParams.get("category");
    const cuisine = searchParams.get("cuisine");
    const search = searchParams.get("search");

    let recipes = [...CookHubData.recipes];

    if (category) {
      recipes = recipes.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (cuisine) {
      recipes = recipes.filter(
        (r) => r.cuisine.toLowerCase() === cuisine.toLowerCase(),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

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

    const newId =
      CookHubData.recipes.length > 0
        ? Math.max(...CookHubData.recipes.map((r) => r.id)) + 1
        : 1;

    const newRecipe = {
      id: newId,
      rating: 0,
      reviews: 0,

      ...parsed.data,
    };

    CookHubData.recipes.push(newRecipe);

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("POST /api/recipes error:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}

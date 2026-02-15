import { NextResponse } from "next/server";
import { CookHubData } from "@/lib/data";
import { z } from "zod/v4";

const MarkCookedSchema = z.object({
  recipeId: z.number().int().positive(),
});

// --- GET /api/user/cooked ---

export async function GET() {
  try {
    return NextResponse.json({ cookedRecipes: CookHubData.user.cookedRecipes });
  } catch (error) {
    console.error("GET /api/user/cooked error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cooked recipes" },
      { status: 500 },
    );
  }
}

// --- POST /api/user/cooked ---

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = MarkCookedSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    const { recipeId } = parsed.data;

    if (!CookHubData.user.cookedRecipes.includes(recipeId)) {
      CookHubData.user.cookedRecipes.push(recipeId);
    }

    return NextResponse.json({
      cookedRecipes: CookHubData.user.cookedRecipes,
      marked: recipeId,
    });
  } catch (error) {
    console.error("POST /api/user/cooked error:", error);
    return NextResponse.json(
      { error: "Failed to mark recipe as cooked" },
      { status: 500 },
    );
  }
}

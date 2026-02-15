import { NextResponse } from "next/server";
import { CookHubData } from "@/lib/data";
import { z } from "zod/v4";

const ToggleSavedSchema = z.object({
  recipeId: z.number().int().positive(),
});

// --- GET /api/user/saved ---

export async function GET() {
  try {
    return NextResponse.json({ savedRecipes: CookHubData.user.savedRecipes });
  } catch (error) {
    console.error("GET /api/user/saved error:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved recipes" },
      { status: 500 },
    );
  }
}

// --- POST /api/user/saved --- (toggle)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ToggleSavedSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    const { recipeId } = parsed.data;
    const idx = CookHubData.user.savedRecipes.indexOf(recipeId);

    if (idx === -1) {
      CookHubData.user.savedRecipes.push(recipeId);
    } else {
      CookHubData.user.savedRecipes.splice(idx, 1);
    }

    return NextResponse.json({
      savedRecipes: CookHubData.user.savedRecipes,
      toggled: recipeId,
      action: idx === -1 ? "saved" : "removed",
    });
  } catch (error) {
    console.error("POST /api/user/saved error:", error);
    return NextResponse.json(
      { error: "Failed to toggle saved recipe" },
      { status: 500 },
    );
  }
}

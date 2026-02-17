import { NextResponse } from "next/server";
import { getUserByUid, toggleSavedRecipe } from "@/lib/services/user-service";
import { z } from "zod/v4";

const ToggleSavedSchema = z.object({
  uid: z.string().min(1),
  recipeId: z.string().min(1),
});

// --- GET /api/user/saved?uid=<firebaseUid> ---

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid query parameter" },
        { status: 400 },
      );
    }

    const user = await getUserByUid(uid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ savedRecipes: user.savedRecipes });
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

    const { uid, recipeId } = parsed.data;
    const result = await toggleSavedRecipe(uid, recipeId);

    return NextResponse.json({
      toggled: recipeId,
      action: result.saved ? "saved" : "removed",
    });
  } catch (error) {
    console.error("POST /api/user/saved error:", error);
    return NextResponse.json(
      { error: "Failed to toggle saved recipe" },
      { status: 500 },
    );
  }
}

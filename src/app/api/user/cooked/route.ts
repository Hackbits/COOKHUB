import { NextResponse } from "next/server";
import { getUserByUid, markAsCooked } from "@/lib/services/user-service";
import { z } from "zod/v4";

const MarkCookedSchema = z.object({
  uid: z.string().min(1),
  recipeId: z.string().min(1),
});

// --- GET /api/user/cooked?uid=<firebaseUid> ---

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

    return NextResponse.json({ cookedRecipes: user.cookedRecipes });
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

    const { uid, recipeId } = parsed.data;
    await markAsCooked(uid, recipeId);

    return NextResponse.json({ marked: recipeId });
  } catch (error) {
    console.error("POST /api/user/cooked error:", error);
    return NextResponse.json(
      { error: "Failed to mark recipe as cooked" },
      { status: 500 },
    );
  }
}

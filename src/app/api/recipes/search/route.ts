import { NextRequest, NextResponse } from "next/server";
import { searchRecipes } from "@/lib/services/spoonacular-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const cuisine = searchParams.get("cuisine") || undefined;
  const diet = searchParams.get("diet") || undefined;
  const type = searchParams.get("type") || undefined;
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  // If no query and no filters, avoid hitting the external API unnecessarily
  // potentially return curated local or random recipes
  if (!query && !cuisine && !diet && !type) {
    return NextResponse.json({ recipes: [] });
  }

  try {
    const recipes = await searchRecipes(query, { cuisine, diet, type, offset });
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

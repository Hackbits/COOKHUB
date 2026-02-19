import { NextRequest, NextResponse } from "next/server";
import { searchExternalRecipes } from "@/lib/services/server/external-recipe-service";
import { getServerRecipes } from "@/lib/services/server/recipe-service";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const source = searchParams.get("source") || "all"; // 'community', 'web', 'all'

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  try {
    const results = [];

    // Fetch from Community (Firestore)
    if (source === "community" || source === "all") {
      // Note: This is a basic filter on all recipes.
      // Ideally, Firestore should handle text search (e.g., via Algolia/Typesense)
      // For now, we fetch all and filter in memory as dataset is small.
      const communityRecipes = await getServerRecipes();
      const filtered = communityRecipes.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()),
      );
      results.push(...filtered);
    }

    // Fetch from Web (Spoonacular)
    if (source === "web" || source === "all") {
      const externalRecipes = await searchExternalRecipes(query);
      results.push(...externalRecipes);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

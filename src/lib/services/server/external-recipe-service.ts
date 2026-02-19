import "server-only";
import { Recipe, Ingredient, Step } from "@/lib/types";

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

if (!API_KEY) {
  console.warn(
    "SPOONACULAR_API_KEY is missing. External recipe search will not work.",
  );
}

export type ExternalRecipe = Recipe & {
  sourceUrl: string;
  isExternal: true;
};

// Types for Spoonacular API responses
interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  instructions: string;
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
      ingredients: { name: string }[];
      equipment: { name: string }[];
    }[];
  }[];
  extendedIngredients: {
    original: string;
    amount: number;
    unit: string;
    nameClean: string;
    name: string;
    aisle: string;
    meta: string[];
  }[];
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

interface SpoonacularSearchResponse {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

/**
 * Convert Spoonacular recipe to our internal Recipe type
 */
function normalizeRecipe(data: SpoonacularRecipe): ExternalRecipe {
  // Extract key nutrients if available
  const nutrients = data.nutrition?.nutrients || [];
  const getNutrient = (name: string) => {
    const n = nutrients.find((n) => n.name === name);
    return n ? `${Math.round(n.amount)}${n.unit}` : "0g";
  };
  const calories = nutrients.find((n) => n.name === "Calories")?.amount || 0;

  // Map ingredients
  const ingredients: Ingredient[] = data.extendedIngredients.map((ing) => ({
    qty: `${ing.amount} ${ing.unit}`,
    name: ing.nameClean || ing.name,
    category: mapAisleToCategory(ing.aisle),
    substitutes: [],
  }));

  // Map steps
  const steps: Step[] = [];
  if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
    data.analyzedInstructions[0].steps.forEach((s) => {
      steps.push({
        title: `Step ${s.number}`,
        description: s.step,
        time:
          Math.ceil(
            data.readyInMinutes / data.analyzedInstructions[0].steps.length,
          ) || 5, // Estimate time per step
        phase: "Cooking",
      });
    });
  } else if (data.instructions) {
    // Fallback if no analyzed instructions
    steps.push({
      title: "Preparation",
      description: data.instructions.replace(/<[^>]*>?/gm, ""), // Strip HTML
      time: data.readyInMinutes,
      phase: "Cooking",
    });
  }

  return {
    id: `sp-${data.id}`,
    title: data.title,
    description:
      data.summary.replace(/<[^>]*>?/gm, "").substring(0, 200) + "...",
    time: `${data.readyInMinutes} mins`,
    difficulty:
      data.readyInMinutes > 60
        ? "Hard"
        : data.readyInMinutes > 30
          ? "Medium"
          : "Easy",
    rating: 4.5, // Default rating for external
    reviews: 0,
    servings: data.servings,
    calories: Math.round(calories),
    protein: getNutrient("Protein"),
    carbs: getNutrient("Carbohydrates"),
    fats: getNutrient("Fat"),
    image: data.image,
    tags: [...data.cuisines, ...data.dishTypes, ...data.diets],
    category: data.dishTypes[0] || "Main Course",
    cuisine: data.cuisines[0] || "International",
    ingredients,
    steps,
    author: {
      name: new URL(
        data.sourceUrl || "https://spoonacular.com",
      ).hostname.replace("www.", ""),
      avatar: `https://ui-avatars.com/api/?name=${data.sourceUrl}&background=random`,
    },
    sourceUrl: data.sourceUrl,
    isExternal: true,
  };
}

function mapAisleToCategory(aisle: string): Ingredient["category"] {
  const lower = aisle?.toLowerCase() || "";
  if (
    lower.includes("produce") ||
    lower.includes("fruit") ||
    lower.includes("veg")
  )
    return "produce";
  if (
    lower.includes("meat") ||
    lower.includes("seafood") ||
    lower.includes("poultry")
  )
    return "meatSeafood";
  if (
    lower.includes("milk") ||
    lower.includes("cheese") ||
    lower.includes("dairy")
  )
    return "dairy";
  return "pantry";
}

/**
 * Search for recipes using Spoonacular API
 */
export async function searchExternalRecipes(
  query: string,
  limit = 10,
): Promise<ExternalRecipe[]> {
  if (!API_KEY) return [];

  try {
    const params = new URLSearchParams({
      query,
      number: limit.toString(),
      apiKey: API_KEY,
      addRecipeInformation: "true",
      addRecipeNutrition: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Spoonacular API Error:", response.statusText);
      return [];
    }

    const data: SpoonacularSearchResponse = await response.json();
    return data.results.map(normalizeRecipe);
  } catch (error) {
    console.error("Failed to fetch external recipes:", error);
    return [];
  }
}

/**
 * Get detailed external recipe by Spoonacular ID
 */
export async function getExternalRecipeById(
  id: string,
): Promise<ExternalRecipe | null> {
  if (!API_KEY) return null;
  // Remove 'sp-' prefix if present
  const numericId = id.replace("sp-", "");

  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: "true",
    });

    const response = await fetch(
      `${BASE_URL}/${numericId}/information?${params}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
      },
    );

    if (!response.ok) return null;

    const data: SpoonacularRecipe = await response.json();
    return normalizeRecipe(data);
  } catch (error) {
    console.error(`Failed to fetch external recipe ${id}:`, error);
    return null;
  }
}

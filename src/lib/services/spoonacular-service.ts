import { Recipe, Ingredient, Step } from "@/lib/types";

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

// Spoonacular Types (Partial)
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
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: { name: string }[];
      equipment: { name: string }[];
    }[];
  }[];
  extendedIngredients: {
    id: number;
    original: string;
    amount: number;
    unit: string;
    name: string;
    aisle: string;
    meta: string[];
  }[];
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  pricePerServing: number;
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[];
  };
}

export async function searchRecipes(
  query: string,
  filters: { cuisine?: string; diet?: string; type?: string; offset?: number },
): Promise<Recipe[]> {
  if (!API_KEY) {
    console.warn("Spoonacular API Key is missing");
    return [];
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    query: query,
    addRecipeInformation: "true",
    fillIngredients: "true",
    number: "12",
    offset: (filters.offset || 0).toString(),
  });

  if (filters.cuisine && filters.cuisine !== "All")
    params.append("cuisine", filters.cuisine);
  if (filters.diet) params.append("diet", filters.diet);
  if (filters.type) params.append("type", filters.type);

  try {
    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    if (!response.ok) {
      throw new Error(`Spoonacular API Error: ${response.statusText}`);
    }

    const data = await response.json();
    // The complexSearch with addRecipeInformation returns results with full recipe data
    // tailored to the lightweight search result if needed, but here we want full details
    // to map to our Recipe type.
    // However, complexSearch results might be slightly different than getInformation.
    // For now, let's assume complexSearch with addRecipeInformation=true gives us enough.

    return data.results.map(mapSpoonacularToRecipe);
  } catch (error) {
    console.error("Failed to search recipes:", error);
    return [];
  }
}

function mapSpoonacularToRecipe(data: SpoonacularRecipe): Recipe {
  // Helper to find nutrient
  const getNutrient = (name: string): string => {
    const n = data.nutrition?.nutrients.find((n) => n.name === name);
    return n ? `${Math.round(n.amount)}${n.unit}` : "N/A";
  };

  // Calculate calories roughly if not present (complexSearch might filter fields)
  const calories =
    data.nutrition?.nutrients.find((n) => n.name === "Calories")?.amount || 0;

  return {
    id: `sp-${data.id}`, // Prefix to distinguish from internal IDs
    title: data.title,
    description: data.summary
      ? data.summary.replace(/<[^>]*>?/gm, "").slice(0, 150) + "..."
      : "No description available.",
    time: `${data.readyInMinutes} mins`,
    difficulty:
      data.readyInMinutes > 60
        ? "Hard"
        : data.readyInMinutes > 30
          ? "Medium"
          : "Easy",
    rating: data.spoonacularScore / 20, // Scale 0-100 to 0-5
    reviews: data.aggregateLikes,
    servings: data.servings,
    calories: Math.round(calories),
    protein: getNutrient("Protein"), // complexSearch might not return nutrition without extra params
    carbs: getNutrient("Carbohydrates"),
    fats: getNutrient("Fat"),
    image: data.image,
    tags: [...data.cuisines, ...data.dishTypes, ...data.diets],
    category: data.dishTypes[0] || "Main Course",
    cuisine: data.cuisines[0] || "International",
    ingredients: data.extendedIngredients.map(
      (ing): Ingredient => ({
        qty: `${ing.amount} ${ing.unit}`,
        name: ing.name,
        category: "pantry", // Default mapping
      }),
    ),
    steps:
      data.analyzedInstructions[0]?.steps.map(
        (step): Step => ({
          title: `Step ${step.number}`,
          description: step.step,
          time: 5, // Approximate
          phase: "Cooking",
        }),
      ) || [],
    author: {
      name: "Spoonacular",
      avatar: "https://spoonacular.com/images/spoonacular-logo-b.svg",
    },
    createdAt: new Date().toISOString(),
  };
}

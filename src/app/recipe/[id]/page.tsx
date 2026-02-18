import { notFound } from "next/navigation";
import RecipeDetailClient from "@/components/recipes/RecipeDetailClient";
import {
  getServerRecipeById,
  getServerReviewsByRecipe,
} from "@/lib/services/server/recipe-service";
import type { Review } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch data on the server for maximum performance in production
  const [recipe, reviews] = await Promise.all([
    getServerRecipeById(id),
    getServerReviewsByRecipe(id),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <RecipeDetailClient
      initialRecipe={recipe}
      initialReviews={reviews as Review[]}
    />
  );
}

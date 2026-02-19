import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import RecipeDetailClient from "@/components/recipes/RecipeDetailClient";
import {
  getServerRecipeById,
  getServerReviewsByRecipe,
} from "@/lib/services/server/recipe-service";
import type { Review } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getServerRecipeById(id);

  if (!recipe) {
    return {
      title: "Recipe Not Found - COOKHUB",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${recipe.title} - COOKHUB`,
    description: recipe.description.substring(0, 160),
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      // The file-based opengraph-image.tsx will be automatically used
      // but we can explicitly add images if needed, or rely on Next.js auto-detection
      images: [...previousImages],
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
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

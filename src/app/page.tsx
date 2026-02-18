import HomeClient from "@/components/home/HomeClient";
import {
  getServerRecipes,
  getServerReviewsByRecipe,
} from "@/lib/services/server/recipe-service";
import type { Review } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch data on the server for maximum performance in production
  const initialRecipes = await getServerRecipes();

  let initialReviews: Review[] = [];
  if (initialRecipes.length > 0) {
    initialReviews = (await getServerReviewsByRecipe(
      initialRecipes[0].id,
    )) as Review[];
  }

  return (
    <HomeClient
      initialRecipes={initialRecipes}
      initialReviews={initialReviews}
    />
  );
}

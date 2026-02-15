"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { CookHubData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Search, X, SearchX } from "lucide-react";

const cuisines = [
  "All",
  "Japanese",
  "Mediterranean",
  "Italian",
  "Thai",
  "Mexican",
  "Korean",
  "American",
];
const difficulties = ["All", "Easy", "Medium", "Hard"];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "time" | "reviews">("rating");

  const filteredRecipes = useMemo(() => {
    let results = CookHubData.recipes;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q)),
      );
    }

    if (initialFilter) {
      switch (initialFilter) {
        case "quick":
          results = results.filter((r) => parseInt(r.time) <= 30);
          break;
        case "healthy":
          results = results.filter((r) =>
            r.tags.some((t) =>
              ["Healthy", "Vegan", "Gluten-Free", "Low Carb"].includes(t),
            ),
          );
          break;
        case "vegetarian":
          results = results.filter((r) =>
            r.tags.some((t) => ["Vegetarian", "Vegan"].includes(t)),
          );
          break;
        case "spicy":
          results = results.filter((r) => r.tags.some((t) => t === "Spicy"));
          break;
        case "date":
          results = results.filter(
            (r) =>
              r.tags.some((t) => ["Date Night", "Comfort Food"].includes(t)) ||
              r.rating >= 4.8,
          );
          break;
      }
    }

    if (selectedCuisine !== "All") {
      results = results.filter((r) => r.cuisine === selectedCuisine);
    }

    if (selectedDifficulty !== "All") {
      results = results.filter((r) => r.difficulty === selectedDifficulty);
    }

    results = [...results].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "time") return parseInt(a.time) - parseInt(b.time);
      return 0;
    });

    return results;
  }, [searchQuery, selectedCuisine, selectedDifficulty, sortBy, initialFilter]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedDifficulty("All");
    setSortBy("rating");
  };

  const hasActiveFilters =
    searchQuery || selectedCuisine !== "All" || selectedDifficulty !== "All";

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            🔍 Discover Recipes
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Explore cuisines from around the world
          </p>

          <div className="relative max-w-2xl group mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              className="w-full bg-white h-14 pl-14 pr-6 rounded-2xl border-2 border-gray-100 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm placeholder:text-gray-400 outline-none transition-all"
              placeholder="Search recipes, ingredients, cuisines..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Cuisine
              </label>
              <div className="flex flex-wrap gap-2">
                {cuisines.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCuisine(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCuisine === c
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDifficulty === d
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "rating" | "time" | "reviews")
                }
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 text-gray-600 outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="time">Quickest</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-4 text-sm text-primary font-bold hover:underline flex items-center gap-1"
            >
              <X size={16} />
              Clear all filters
            </button>
          )}
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-sm text-gray-500 mb-6 font-medium">
            {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? "s" : ""} found
          </p>

          {filteredRecipes.length > 0 ? (
            <RecipeGrid recipes={filteredRecipes} />
          ) : (
            <div className="text-center py-20">
              <SearchX size={64} className="text-gray-300 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button variant="default" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Search className="animate-pulse mb-4 mx-auto" size={48} />
            <p className="font-bold">Loading Discovery...</p>
          </div>
        </div>
      }
    >
      <DiscoveryContent />
    </Suspense>
  );
}

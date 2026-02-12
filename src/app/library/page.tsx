"use client";

import { useState } from "react";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { CookHubData } from "@/lib/data";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import Tabs from "@/components/ui/Tabs";
import {
  Lock,
  Bookmark,
  Utensils,
  FolderHeart,
  Heart,
  Timer,
  Leaf,
} from "lucide-react";

const getCollectionIcon = (iconName: string) => {
  switch (iconName) {
    case "favorite":
      return <Heart className="text-primary fill-primary/20" />;
    case "timer":
      return <Timer className="text-amber-500" />;
    case "eco":
      return <Leaf className="text-green-500" />;
    default:
      return <FolderHeart className="text-primary fill-primary/20" />;
  }
};

export default function LibraryPage() {
  const { savedRecipes, cookedRecipes, isLoggedIn } = useUserStore();
  const [activeTab, setActiveTab] = useState<
    "saved" | "cooked" | "collections"
  >("saved");

  const savedRecipesList = CookHubData.recipes.filter((r) =>
    savedRecipes.includes(r.id),
  );
  const cookedRecipesList = CookHubData.recipes.filter((r) =>
    cookedRecipes.includes(r.id),
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <section className="py-20">
          <div className="max-w-md mx-auto px-6 text-center">
            <Lock
              strokeWidth={1}
              size={96}
              className="text-gray-200 mb-6 mx-auto"
            />
            <h2 className="text-2xl font-bold mb-3">
              Sign in to view your library
            </h2>
            <p className="text-gray-500 mb-8">
              Your saved recipes, collections, and cooking history will appear
              here.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-rose-50 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            📚 My Library
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Your saved recipes and cooking history
          </p>

          {/* Tabs */}
          <Tabs
            options={[
              { id: "saved", label: "saved" },
              { id: "cooked", label: "cooked" },
              { id: "collections", label: "collections" },
            ]}
            activeTab={activeTab}
            onChange={(id) =>
              setActiveTab(id as "saved" | "cooked" | "collections")
            }
            className="max-w-md"
          />
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          {activeTab === "saved" && (
            <div className="animate-fade-in">
              {savedRecipesList.length > 0 ? (
                <RecipeGrid recipes={savedRecipesList} />
              ) : (
                <div className="text-center py-20">
                  <Bookmark
                    strokeWidth={1}
                    size={64}
                    className="text-gray-300 mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    No saved recipes
                  </h3>
                  <p className="text-gray-400">
                    Click the heart on any recipe to save it here
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "cooked" && (
            <div className="animate-fade-in">
              {cookedRecipesList.length > 0 ? (
                <RecipeGrid recipes={cookedRecipesList} />
              ) : (
                <div className="text-center py-20">
                  <Utensils
                    strokeWidth={1}
                    size={64}
                    className="text-gray-300 mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    No cooked recipes yet
                  </h3>
                  <p className="text-gray-400">
                    Complete recipes in Cooking Mode to track them here
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "collections" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CookHubData.collections.map((collection) => {
                  const collectionRecipes = CookHubData.recipes.filter((r) =>
                    collection.recipeIds.includes(r.id),
                  );
                  return (
                    <div
                      key={collection.id}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="grid grid-cols-2 h-40">
                        {collectionRecipes.slice(0, 4).map((r) => (
                          <div
                            key={r.id}
                            className="overflow-hidden relative h-full w-full"
                          >
                            <Image
                              src={r.image}
                              alt={r.title}
                              className="object-cover hover:scale-105 transition-transform"
                              fill
                            />
                          </div>
                        ))}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-1">
                          {getCollectionIcon(collection.icon)}
                          <h3 className="font-bold text-lg">
                            {collection.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          {collection.recipeIds.length} recipes
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

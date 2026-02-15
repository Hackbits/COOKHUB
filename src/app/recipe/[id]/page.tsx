"use client";

import { use } from "react";
import { useState } from "react";
import { CookHubData } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useShoppingStore, MAX_SHOPPING_ITEMS } from "@/store/useShoppingStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RecipeRefactorModal, {
  type RefactoredRecipeData,
} from "@/components/recipes/RecipeRefactorModal";
import type { Ingredient, Step } from "@/lib/types";
import {
  Clock,
  Utensils,
  Star,
  Users,
  ShoppingCart,
  PlayCircle,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  RotateCcw,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const recipe = CookHubData.recipes.find((r) => r.id === Number(id));

  const [activeTab, setActiveTab] = useState<
    "ingredients" | "steps" | "nutrition"
  >("ingredients");
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [showRefactorModal, setShowRefactorModal] = useState(false);
  const [refactored, setRefactored] = useState<RefactoredRecipeData | null>(
    null,
  );
  const { items, addRecipeIngredients } = useShoppingStore();

  // Use refactored data if available, otherwise original recipe
  const displayTitle = refactored?.title || recipe?.title;
  const displayDescription = refactored?.description || recipe?.description;
  const displayIngredients: Ingredient[] = refactored?.ingredients
    ? refactored.ingredients.map((i) => ({
        qty: i.qty,
        name: i.name,
        category: i.category as Ingredient["category"],
      }))
    : recipe?.ingredients || [];
  const displaySteps: Step[] = refactored?.steps || recipe?.steps || [];
  const displayCalories = refactored?.calories ?? recipe?.calories;
  const displayProtein = refactored?.protein || recipe?.protein;
  const displayCarbs = refactored?.carbs || recipe?.carbs;
  const displayFats = refactored?.fats || recipe?.fats;
  const displayTime = refactored?.time || recipe?.time;
  const displayDifficulty = refactored?.difficulty || recipe?.difficulty;
  const displayTags = refactored?.tags || recipe?.tags;
  const displayServingsCount = refactored?.servings ?? recipe?.servings;

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            Recipe not found
          </h2>
          <Link href="/" className="text-primary font-bold hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const reviews = CookHubData.reviews.filter((r) => r.recipeId === recipe.id);

  const handleAddToShoppingList = () => {
    const beforeCount = items.length;
    addRecipeIngredients(
      recipe.id,
      recipe.ingredients.map((i) => ({
        name: i.name,
        qty: i.qty,
        category: i.category,
      })),
    );

    if (beforeCount >= MAX_SHOPPING_ITEMS) {
      alert(`Shopping list is already full (${MAX_SHOPPING_ITEMS} items max)!`);
    } else {
      alert(
        `Ingredients added to shopping list! (Duplicates skipped, ${MAX_SHOPPING_ITEMS} items max limit applied)`,
      );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {refactored && (
                <Badge
                  variant="secondary"
                  className="bg-purple-500/80 text-white border-purple-400"
                >
                  ✨ AI Remixed
                </Badge>
              )}
              {(displayTags || []).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 serif-font max-w-3xl">
              {displayTitle}
            </h1>
            <p className="text-white/80 text-lg mb-6 max-w-2xl">
              {displayDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2">
                <Clock className="text-amber-400" size={20} />
                {displayTime}
              </span>
              <span className="flex items-center gap-2">
                <Utensils className="text-amber-400" size={20} />
                {displayDifficulty}
              </span>
              <span className="flex items-center gap-2">
                <Star className="text-amber-400 fill-current" size={20} />
                {recipe.rating} ({recipe.reviews.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-2">
                <Users className="text-amber-400" size={20} />
                {displayServingsCount} servings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "ingredients" | "steps" | "nutrition")
                }
                className="mb-8"
              >
                <TabsList>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                </TabsList>

                {/* Ingredients Tab */}
                {activeTab === "ingredients" && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Ingredients</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">
                          Servings:
                        </span>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                          <button
                            onClick={() =>
                              setServings(Math.max(1, servings - 1))
                            }
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-sm">
                            {servings}
                          </span>
                          <button
                            onClick={() => setServings(servings + 1)}
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {displayIngredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <span className="font-bold text-sm text-primary min-w-[80px]">
                            {ing.qty}
                          </span>
                          <span className="text-sm text-gray-700 flex-1">
                            {ing.name}
                          </span>
                          {ing.substitutes && (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                              Sub: {ing.substitutes.join(", ")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleAddToShoppingList}
                      className="mt-6 w-full"
                    >
                      <ShoppingCart className="mr-2" size={20} />
                      Add All to Shopping List
                    </Button>
                  </div>
                )}

                {/* Steps Tab */}
                {activeTab === "steps" && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Cooking Steps</h2>
                      <Link
                        href={`/cooking-mode?id=${recipe.id}`}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-black transition-all"
                      >
                        <PlayCircle size={20} />
                        Start Cooking Mode
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {displaySteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all"
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${refactored ? "bg-gradient-to-br from-purple-600 to-indigo-600" : "bg-primary"} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
                          >
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {step.description}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                              <Clock size={14} />
                              {step.time} min
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nutrition Tab */}
                {activeTab === "nutrition" && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">
                      Nutrition Information
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          label: "Calories",
                          value: `${displayCalories}`,
                          icon: <Flame size={32} />,
                          color: "bg-orange-50 text-orange-600",
                        },
                        {
                          label: "Protein",
                          value: displayProtein,
                          icon: <Dumbbell size={32} />,
                          color: "bg-blue-50 text-blue-600",
                        },
                        {
                          label: "Carbs",
                          value: displayCarbs,
                          icon: <Wheat size={32} />,
                          color: "bg-amber-50 text-amber-600",
                        },
                        {
                          label: "Fats",
                          value: displayFats,
                          icon: <Droplet size={32} />,
                          color: "bg-green-50 text-green-600",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all"
                        >
                          <div
                            className={`mb-3 ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto`}
                          >
                            {item.icon}
                          </div>
                          <div className="text-2xl font-extrabold mb-1">
                            {item.value}
                          </div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white p-6 rounded-2xl border border-gray-100"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold">
                              {review.avatar}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">
                                {review.user}
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex text-primary">
                                  {Array(review.rating).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="fill-current text-sm"
                                      size={14}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-400">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6 sticky top-24">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10"
                    width={56}
                    height={56}
                  />
                  <div>
                    <h3 className="font-bold">{recipe.author.name}</h3>
                    <p className="text-xs text-gray-400">Recipe Creator</p>
                  </div>
                </div>
                <hr className="my-4 border-gray-100" />

                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cuisine</span>
                    <span className="font-bold">{recipe.cuisine}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="font-bold">{recipe.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Servings</span>
                    <span className="font-bold">{recipe.servings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Time</span>
                    <span className="font-bold">{recipe.time}</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-100" />

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push(`/cooking-mode?id=${recipe.id}`)}
                    className="w-full"
                  >
                    <PlayCircle className="mr-2" size={20} />
                    Start Cooking
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAddToShoppingList}
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    Add to Shopping List
                  </Button>

                  {/* AI Refactor Button */}
                  <button
                    onClick={() => setShowRefactorModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles size={18} className="group-hover:animate-pulse" />
                    AI Remix This Recipe
                  </button>

                  {/* Reset to Original */}
                  {refactored && (
                    <Button
                      variant="outline"
                      onClick={() => setRefactored(null)}
                      className="w-full"
                    >
                      <RotateCcw className="mr-2" size={16} />
                      Reset to Original
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refactor Modal */}
      {showRefactorModal && (
        <RecipeRefactorModal
          recipe={recipe}
          onClose={() => setShowRefactorModal(false)}
          onApply={(_markdown, structured) => {
            if (structured) {
              setRefactored(structured);
              setActiveTab("steps");
            }
          }}
        />
      )}
    </div>
  );
}

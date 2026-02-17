"use client";

import { use, useState, useRef, useEffect } from "react";
import { getRecipeById } from "@/lib/services/recipe-service";
import { getReviewsByRecipe } from "@/lib/services/review-service";
import { useRouter } from "next/navigation";
import { useShoppingStore, MAX_SHOPPING_ITEMS } from "@/store/useShoppingStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import RecipeRefactorModal, {
  type RefactoredRecipeData,
} from "@/components/recipes/RecipeRefactorModal";
import type { Ingredient, Step, Recipe, Review } from "@/lib/types";
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
  CheckCircle2,
  Timer,
  Lightbulb,
} from "lucide-react";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [r, rev] = await Promise.all([
          getRecipeById(id),
          getReviewsByRecipe(id),
        ]);
        setRecipe(r);
        setReviews(rev);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      } finally {
        setPageLoading(false);
      }
    }
    load();
  }, [id]);

  const [activeTab, setActiveTab] = useState<
    "ingredients" | "steps" | "nutrition"
  >("ingredients");
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [showRefactorModal, setShowRefactorModal] = useState(false);
  const [refactored, setRefactored] = useState<RefactoredRecipeData | null>(
    null,
  );
  const { items, addRecipeIngredients } = useShoppingStore();

  // New State for Detailed Cooking System
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStepId, setActiveStepId] = useState<number | null>(null);

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

  // Group steps by phase
  const stepsByPhase = displaySteps.reduce(
    (acc, step) => {
      const phase = step.phase || "Cooking";
      if (!acc[phase]) acc[phase] = [];
      acc[phase].push(step);
      return acc;
    },
    {} as Record<string, Step[]>,
  );

  const phaseOrder = ["Preparation", "Cooking", "Plating"];

  // Calculate remaining time
  const totalCookingMinutes = displaySteps.reduce(
    (acc, step) => acc + step.time,
    0,
  );
  const completedMinutes = displaySteps
    .filter((_, idx) => completedSteps.includes(idx))
    .reduce((acc, step) => acc + step.time, 0);
  const remainingMinutes = Math.max(0, totalCookingMinutes - completedMinutes);

  // Scroll to step handling
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToStep = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveStepId(index);
  };

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps((prev) => {
      // detailed cooking system logic: strict reverse unmarking
      const isUnmarking = prev.includes(index);
      if (isUnmarking) {
        const hasLaterStepsCompleted = prev.some((i) => i > index);
        if (hasLaterStepsCompleted) {
          alert("Please unmark the later steps first!");
          return prev;
        }
        return prev.filter((i) => i !== index);
      }

      // strict forward marking logic
      if (index > 0 && !prev.includes(index - 1)) {
        alert("Please complete the previous steps first!");
        return prev;
      }

      // If marking, just add it
      return [...prev, index];
    });
  };

  // Ingredient highlighting helper
  const highlightIngredients = (text: string) => {
    // Better approach: Split text and checking parts against ingredients
    const parts = text.split(/(\b)/);
    return parts.map((part, i) => {
      const isIngredient = displayIngredients.some(
        (ing) =>
          ing.name.toLowerCase().includes(part.toLowerCase()) &&
          part.length > 2,
      );
      return isIngredient ? (
        <strong key={i} className="text-primary font-bold">
          {part}
        </strong>
      ) : (
        part
      );
    });
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold">Loading recipe...</p>
        </div>
      </div>
    );
  }

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

  // Reviews are loaded via useEffect above

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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar - Sticky Progress (Visible only on desktop in 'steps' tab) */}
            {activeTab === "steps" && (
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 space-y-8">
                  {/* Progress Tracker */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Timer className="text-primary" size={20} />
                      Cooking Progress
                    </h3>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-gray-500">Remaining Time</span>
                      <span className="font-bold text-primary">
                        {remainingMinutes} mins
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(completedSteps.length / displaySteps.length) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                      {displaySteps.map((step, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToStep(idx)}
                          className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                            completedSteps.includes(idx)
                              ? "text-gray-400 hover:bg-gray-50"
                              : activeStepId === idx
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                              completedSteps.includes(idx)
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300 text-gray-500"
                            }`}
                          >
                            {completedSteps.includes(idx) ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              idx + 1
                            )}
                          </div>
                          <span
                            className={`truncate ${completedSteps.includes(idx) ? "line-through" : ""}`}
                          >
                            {step.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Author Card (Moved here for better layout balance) */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={recipe.author.avatar}
                        alt={recipe.author.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                        width={48}
                        height={48}
                      />
                      <div>
                        <h3 className="font-bold text-sm">
                          {recipe.author.name}
                        </h3>
                        <p className="text-xs text-gray-400">Recipe Creator</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div
              className={`${activeTab === "steps" ? "lg:col-span-9" : "lg:col-span-8 lg:col-start-1"}`}
            >
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "ingredients" | "steps" | "nutrition")
                }
                className="mb-8"
              >
                <TabsList className="mb-6">
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="steps">Instructions</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                </TabsList>

                {/* Ingredients Tab */}
                {activeTab === "ingredients" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
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
                      className="mt-6 w-full md:w-auto"
                    >
                      <ShoppingCart className="mr-2" size={20} />
                      Add All to Shopping List
                    </Button>
                  </motion.div>
                )}

                {/* Steps Tab - The Core Detailed Cooking System */}
                {activeTab === "steps" && (
                  <div className="space-y-12">
                    {/* Header Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Cooking Instructions
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Follow step-by-step for perfect results
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setShowRefactorModal(true)}
                          className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles size={16} />
                          AI Remix
                        </button>
                        {refactored && (
                          <Button
                            variant="outline"
                            onClick={() => setRefactored(null)}
                            className="px-3"
                          >
                            <RotateCcw size={16} />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Steps Grouped by Phase */}
                    {phaseOrder.map((phase) => {
                      const phaseSteps = stepsByPhase[phase] || [];
                      if (phaseSteps.length === 0) return null;

                      return (
                        <div key={phase} className="space-y-6">
                          <div className="flex items-center gap-4">
                            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-400">
                              {phase} Phase
                            </h3>
                            <div className="h-px bg-gray-200 flex-1"></div>
                          </div>

                          <div className="space-y-8">
                            {phaseSteps.map((step, phaseIdx) => {
                              // Find absolute index
                              const originalIndex = displaySteps.findIndex(
                                (s) => s === step,
                              );
                              const isCompleted =
                                completedSteps.includes(originalIndex);

                              return (
                                <motion.div
                                  key={originalIndex}
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{
                                    duration: 0.5,
                                    delay: phaseIdx * 0.1,
                                  }}
                                  ref={(el: HTMLDivElement | null) => {
                                    // Directly assign to the ref array, no return needed
                                    if (stepRefs.current) {
                                      stepRefs.current[originalIndex] = el;
                                    }
                                  }}
                                  className={`group relative bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                                    isCompleted
                                      ? "border-gray-100 opacity-60 bg-gray-50"
                                      : "border-transparent shadow-lg hover:border-primary/20"
                                  }`}
                                >
                                  {/* Step Number Badge */}
                                  <div className="absolute top-0 left-0 bg-primary/10 text-primary font-black text-4xl px-6 py-4 rounded-br-3xl z-10">
                                    {originalIndex + 1}
                                  </div>

                                  <div className="flex flex-col md:flex-row">
                                    {/* Image Section (if available) */}
                                    {step.image && (
                                      <div className="md:w-1/3 relative h-48 md:h-auto min-h-[200px]">
                                        <Image
                                          src={step.image}
                                          alt={step.title}
                                          fill
                                          className={`object-cover transition-all ${isCompleted ? "grayscale" : ""}`}
                                        />
                                      </div>
                                    )}

                                    {/* Content Section */}
                                    <div
                                      className={`p-8 md:p-10 flex-1 flex flex-col ${!step.image && "pt-16"}`}
                                    >
                                      <div className="flex justify-between items-start mb-4">
                                        <h4
                                          className={`text-xl font-bold transition-all ${isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}
                                        >
                                          {step.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                            <Clock size={14} />
                                            {step.time} min
                                          </span>
                                        </div>
                                      </div>

                                      <p
                                        className={`text-gray-600 leading-relaxed text-lg mb-6 ${isCompleted ? "line-through opacity-50" : ""}`}
                                      >
                                        {highlightIngredients(step.description)}
                                      </p>

                                      {step.proTip && (
                                        <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                          <div className="flex items-start gap-3">
                                            <Lightbulb
                                              className="text-blue-500 fill-blue-500 flex-shrink-0 mt-1"
                                              size={18}
                                            />
                                            <div>
                                              <span className="block font-bold text-blue-700 text-xs uppercase mb-1">
                                                Chef&apos;s Pro Tip
                                              </span>
                                              <p className="text-blue-800 text-sm italic">
                                                {step.proTip}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <Checkbox
                                            id={`step-${originalIndex}`}
                                            checked={isCompleted}
                                            onCheckedChange={() =>
                                              toggleStepCompletion(
                                                originalIndex,
                                              )
                                            }
                                            className="w-6 h-6 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                          />
                                          <label
                                            htmlFor={`step-${originalIndex}`}
                                            className={`font-medium cursor-pointer select-none ${isCompleted ? "text-gray-400" : "text-gray-700"}`}
                                          >
                                            {isCompleted
                                              ? "Completed"
                                              : "Mark as Done"}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Nutrition Tab */}
                {activeTab === "nutrition" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
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
                  </motion.div>
                )}

                {/* Reviews */}
                {activeTab !== "steps" && reviews.length > 0 && (
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

            {/* Right Sidebar - General Actions (Visible on Ingredients/Nutrition tabs on desktop) */}
            {activeTab !== "steps" && (
              <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
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
                      onClick={() =>
                        router.push(`/cooking-mode?id=${recipe.id}`)
                      }
                      className="w-full"
                    >
                      <PlayCircle className="mr-2" size={20} />
                      Start Cooking Mode
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
                      <Sparkles
                        size={18}
                        className="group-hover:animate-pulse"
                      />
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
            )}
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

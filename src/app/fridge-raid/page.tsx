"use client";

import { useState, useMemo } from "react";
import RecipeCard from "@/components/recipes/RecipeCard";
import { CookHubData } from "@/lib/data";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const ingredientCategories = [
  {
    name: "Proteins",
    icon: "🥩",
    items: [
      "Chicken",
      "Salmon",
      "Beef",
      "Pork",
      "Tofu",
      "Eggs",
      "Shrimp",
      "Lamb",
    ],
  },
  {
    name: "Vegetables",
    icon: "🥦",
    items: [
      "Spinach",
      "Onion",
      "Garlic",
      "Tomatoes",
      "Broccoli",
      "Carrots",
      "Bell Peppers",
      "Mushrooms",
      "Kale",
      "Potatoes",
    ],
  },
  {
    name: "Pantry & Spices",
    icon: "🫙",
    items: [
      "Olive Oil",
      "Soy Sauce",
      "Coconut Milk",
      "Butter",
      "Honey",
      "Rice",
      "Pasta",
      "Flour",
      "Cumin",
      "Paprika",
    ],
  },
  {
    name: "Dairy",
    icon: "🧀",
    items: ["Cheese", "Milk", "Yogurt", "Cream", "Parmesan"],
  },
];

export default function FridgeRaidPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get all unique ingredients from our database for suggestions
  const allPossibleIngredients = useMemo(() => {
    const ings = new Set<string>();
    CookHubData.recipes.forEach((r) => {
      r.ingredients.forEach((i) => ings.add(i.name.split(",")[0].trim()));
    });
    // Add common ones too
    ingredientCategories.forEach((cat) =>
      cat.items.forEach((item) => ings.add(item)),
    );
    return Array.from(ings).sort();
  }, []);

  const suggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    return allPossibleIngredients
      .filter(
        (i) =>
          i.toLowerCase().includes(inputValue.toLowerCase()) &&
          !ingredients.includes(i),
      )
      .slice(0, 5);
  }, [inputValue, allPossibleIngredients, ingredients]);

  const addIngredient = (name: string) => {
    const trimmed = name.trim();
    if (
      trimmed &&
      !ingredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())
    ) {
      setIngredients([...ingredients, trimmed]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter((i) => i !== name));
  };

  const matchedRecipes = useMemo(() => {
    if (ingredients.length === 0) return [];
    return CookHubData.recipes
      .map((recipe) => {
        const recipeIngNames = recipe.ingredients.map((i) =>
          i.name.toLowerCase(),
        );
        const matchedItems = ingredients.filter((ing) =>
          recipeIngNames.some((ri) => ri.includes(ing.toLowerCase())),
        );
        const matchCount = matchedItems.length;
        const missingCount = recipe.ingredients.length - matchCount;
        const matchPercent = Math.round(
          (matchCount / recipe.ingredients.length) * 100,
        );
        return { recipe, matchCount, matchPercent, missingCount, matchedItems };
      })
      .filter((r) => r.matchCount > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [ingredients]);

  const handleSearch = () => {
    setHasSearched(true);
    // Scroll to results
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=900&fit=crop&q=80"
            alt="Fresh Ingredients"
            className="object-cover opacity-10"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-green-50/50" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-[1440px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Tag variant="green">Smart Match</Tag>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-black tracking-tight serif-font mb-6 leading-tight">
              The <span className="text-green-600 italic">Fridge Raid</span>{" "}
              <br />
              Recipe Finder.
            </h1>
            <p className="text-gray-500 text-xl max-w-xl leading-relaxed mb-10">
              Don&apos;t let good food go to waste. Tell us what you have, and
              we&apos;ll show you the magic you can create.
            </p>

            {/* Premium Input Area */}
            <div className="relative group max-w-2xl mb-12">
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-green-500 transition-colors">
                    shopping_basket
                  </span>
                </div>
                <input
                  className="w-full bg-white h-20 pl-14 pr-40 rounded-3xl border border-gray-100 text-lg md:text-xl focus:ring-8 focus:ring-green-500/5 focus:border-green-500 shadow-2xl shadow-green-900/5 placeholder:text-gray-400 outline-none transition-all"
                  placeholder="e.g. Chicken, Spinach, Onion..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addIngredient(inputValue);
                  }}
                />
                <button
                  onClick={() => addIngredient(inputValue)}
                  disabled={!inputValue.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-black text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-green-600 transition-all disabled:opacity-20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add item
                </button>
              </div>

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-3 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 animate-slide-in">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => addIngredient(s)}
                      className="w-full text-left px-6 py-4 hover:bg-green-50 flex items-center gap-4 transition-colors"
                    >
                      <span className="material-symbols-outlined text-green-500 text-lg">
                        history
                      </span>
                      <span className="font-bold text-slate-black">{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Ingredients Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {ingredients.map((ing) => (
                <div
                  key={ing}
                  className="group flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-200 transition-all animate-scale-in"
                >
                  <span className="text-sm font-black text-slate-black">
                    {ing}
                  </span>
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                </div>
              ))}
              {ingredients.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setIngredients([])}
                  className="px-5 py-3 text-red-500 hover:text-red-600 font-black"
                >
                  Clear All
                </Button>
              )}
            </div>

            {ingredients.length > 0 && (
              <Button
                onClick={handleSearch}
                size="lg"
                className="group relative overflow-hidden bg-green-500 hover:bg-green-600 shadow-green-500/30 gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="material-symbols-outlined">auto_awesome</span>
                Start Fridge Raid
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Suggested Categories */}
      <section className="pt-0 pb-20 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black serif-font text-slate-black">
              Common Pantry Items
            </h2>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Tap to quick add
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredientCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-black text-slate-black">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => addIngredient(item)}
                      disabled={ingredients.includes(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        ingredients.includes(item)
                          ? "bg-green-50 text-green-300 cursor-not-allowed"
                          : "bg-gray-50 text-slate-black hover:bg-green-500 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section id="results" className="py-20 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-1 bg-green-500 rounded-full" />
                  <span className="text-xs font-black text-green-600 uppercase tracking-widest">
                    Search Results
                  </span>
                </div>
                <h2 className="text-4xl font-black serif-font text-slate-black">
                  Matching your{" "}
                  <span className="text-primary italic">Ingredients</span>
                </h2>
              </div>
              <p className="text-gray-500 font-bold">
                {matchedRecipes.length} recipes found
              </p>
            </div>

            {matchedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {matchedRecipes.map(
                  ({ recipe, matchPercent, matchedItems }) => (
                    <div key={recipe.id} className="relative group">
                      <div className="absolute -top-3 -right-3 z-20">
                        <div
                          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-4 border-white shadow-xl ${
                            matchPercent > 70
                              ? "bg-green-500"
                              : matchPercent > 40
                                ? "bg-amber-500"
                                : "bg-orange-500"
                          } text-white`}
                        >
                          <span className="text-sm font-black">
                            {matchPercent}%
                          </span>
                          <span className="text-[8px] font-black uppercase tracking-tighter">
                            Match
                          </span>
                        </div>
                      </div>
                      <RecipeCard recipe={recipe} />
                      <div className="mt-4 flex flex-wrap gap-1">
                        {matchedItems.slice(0, 3).map((m) => (
                          <span
                            key={m}
                            className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                          >
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <span className="text-7xl mb-6 block opacity-50">🍱</span>
                <h3 className="text-2xl font-black text-slate-black mb-2">
                  No perfect matches yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
                  We couldn&apos;t find recipes with those specific ingredients.
                  Try adding more pantry staples like Rice, Oil, or Garlic!
                </p>
                <button
                  onClick={() => {
                    setIngredients(["Rice", "Garlic", "Onion", "Chicken"]);
                    handleSearch();
                  }}
                  className="text-primary font-black hover:underline underline-offset-8"
                >
                  Try a demo raid
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State / Tips */}
      {!hasSearched && ingredients.length === 0 && (
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "Add your mains",
                  desc: "Start with your proteins or main veggies like Chicken, Salmon or Mushrooms.",
                  icon: "🍗",
                },
                {
                  title: "Don't forget spices",
                  desc: "Adding common things like Soy Sauce or Garlic significantly improves matches.",
                  icon: "🌶️",
                },
                {
                  title: "Hit Raid!",
                  desc: "We prioritize recipes you can make with the highest percentage of ingredients.",
                  icon: "✨",
                },
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-6">
                  <span className="text-4xl">{tip.icon}</span>
                  <div>
                    <h4 className="font-black text-slate-black mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

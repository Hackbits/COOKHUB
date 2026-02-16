"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Loader2,
  Check,
  RefreshCw,
  Clock,
  Utensils,
  Flame,
  User,
  X,
  Heart,
} from "lucide-react";
import { Recipe } from "@/lib/types";

export interface RefactoredRecipeData {
  title?: string;
  description?: string;
  time?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  servings?: number;
  calories?: number;
  protein?: string;
  carbs?: string;
  fats?: string;
  tags?: string[];
  ingredients?: { qty: string; name: string; category: string }[];
  steps?: {
    title: string;
    description: string;
    time: number;
    image?: string;
    proTip?: string;
    phase?: "Preparation" | "Cooking" | "Plating";
  }[];
}

interface RecipeRefactorModalProps {
  recipe: Recipe;
  onClose: () => void;
  onApply: (markdown: string, structured: RefactoredRecipeData | null) => void;
}

export default function RecipeRefactorModal({
  recipe,
  onClose,
  onApply,
}: RecipeRefactorModalProps) {
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [structured, setStructured] = useState<RefactoredRecipeData | null>(
    null,
  );

  const handleRefactor = async () => {
    if (!instruction) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/refactor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_text: JSON.stringify(recipe),
          instruction: instruction,
        }),
      });

      if (!response.ok) throw new Error("Failed to refactor recipe");

      const data = await response.json();
      setResult(data.result);
      setStructured(data.structured || null);
    } catch (error) {
      console.error(error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-white dark:bg-zinc-950 gap-0">
        {/* Header / Title Area */}
        <div className="p-6 pb-2 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-start bg-white dark:bg-zinc-950 z-20">
          <div>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-purple-600" size={24} />
              AI Chef Remix
            </DialogTitle>
            <DialogDescription>
              Transform your recipe with a click.
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <span className="sr-only">Close</span>
            <X size={20} />
          </Button>
        </div>

        <div className="flex flex-col h-[70vh]">
          {/* Main Content Area */}
          <ScrollArea className="flex-1 bg-gray-50/50 dark:bg-zinc-900/50 p-6">
            {!result ? (
              <div className="max-w-xl mx-auto py-8">
                <h3 className="text-lg font-bold mb-4 text-center">
                  How should I change this recipe?
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    "Make it Vegan 🌱",
                    "Make it Keto 🥩",
                    "Make it Spicy 🌶️",
                    "Under 400 Calories 🔥",
                    "Gluten-Free 🌾",
                    "High Protein 💪",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={instruction === option ? "default" : "outline"}
                      onClick={() => setInstruction(option)}
                      className={`justify-start text-left h-auto py-4 px-4 rounded-xl transition-all ${
                        instruction === option
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 border-transparent"
                          : "hover:border-purple-200 hover:bg-purple-50 dark:hover:border-purple-800 dark:hover:bg-purple-900/20"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                {structured ? (
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800 max-w-2xl mx-auto transform transition-all relative">
                    {/* Visual Header using Original Image */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt="Recipe preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-4 left-6 right-6 text-white">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-lg shadow-purple-900/20 uppercase text-[10px] font-black tracking-widest">
                            ✨ AI REMIXED
                          </Badge>
                          {structured.tags?.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur border-0 uppercase text-[10px] font-black"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold serif-font leading-tight shadow-black drop-shadow-md">
                          {structured.title}
                        </h2>
                      </div>

                      {/* Favorite Button Overlay */}
                      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-all">
                        <Heart size={20} />
                      </button>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-zinc-800 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <div className="p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-0.5">
                          Time
                        </span>
                        <div className="flex items-center justify-center gap-1 font-bold text-sm text-gray-900 dark:text-gray-100">
                          <Clock size={14} className="text-amber-500" />
                          {structured.time}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-0.5">
                          Difficulty
                        </span>
                        <div className="flex items-center justify-center gap-1 font-bold text-sm text-gray-900 dark:text-gray-100">
                          <Utensils size={14} className="text-amber-500" />
                          {structured.difficulty}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-0.5">
                          Calories
                        </span>
                        <div className="flex items-center justify-center gap-1 font-bold text-sm text-gray-900 dark:text-gray-100">
                          <Flame size={14} className="text-amber-500" />
                          {structured.calories}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-0.5">
                          Servings
                        </span>
                        <div className="flex items-center justify-center gap-1 font-bold text-sm text-gray-900 dark:text-gray-100">
                          <User size={14} className="text-amber-500" />
                          {structured.servings}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-4 border-purple-200 pl-4 py-1">
                        {structured.description}
                      </p>

                      {/* Ingredients */}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-white mb-4 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                          Key Ingredients
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {structured.ingredients?.map((ing, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-transparent hover:border-gray-200 transition-colors"
                            >
                              <span
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2"
                                title={ing.name}
                              >
                                {ing.name}
                              </span>
                              <span className="text-xs font-bold text-gray-500 bg-white dark:bg-zinc-800 px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                                {ing.qty}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Steps Preview (First 3) */}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest text-gray-900 dark:text-white mb-4 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                          Directions Preview
                        </h4>
                        <div className="space-y-4">
                          {structured.steps?.slice(0, 3).map((step, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                          {(structured.steps?.length || 0) > 3 && (
                            <div className="ml-10 pt-1">
                              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                + {(structured.steps?.length || 0) - 3} more
                                steps
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-purple max-w-none bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl text-sm border border-gray-100 shadow-inner">
                    <div className="whitespace-pre-wrap leading-relaxed opacity-80 font-medium">
                      {result}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Persistent Footer with Prompt Bar */}
          <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-20 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
            {!result ? (
              <div className="flex gap-2 items-end">
                <Textarea
                  id="ai-instruction-input"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Type remix instructions here..."
                  className="min-h-[60px] resize-none rounded-2xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 py-3 shadow-sm"
                />
                <Button
                  onClick={handleRefactor}
                  disabled={!instruction || isLoading}
                  size="lg"
                  className="h-[60px] w-[60px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/20 flex-shrink-0 p-0"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <Sparkles size={24} />
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setResult(null);
                    setStructured(null);
                  }}
                  className="rounded-xl border-gray-200 h-12 px-6"
                >
                  <RefreshCw className="mr-2" size={16} />
                  Try Again
                </Button>
                <Button
                  onClick={() => {
                    onApply(result, structured);
                    onClose();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-8 shadow-lg shadow-green-600/20"
                >
                  <Check className="mr-2" size={18} />
                  Apply Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

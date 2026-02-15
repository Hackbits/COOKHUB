"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Sparkles, Loader2, Check } from "lucide-react";
import { Recipe } from "@/lib/types";

interface RecipeRefactorModalProps {
  recipe: Recipe;
  onClose: () => void;
  onApply: (newRecipe: string) => void;
}

export default function RecipeRefactorModal({
  recipe,
  onClose,
  onApply,
}: RecipeRefactorModalProps) {
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

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
    } catch (error) {
      console.error(error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <DialogTitle>AI Recipe Chef</DialogTitle>
              <DialogDescription>Powered by Google Gemini</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {!result ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold mb-2">
                  How should I change this recipe?
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
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
                      variant={instruction === option ? "secondary" : "outline"}
                      onClick={() => setInstruction(option)}
                      className="justify-start text-left h-auto py-3"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <Textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Or type your own custom instruction here..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="prose prose-purple max-w-none">
              <div className="bg-purple-50 p-4 rounded-xl mb-4 text-purple-800 text-sm font-medium flex items-center gap-2">
                <Check size={16} />
                Here is your refactored recipe!
              </div>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-medium">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {!result ? (
            <Button
              onClick={handleRefactor}
              disabled={!instruction || isLoading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Refactoring...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Magic Refactor
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => {
                onApply(result);
                onClose();
              }}
            >
              <Check size={18} />
              Save to My Library
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

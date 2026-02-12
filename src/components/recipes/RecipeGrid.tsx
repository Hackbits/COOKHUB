"use client";

import React from "react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/lib/types";

interface RecipeGridProps {
  recipes: Recipe[];
  className?: string;
  stagger?: boolean;
}

export default function RecipeGrid({
  recipes,
  className = "",
  stagger = true,
}: RecipeGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${stagger ? "animate-stagger" : ""} ${className}`}
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

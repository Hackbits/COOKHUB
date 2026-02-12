"use client";

import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/lib/types";
import { useUserStore } from "@/store/useUserStore";
import { useMounted } from "@/lib/hooks";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const isMounted = useMounted();
  const { savedRecipes, toggleSavedRecipe } = useUserStore();
  const isFavorite = isMounted ? savedRecipes.includes(recipe.id) : false;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedRecipe(recipe.id);
  };

  return (
    <div className="relative group block h-full">
      <Link href={`/recipe/${recipe.id}`} className="block h-full">
        <div className="bg-white rounded-3xl overflow-hidden border border-orange-50 shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all flex flex-col h-full">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={recipe.image}
              width={500}
              height={400}
              priority
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              {recipe.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-amber-500 text-slate-black px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-amber-500">
                  schedule
                </span>
                {recipe.time}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-amber-500">
                  restaurant
                </span>
                {recipe.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-black mb-2 group-hover:text-primary transition-colors leading-snug">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {recipe.description}
            </p>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 fill-1 text-lg">
                  star
                </span>
                <span className="text-sm font-black">{recipe.rating}</span>
                <span className="text-xs text-gray-400">
                  ({recipe.reviews.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {recipe.author.name.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Primary Action Button (Move OUT of Link to avoid invalid nesting) */}
      <button
        onClick={handleFavorite}
        className={`absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center ${
          isFavorite || recipe.isFavorite ? "text-primary" : "text-gray-300"
        } hover:text-primary shadow-lg hover:scale-110 transition-all`}
      >
        <span
          className={`material-symbols-outlined ${isFavorite || recipe.isFavorite ? "fill-1" : ""}`}
        >
          favorite
        </span>
      </button>
    </div>
  );
}

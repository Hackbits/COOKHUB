"use client";

import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/lib/types";
import { useUserStore } from "@/store/useUserStore";
import { useMounted } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Utensils, Star, Heart } from "lucide-react";

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
        <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all flex flex-col h-full">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-500"
              src={recipe.image}
              width={500}
              height={400}
              priority
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              {recipe.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="uppercase text-[10px] font-black"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
              <span className="flex items-center gap-1">
                <Clock size={16} className="text-amber-500" />
                {recipe.time}
              </span>
              <span className="flex items-center gap-1">
                <Utensils size={16} className="text-amber-500" />
                {recipe.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors leading-snug">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {recipe.description}
            </p>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
              <div className="flex items-center gap-1">
                <Star size={18} className="text-amber-500 fill-amber-500" />
                <span className="text-sm font-black">{recipe.rating}</span>
                <span className="text-xs text-muted-foreground">
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
                <span className="text-xs font-medium text-muted-foreground">
                  {recipe.author.name.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFavorite}
        className={`absolute top-4 right-4 z-10 bg-background/95 backdrop-blur rounded-full ${
          isFavorite ? "text-primary" : "text-muted-foreground"
        } hover:text-primary shadow-lg`}
      >
        <Heart className={isFavorite ? "fill-current" : ""} size={20} />
      </Button>
    </div>
  );
}

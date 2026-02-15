"use client";

import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { CookHubData } from "@/lib/data";
import RecipeCard from "@/components/recipes/RecipeCard";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  UserPlus,
  Share2,
  Utensils,
  Bookmark,
  Plus,
} from "lucide-react";

export default function ProfilePage() {
  const { fullName, avatar, bio, badges, stats, isLoggedIn } = useUserStore();

  const [activeTab, setActiveTab] = useState("creations");

  // Fallback to Alex Rivera if not logged in (for demo purposes)
  const displayUser = isLoggedIn
    ? {
        name: fullName,
        avatar: avatar,
        bio: bio,
        badges: badges,
        stats: stats,
      }
    : {
        name: "Chef Alex Rivera",
        avatar:
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200&h=200",
        bio: "Culinary experimenter focusing on modern gastronomy and sous-vide techniques. Former executive chef at Studio Culinare. Sharing 15 years of kitchen wisdom.",
        badges: ["GOLD TIER COOK", "PRO"],
        stats: {
          recipes: 124,
          followers: 12500,
          saves: 890,
        },
      };

  const myRecipes = CookHubData.recipes.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <section className="bg-background pt-12 pb-8 border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-xl">
                <Image
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-red-500 rounded-full border-4 border-background flex items-center justify-center">
                <Check className="text-white text-xs font-bold" size={14} />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight serif-font">
                  {displayUser.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {displayUser.badges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      variant={badge.includes("GOLD") ? "secondary" : "outline"}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-3">
                  <Button>
                    <UserPlus size={16} />
                    Follow
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-6">
                {displayUser.bio}
              </p>

              <div className="flex gap-12">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black serif-font">
                    {displayUser.stats.recipes}
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Recipes
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black serif-font">
                    {(displayUser.stats.followers / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Followers
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black serif-font">
                    {displayUser.stats.saves}
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Saves
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="line">
              <TabsTrigger value="creations" className="gap-2">
                <Utensils size={16} />
                My Creations
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <Bookmark size={16} />
                Saved Cookbook
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section className="py-12 bg-muted/50 min-h-[400px]">
        <div className="max-w-[1440px] mx-auto px-6">
          {activeTab === "creations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="text-center py-20 bg-background rounded-3xl border-2 border-dashed border-border">
              <Bookmark
                className="text-muted-foreground mb-4 mx-auto"
                size={64}
              />
              <h3 className="text-xl font-bold text-muted-foreground">
                No saved recipes yet
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <Button
        asChild
        size="lg"
        className="fixed bottom-12 right-12 z-50 shadow-2xl"
      >
        <Link href="/creator-studio">
          <Plus size={20} />
          Post New Recipe
        </Link>
      </Button>
    </div>
  );
}

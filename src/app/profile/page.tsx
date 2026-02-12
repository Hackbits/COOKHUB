"use client";

import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { CookHubData } from "@/lib/data";
import RecipeCard from "@/components/recipes/RecipeCard";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { fullName, avatar, bio, badges, stats, isLoggedIn } = useUserStore();

  const [activeTab, setActiveTab] = useState<"creations" | "saved">(
    "creations",
  );

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
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <section className="bg-white pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xs font-bold">
                  check
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-black text-slate-black tracking-tight serif-font">
                  {displayUser.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {displayUser.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${
                        badge.includes("GOLD")
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-3">
                  <button className="bg-slate-black text-white px-8 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-primary transition-all shadow-lg shadow-black/10">
                    <span className="material-symbols-outlined text-sm">
                      person_add
                    </span>
                    Follow
                  </button>
                  <button className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>

              <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-6">
                {displayUser.bio}
              </p>

              <div className="flex gap-12">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black text-slate-black serif-font">
                    {displayUser.stats.recipes}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Recipes
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black text-slate-black serif-font">
                    {(displayUser.stats.followers / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Followers
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black text-slate-black serif-font">
                    {displayUser.stats.saves}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Saves
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("creations")}
              className={`py-6 flex items-center gap-2 text-sm font-bold transition-all border-b-2 ${
                activeTab === "creations"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                restaurant_menu
              </span>
              My Creations
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`py-6 flex items-center gap-2 text-sm font-bold transition-all border-b-2 ${
                activeTab === "saved"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                bookmark
              </span>
              Saved Cookbook
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50/50 min-h-[400px]">
        <div className="max-w-[1440px] mx-auto px-6">
          {activeTab === "creations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">
                bookmark
              </span>
              <h3 className="text-xl font-bold text-gray-400">
                No saved recipes yet
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <Link
        href="/creator-studio"
        className="fixed bottom-12 right-12 bg-red-500 text-white px-8 py-5 rounded-3xl font-black text-sm flex items-center gap-3 hover:bg-slate-black transition-all shadow-2xl shadow-red-500/40 z-50 animate-bounce-subtle"
      >
        <span className="material-symbols-outlined">add</span>
        Post New Recipe
      </Link>
    </div>
  );
}

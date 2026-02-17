"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { getRecipes } from "@/lib/services/recipe-service";
import { getReviewsByRecipe } from "@/lib/services/review-service";
import type { Recipe, Review } from "@/lib/types";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/custom-ui/SearchBar";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  ArrowRight,
  PlusCircle,
  Check,
  Star,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(8);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const allRecipes = await getRecipes();
        setRecipes(allRecipes);
        // Load reviews for the first recipe (for the Community Reviews section)
        if (allRecipes.length > 0) {
          const firstRecipeReviews = await getReviewsByRecipe(allRecipes[0].id);
          setReviews(firstRecipeReviews);
        }
      } catch (err) {
        console.error("Failed to load recipes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden h-[420px] shadow-2xl shadow-orange-100">
            <Image
              alt="Culinary Background"
              className="object-cover"
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-black/90 via-slate-black/50 to-transparent flex flex-col justify-center px-8 md:px-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-xl leading-tight serif-font">
                Savor every <br />
                <span className="text-primary italic">moment</span> and meal.
              </h2>

              <div className="max-w-2xl">
                <SearchBar
                  onSearch={(q) =>
                    router.push(`/discovery?q=${encodeURIComponent(q)}`)
                  }
                  placeholder="What are you craving today?"
                />
              </div>

              <p className="mt-4 text-white/80 text-sm font-medium ml-2 flex items-center gap-2">
                <Flame className="text-accent fill-accent" size={16} />
                Try &quot;Warm autumn soup with roasted pumpkin&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {[
              { icon: "🎂", label: "Birthday", filter: "birthday" },
              { icon: "⚡", label: "Quick & Easy", filter: "quick" },
              { icon: "🥗", label: "Healthy", filter: "healthy" },
              { icon: "💑", label: "Date Night", filter: "date" },
              { icon: "🌿", label: "Vegetarian", filter: "vegetarian" },
              { icon: "🌶️", label: "Spicy", filter: "spicy" },
              { icon: "🍰", label: "Desserts", filter: "dessert" },
            ].map((cat) => (
              <button
                key={cat.filter}
                onClick={() => router.push(`/discovery?filter=${cat.filter}`)}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 bg-white border-2 border-orange-100 rounded-2xl hover:border-primary hover:bg-primary hover:text-white transition-all group cursor-pointer"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-bold text-slate-black group-hover:text-white whitespace-nowrap">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Recipes */}
      <section id="recommended" className="py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-2">
                🍽️ Recommended For You
              </h2>
              <p className="text-gray-500">
                Handpicked recipes based on popular choices
              </p>
            </div>
            <button
              onClick={() => router.push("/discovery")}
              className="flex items-center gap-2 text-primary font-bold hover:underline"
            >
              View All
              <ArrowRight />
            </button>
          </div>

          <RecipeGrid recipes={recipes.slice(0, visibleCount)} />

          {visibleCount < recipes.length && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="uppercase tracking-widest"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle />
                  Load More Recipes
                </span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Creator Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Chef Alex Rivera"
                  className="object-cover"
                  width={256}
                  height={256}
                />
              </div>
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <Check className="text-white" size={16} strokeWidth={4} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <Badge variant="secondary">GOLD TIER COOK</Badge>
                <Badge variant="outline">PRO</Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-black mb-4 serif-font">
                Chef Alex Rivera
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-xl leading-relaxed">
                Culinary experimenter focusing on modern gastronomy and
                sous-vide techniques. Sharing 15 years of kitchen wisdom with
                the CookHub community.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 mb-8">
                <div>
                  <div className="text-2xl font-black text-slate-black serif-font">
                    124
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Recipes
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-black serif-font">
                    12.5k
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Followers
                  </div>
                </div>
                <button
                  onClick={() => router.push("/profile")}
                  className="bg-slate-black text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-primary transition-all shadow-lg shadow-black/10"
                >
                  View Full Profile
                </button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 w-1/3">
              {[
                {
                  image:
                    "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=500&h=500&fit=crop",
                  title: "Deconstructed Beet Salad",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop",
                  title: "Sous-vide Salmon",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=500&h=500&fit=crop",
                  title: "Mirror Glaze Mousse",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1626077366710-d02951dc4056?w=500&h=500&fit=crop",
                  title: "Scallop Carpaccio",
                },
              ].map((recipe, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-2xl overflow-hidden shadow-md group/img relative"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-bold truncate">
                      {recipe.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            ⭐ Community Reviews
          </h2>
          <p className="text-gray-500 mb-10">What our community is saying</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-soft-cream p-6 rounded-3xl border border-orange-50 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-black text-sm">
                        {review.user}
                      </h4>
                      <div className="flex items-center text-primary">
                        {Array(review.rating).map((_, i) => (
                          <Star
                            key={i}
                            className="fill-current text-primary"
                            size={16}
                          />
                        ))}
                        <span className="ml-2 text-xs text-slate-400 font-bold">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="bg-orange-100 text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Verified Cook
                    </span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {review.comment}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                    <ThumbsUp size={18} />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-black transition-colors">
                    <MessageCircle size={18} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="relative bg-gradient-to-r from-primary to-amber-500 rounded-[2.5rem] p-12 md:p-16 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 serif-font">
                Ready to start your culinary journey?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join thousands of food enthusiasts. Discover, cook, and share
                amazing recipes with our community.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/discovery")}
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-slate-black hover:text-white transition-all shadow-lg"
                >
                  Explore Recipes
                </button>
                <button
                  onClick={() => router.push("/fridge-raid")}
                  className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all border border-white/30"
                >
                  Try Fridge Raid
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Image as ImageIcon,
  Utensils,
  BarChart2,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Star,
} from "lucide-react";

const posts = [
  {
    id: 1,
    user: {
      name: "Chef Marcus Chen",
      avatar:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
      badge: "Pro Chef",
    },
    content:
      "Just perfected my miso-ginger glaze technique! The secret is to simmer on low heat and whisk constantly. Who wants the updated recipe? 🐟✨",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=400&fit=crop",
    likes: 234,
    comments: 45,
    shares: 12,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Elena Costa",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      badge: "Food Blogger",
    },
    content:
      "Mediterranean Monday! Made this colorful quinoa bowl with fresh ingredients from the farmers market. The key to a great dressing: quality olive oil + fresh lemon 🍋",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
    likes: 189,
    comments: 32,
    shares: 8,
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Sofia Rossi",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      badge: "Home Cook",
    },
    content:
      "Wild mushroom risotto night! 🍄 Took 45 minutes of constant stirring but SO worth it. Pro tip: warm your broth before adding it to the rice.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=400&fit=crop",
    likes: 312,
    comments: 67,
    shares: 23,
    time: "1 day ago",
  },
  {
    id: 4,
    user: {
      name: "Carlos Rivera",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      badge: "Taco Master",
    },
    content:
      "Taco Tuesday is a lifestyle, not just a day 🌮 Sharing my family's homemade seasoning blend recipe in the comments!",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop",
    likes: 456,
    comments: 89,
    shares: 34,
    time: "2 days ago",
  },
];

const trendingTopics = [
  { tag: "#MealPrep", count: "12.4K posts" },
  { tag: "#PlantBased", count: "8.9K posts" },
  { tag: "#HomeBaking", count: "6.2K posts" },
  { tag: "#FermentEverything", count: "4.1K posts" },
  { tag: "#SousVide", count: "3.8K posts" },
];

export default function CommunityPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-purple-50 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            👨‍🍳 Community
          </h1>
          <p className="text-gray-500 text-lg">
            Connect with food lovers, share recipes, and get inspired
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                    Y
                  </div>
                  <input
                    className="flex-1 bg-gray-50 h-12 px-5 rounded-xl border border-gray-200 text-sm placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="Share a recipe tip, photo, or your latest creation..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      <ImageIcon className="text-lg text-green-500" size={20} />
                      Photo
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      <Utensils className="text-lg text-blue-500" size={20} />
                      Recipe
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      <BarChart2 className="text-lg text-amber-500" size={20} />
                      Poll
                    </button>
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-black transition-all">
                    Post
                  </button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={post.user.avatar}
                        alt={post.user.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm">
                            {post.user.name}
                          </h4>
                          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {post.user.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{post.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt="Post"
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                            likedPosts.includes(post.id)
                              ? "text-primary"
                              : "text-gray-400 hover:text-primary"
                          }`}
                        >
                          <Heart
                            className={`text-lg ${likedPosts.includes(post.id) ? "fill-current" : ""}`}
                            size={20}
                          />
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-blue-500 transition-colors">
                          <MessageCircle className="text-lg" size={20} />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-green-500 transition-colors">
                          <Share2 className="text-lg" size={20} />
                          {post.shares}
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-amber-500 transition-colors">
                        <Bookmark className="text-lg" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-primary" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.tag}
                      className="flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-primary">
                        {topic.tag}
                      </span>
                      <span className="text-xs text-gray-400">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Creators */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Star className="text-amber-500 fill-amber-500" />
                  Top Creators
                </h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center gap-3">
                      <Image
                        src={post.user.avatar}
                        alt={post.user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate">
                          {post.user.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {post.user.badge}
                        </p>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

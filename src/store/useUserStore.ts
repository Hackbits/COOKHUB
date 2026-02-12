/**
 * COOKHUB - User Store (Zustand)
 * Manages user authentication state and preferences
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  name: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  badges: string[];
  stats: {
    recipes: number;
    followers: number;
    saves: number;
  };
  inventory: string[];
  dietaryPreferences: string[];
  savedRecipes: number[];
  cookedRecipes: number[];

  // Actions
  login: (user: {
    name: string;
    fullName: string;
    email: string;
    avatar?: string;
  }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserState>) => void;
  toggleSavedRecipe: (recipeId: number) => void;
  markAsCooked: (recipeId: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      name: "",
      fullName: "",
      email: "",
      avatar: "",
      bio: "Culinary experimenter focusing on modern gastronomy and sous-vide techniques.",
      badges: ["GOLD TIER COOK", "PRO"],
      stats: {
        recipes: 124,
        followers: 12500,
        saves: 890,
      },
      inventory: [
        "Thermomix TM6",
        "Anova Sous Vide",
        "KitchenAid Stand Mixer",
        "Air Fryer Max",
      ],
      dietaryPreferences: [
        "Pescatarian",
        "Low Carb",
        "No Added Sugar",
        "Gluten-Free Friendly",
      ],
      savedRecipes: [],
      cookedRecipes: [],

      login: (user) =>
        set({
          isLoggedIn: true,
          name: user.name,
          fullName: user.fullName,
          email: user.email,
          avatar:
            user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=ef4444&color=fff`,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          name: "",
          fullName: "",
          email: "",
          avatar: "",
          bio: "",
          badges: [],
          stats: { recipes: 0, followers: 0, saves: 0 },
          inventory: [],
          dietaryPreferences: [],
          savedRecipes: [],
          cookedRecipes: [],
        }),

      updateProfile: (data) => set((state) => ({ ...state, ...data })),

      toggleSavedRecipe: (recipeId) =>
        set((state) => ({
          savedRecipes: state.savedRecipes.includes(recipeId)
            ? state.savedRecipes.filter((id) => id !== recipeId)
            : [...state.savedRecipes, recipeId],
        })),

      markAsCooked: (recipeId) =>
        set((state) => ({
          cookedRecipes: state.cookedRecipes.includes(recipeId)
            ? state.cookedRecipes
            : [...state.cookedRecipes, recipeId],
        })),
    }),
    {
      name: "cookhub-user",
    },
  ),
);

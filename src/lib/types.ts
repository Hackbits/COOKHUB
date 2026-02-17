/**
 * COOKHUB - TypeScript Type Definitions
 * IDs are Firestore auto-generated strings.
 */

export interface Ingredient {
  qty: string;
  name: string;
  category: "meatSeafood" | "pantry" | "produce" | "dairy";
  substitutes?: string[];
}

export interface Step {
  title: string;
  description: string;
  time: number; // in minutes
  image?: string;
  proTip?: string;
  phase?: "Preparation" | "Cooking" | "Plating";
}

export interface Author {
  name: string;
  avatar: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  reviews: number;
  servings: number;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  image: string;
  tags: string[];
  category: string;
  cuisine: string;
  ingredients: Ingredient[];
  steps: Step[];
  author: Author;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  color: string;
  recipeIds: string[];
  userId?: string;
}

export interface Review {
  id: string;
  recipeId: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
  avatar: string;
  createdAt?: unknown;
}

export interface User {
  firebaseUid: string;
  name: string;
  fullName: string;
  email: string;
  avatar: string;
  memberSince: string;
  savedRecipes: string[];
  cookedRecipes: string[];
  isLoggedIn: boolean;
  isPro?: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "incomplete";
}

export interface ShoppingItem {
  name: string;
  qty: string;
  checked: boolean;
  category: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  link?: string;
}

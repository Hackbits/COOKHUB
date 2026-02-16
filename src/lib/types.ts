/**
 * COOKHUB - TypeScript Type Definitions
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
}

export interface Author {
  name: string;
  avatar: string;
}

export interface Recipe {
  id: number;
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
}

export interface Collection {
  id: number;
  name: string;
  icon: string;
  color: string;
  recipeIds: number[];
}

export interface Review {
  id: number;
  recipeId: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
  avatar: string;
}

export interface User {
  name: string;
  fullName: string;
  email: string;
  avatar: string;
  memberSince: string;
  savedRecipes: number[];
  cookedRecipes: number[];
  isLoggedIn: boolean;
}

export interface ShoppingItem {
  name: string;
  qty: string;
  checked: boolean;
  category: string;
}

export interface CookHubDataType {
  recipes: Recipe[];
  collections: Collection[];
  reviews: Review[];
  user: User;
}

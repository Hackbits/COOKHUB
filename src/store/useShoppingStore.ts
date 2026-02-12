/**
 * COOKHUB - Shopping List Store (Zustand)
 * Manages the global shopping list state across all pages
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShoppingItem {
  id: string;
  name: string;
  qty: string;
  category: string;
  checked: boolean;
  recipeId?: number;
}

interface ShoppingStore {
  items: ShoppingItem[];
  addItem: (item: Omit<ShoppingItem, "id" | "checked">) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  updateItemQty: (id: string, qty: string) => void;
  clearCompleted: () => void;
  clearAll: () => void;
  addRecipeIngredients: (
    recipeId: number,
    ingredients: { name: string; qty: string; category: string }[],
  ) => void;
}

export const MAX_SHOPPING_ITEMS = 15;

export const useShoppingStore = create<ShoppingStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          if (state.items.length >= MAX_SHOPPING_ITEMS) return state;
          return {
            items: [
              ...state.items,
              {
                ...item,
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                checked: false,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        })),

      updateItemQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty } : item,
          ),
        })),

      clearCompleted: () =>
        set((state) => ({
          items: state.items.filter((item) => !item.checked),
        })),

      clearAll: () => set({ items: [] }),

      addRecipeIngredients: (recipeId, ingredients) =>
        set((state) => {
          // Determine how many slots are actually available
          const availableSlots = Math.max(
            0,
            MAX_SHOPPING_ITEMS - state.items.length,
          );

          if (availableSlots <= 0) return state;

          // Filter out ingredients that are already in the list (case-insensitive)
          const existingNames = new Set(
            state.items.map((i) => i.name.toLowerCase()),
          );
          const uniqueNewIngs = ingredients.filter(
            (ing) => !existingNames.has(ing.name.toLowerCase()),
          );

          // Take only as many as fit in available slots
          const itemsToAdd = uniqueNewIngs.slice(0, availableSlots);

          if (itemsToAdd.length === 0) return state;

          const newItems = itemsToAdd.map((ing) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: ing.name,
            qty: ing.qty,
            category: ing.category,
            checked: false,
            recipeId,
          }));

          return { items: [...state.items, ...newItems] };
        }),
    }),
    {
      name: "cookhub-shopping-list",
    },
  ),
);

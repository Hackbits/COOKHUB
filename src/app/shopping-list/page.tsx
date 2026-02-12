"use client";

import { useShoppingStore, MAX_SHOPPING_ITEMS } from "@/store/useShoppingStore";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ShoppingListPage() {
  const {
    items,
    addItem,
    removeItem,
    toggleItem,
    updateItemQty,
    clearCompleted,
    clearAll,
  } = useShoppingStore();
  const [quickInput, setQuickInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");

  const handleQuickAdd = () => {
    if (quickInput.trim()) {
      addItem({
        name: quickInput.trim(),
        qty: qtyInput.trim() || "1",
        category: "other",
      });
      setQuickInput("");
      setQtyInput("");
    }
  };

  const completedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const isAtLimit = totalCount >= MAX_SHOPPING_ITEMS;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            🛒 Shopping List
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            {totalCount === 0
              ? "Your shopping list is empty"
              : `${completedCount} of ${totalCount} items checked off · ${MAX_SHOPPING_ITEMS - totalCount} slots remaining`}
          </p>

          {isAtLimit && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm font-semibold mb-4">
              <span className="material-symbols-outlined text-lg">warning</span>
              Shopping list is full ({MAX_SHOPPING_ITEMS} items max). Remove
              items to add more.
            </div>
          )}

          {/* Quick Add Form */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-3">
              {/* Item Name */}
              <div className="relative group flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-blue-500 transition-colors text-lg">
                    add_circle
                  </span>
                </div>
                <input
                  className="w-full bg-gray-50 h-12 pl-12 pr-4 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 placeholder:text-gray-400 outline-none transition-all"
                  placeholder="Item name (e.g. Chicken breast)"
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
                />
              </div>

              {/* Quantity */}
              <div className="relative group w-28">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-blue-500 transition-colors text-base">
                    tag
                  </span>
                </div>
                <input
                  className="w-full bg-gray-50 h-12 pl-9 pr-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 placeholder:text-gray-400 outline-none transition-all"
                  placeholder="QTY"
                  type="text"
                  value={qtyInput}
                  onChange={(e) => setQtyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
                />
              </div>

              {/* Add Button */}
              <Button
                onClick={handleQuickAdd}
                disabled={!quickInput.trim() || isAtLimit}
                size="sm"
                className="h-12"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping List */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          {totalCount > 0 && (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-500">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    {totalCount > 0
                      ? Math.round((completedCount / totalCount) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-4 bg-white rounded-xl border transition-all ${
                      item.checked
                        ? "border-green-200 bg-green-50/50"
                        : "border-gray-100 hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        item.checked
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {item.checked && (
                        <span className="material-symbols-outlined text-sm">
                          check
                        </span>
                      )}
                    </button>

                    {/* Item Name */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-sm font-medium ${
                          item.checked
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Editable Quantity */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          const current = parseFloat(item.qty) || 1;
                          if (current > 1) {
                            updateItemQty(item.id, String(current - 1));
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={item.qty}
                        onChange={(e) => updateItemQty(item.id, e.target.value)}
                        className="w-14 h-7 text-center text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      />
                      <button
                        onClick={() => {
                          const current = parseFloat(item.qty) || 0;
                          updateItemQty(item.id, String(current + 1));
                        }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-8">
                {completedCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearCompleted}
                    className="text-gray-600 hover:text-red-500 hover:border-red-300"
                  >
                    <span className="material-symbols-outlined text-lg mr-2">
                      delete_sweep
                    </span>
                    Clear Completed ({completedCount})
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={clearAll}
                  className="text-gray-600 hover:text-red-500 hover:border-red-300"
                >
                  <span className="material-symbols-outlined text-lg mr-2">
                    delete
                  </span>
                  Clear All
                </Button>
              </div>
            </>
          )}

          {/* Empty State */}
          {totalCount === 0 && (
            <div className="text-center py-20">
              <span className="text-8xl mb-6 block">🛒</span>
              <h3 className="text-2xl font-bold mb-3">Your list is empty</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Add items manually above, or go to any recipe and click
                &quot;Add to Shopping List&quot; to import all ingredients.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function CreatorStudioPage() {
  const [activeTab, setActiveTab] = useState<
    "create" | "my-recipes" | "analytics"
  >("create");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("4");
  const [ingredients, setIngredients] = useState([{ qty: "", name: "" }]);
  const [steps, setSteps] = useState([
    { title: "", description: "", time: "" },
  ]);

  const addIngredient = () =>
    setIngredients([...ingredients, { qty: "", name: "" }]);
  const removeIngredient = (idx: number) =>
    setIngredients(ingredients.filter((_, i) => i !== idx));

  const addStep = () =>
    setSteps([...steps, { title: "", description: "", time: "" }]);
  const removeStep = (idx: number) =>
    setSteps(steps.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Recipe created! (This will connect to the backend in Phase 2)");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-amber-50 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            🧑‍🍳 Creator Studio
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Create, publish, and manage your recipes
          </p>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 max-w-md">
            {(["create", "my-recipes", "analytics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all capitalize ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "my-recipes"
                  ? "My Recipes"
                  : tab === "analytics"
                    ? "Analytics"
                    : "Create"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Create Tab */}
          {activeTab === "create" && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    edit_note
                  </span>
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Recipe Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Give your recipe a catchy name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24 resize-none"
                      placeholder="Describe your dish in a few sentences"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Cuisine
                      </label>
                      <input
                        type="text"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                        placeholder="Italian"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm cursor-pointer"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Cook Time
                      </label>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                        placeholder="25 mins"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Servings
                      </label>
                      <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                        min="1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Cover Image
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
                        add_photo_alternate
                      </span>
                      <p className="text-sm text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500">
                    grocery
                  </span>
                  Ingredients
                </h2>
                <div className="space-y-3">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-400 w-6">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={ing.qty}
                        onChange={(e) => {
                          const updated = [...ingredients];
                          updated[idx].qty = e.target.value;
                          setIngredients(updated);
                        }}
                        className="w-28 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="2 cups"
                      />
                      <input
                        type="text"
                        value={ing.name}
                        onChange={(e) => {
                          const updated = [...ingredients];
                          updated[idx].name = e.target.value;
                          setIngredients(updated);
                        }}
                        className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Ingredient name"
                      />
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            close
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-4 flex items-center gap-2 text-sm text-primary font-bold hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Ingredient
                </button>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">
                    format_list_numbered
                  </span>
                  Cooking Steps
                </h2>
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                        {idx + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...steps];
                            updated[idx].title = e.target.value;
                            setSteps(updated);
                          }}
                          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="Step title"
                        />
                        <textarea
                          value={step.description}
                          onChange={(e) => {
                            const updated = [...steps];
                            updated[idx].description = e.target.value;
                            setSteps(updated);
                          }}
                          className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-20 resize-none"
                          placeholder="Describe this step in detail"
                        />
                        <input
                          type="text"
                          value={step.time}
                          onChange={(e) => {
                            const updated = [...steps];
                            updated[idx].time = e.target.value;
                            setSteps(updated);
                          }}
                          className="w-24 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="5 min"
                        />
                      </div>
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors mt-1"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addStep}
                  className="mt-4 flex items-center gap-2 text-sm text-primary font-bold hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Step
                </button>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-slate-black transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">publish</span>
                  Publish Recipe
                </button>
                <button
                  type="button"
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:border-gray-300 transition-all"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          )}

          {/* My Recipes Tab */}
          {activeTab === "my-recipes" && (
            <div className="animate-fade-in text-center py-20">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                menu_book
              </span>
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                No recipes yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start creating your first recipe!
              </p>
              <button
                onClick={() => setActiveTab("create")}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-slate-black transition-all"
              >
                Create Recipe
              </button>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    label: "Total Views",
                    value: "0",
                    icon: "visibility",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    label: "Total Likes",
                    value: "0",
                    icon: "favorite",
                    color: "bg-red-50 text-red-500",
                  },
                  {
                    label: "Recipes Published",
                    value: "0",
                    icon: "menu_book",
                    color: "bg-green-50 text-green-600",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}
                    >
                      <span className="material-symbols-outlined">
                        {stat.icon}
                      </span>
                    </div>
                    <div className="text-3xl font-extrabold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Publish recipes to start seeing analytics
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

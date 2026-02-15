"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  ImagePlus,
  ShoppingBasket,
  Plus,
  X,
  ListOrdered,
  Trash2,
  Send,
  BookOpen,
  Eye,
  Heart,
  Book,
} from "lucide-react";

export default function CreatorStudioPage() {
  const [activeTab, setActiveTab] = useState("create");
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
          <p className="text-muted-foreground text-lg mb-8">
            Create, publish, and manage your recipes
          </p>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-md"
          >
            <TabsList>
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Create Tab */}
          {activeTab === "create" && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
              {/* Basic Info */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Edit className="text-primary" />
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipe-title">Recipe Title *</Label>
                      <Input
                        id="recipe-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your recipe a catchy name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipe-desc">Description *</Label>
                      <Textarea
                        id="recipe-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your dish in a few sentences"
                        required
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine</Label>
                        <Input
                          id="cuisine"
                          value={cuisine}
                          onChange={(e) => setCuisine(e.target.value)}
                          placeholder="Italian"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Difficulty</Label>
                        <Select
                          value={difficulty}
                          onValueChange={setDifficulty}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cook-time">Cook Time</Label>
                        <Input
                          id="cook-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          placeholder="25 mins"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="servings">Servings</Label>
                        <Input
                          id="servings"
                          type="number"
                          value={servings}
                          onChange={(e) => setServings(e.target.value)}
                          min={1}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <ImagePlus
                          className="text-muted-foreground mb-2 mx-auto"
                          size={40}
                        />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBasket className="text-green-500" />
                    Ingredients
                  </h2>
                  <div className="space-y-3">
                    {ingredients.map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-muted-foreground w-6">
                          {idx + 1}
                        </span>
                        <Input
                          value={ing.qty}
                          onChange={(e) => {
                            const updated = [...ingredients];
                            updated[idx].qty = e.target.value;
                            setIngredients(updated);
                          }}
                          className="w-28"
                          placeholder="2 cups"
                        />
                        <Input
                          value={ing.name}
                          onChange={(e) => {
                            const updated = [...ingredients];
                            updated[idx].name = e.target.value;
                            setIngredients(updated);
                          }}
                          className="flex-1"
                          placeholder="Ingredient name"
                        />
                        {ingredients.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIngredient(idx)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X size={18} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addIngredient}
                    className="mt-4"
                  >
                    <Plus size={14} />
                    Add Ingredient
                  </Button>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ListOrdered className="text-blue-500" />
                    Cooking Steps
                  </h2>
                  <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 bg-muted rounded-xl border border-border"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                          {idx + 1}
                        </div>
                        <div className="flex-1 space-y-3">
                          <Input
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].title = e.target.value;
                              setSteps(updated);
                            }}
                            placeholder="Step title"
                            className="font-semibold"
                          />
                          <Textarea
                            value={step.description}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].description = e.target.value;
                              setSteps(updated);
                            }}
                            placeholder="Describe this step in detail"
                            className="resize-none"
                            rows={3}
                          />
                          <Input
                            value={step.time}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].time = e.target.value;
                              setSteps(updated);
                            }}
                            className="w-24"
                            placeholder="5 min"
                          />
                        </div>
                        {steps.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStep(idx)}
                            className="text-muted-foreground hover:text-destructive mt-1"
                          >
                            <Trash2 />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addStep}
                    className="mt-4"
                  >
                    <Plus size={14} />
                    Add Step
                  </Button>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <Button type="submit" size="lg">
                  <Send size={20} />
                  Publish Recipe
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Save as Draft
                </Button>
              </div>
            </form>
          )}

          {/* My Recipes Tab */}
          {activeTab === "my-recipes" && (
            <div className="animate-fade-in text-center py-20">
              <BookOpen
                className="text-muted-foreground mb-4 mx-auto"
                size={64}
              />
              <h3 className="text-xl font-bold text-muted-foreground mb-2">
                No recipes yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start creating your first recipe!
              </p>
              <Button onClick={() => setActiveTab("create")}>
                Create Recipe
              </Button>
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
                    icon: <Eye />,
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    label: "Total Likes",
                    value: "0",
                    icon: <Heart />,
                    color: "bg-red-50 text-red-500",
                  },
                  {
                    label: "Recipes Published",
                    value: "0",
                    icon: <Book />,
                    color: "bg-green-50 text-green-600",
                  },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-extrabold mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
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

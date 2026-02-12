/**
 * COOKHUB - Collaborative Culinary Platform
 * Main JavaScript Application
 */

// ============================================
// DATA STORE - All recipe and user data
// ============================================

const CookHubData = {
  recipes: [
    {
      id: 1,
      title: "Miso-Ginger Glazed Salmon Bowl",
      description:
        "A delicious Asian-inspired salmon bowl with umami-rich miso glaze",
      time: "25 mins",
      difficulty: "Medium",
      rating: 4.9,
      reviews: 1248,
      servings: 4,
      calories: 480,
      protein: "32g",
      carbs: "18g",
      fats: "24g",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
      tags: ["High Protein", "Asian", "Healthy"],
      category: "Main Course",
      cuisine: "Japanese",
      ingredients: [
        { qty: "2 lbs", name: "Fresh Salmon Fillets", category: "meatSeafood" },
        {
          qty: "1/2 cup",
          name: "Soy Sauce",
          category: "pantry",
          substitutes: ["Tamari", "Coconut Aminos"],
        },
        { qty: "2 tbsp", name: "White Miso Paste", category: "pantry" },
        { qty: "1 tbsp", name: "Fresh Ginger (grated)", category: "produce" },
        {
          qty: "2 tbsp",
          name: "Honey",
          category: "pantry",
          substitutes: ["Maple Syrup", "Agave"],
        },
        { qty: "1 tbsp", name: "Rice Vinegar", category: "pantry" },
        {
          qty: "2 cups",
          name: "Cooked White Rice",
          category: "pantry",
          substitutes: ["Quinoa", "Cauliflower Rice"],
        },
        { qty: "1 bunch", name: "Green Onions", category: "produce" },
        { qty: "1 tbsp", name: "Sesame Seeds", category: "pantry" },
        { qty: "1", name: "Cucumber (sliced)", category: "produce" },
      ],
      steps: [
        {
          title: "Prepare the Glaze",
          description:
            "In a small saucepan, whisk together miso paste, soy sauce, ginger, honey, and rice vinegar. Simmer over medium heat for 5-7 minutes until slightly thickened.",
          time: 7,
        },
        {
          title: "Season the Salmon",
          description:
            "Pat salmon fillets dry with paper towels. Season both sides with salt and pepper.",
          time: 2,
        },
        {
          title: "Sear the Salmon",
          description:
            "Heat oil in a large skillet over medium-high heat. Place salmon skin-side up and cook for 4 minutes until golden.",
          time: 4,
        },
        {
          title: "Apply the Glaze",
          description:
            "Flip salmon, brush generously with the glaze. Cook for 3-4 minutes. Brush with more glaze.",
          time: 4,
        },
        {
          title: "Assemble Bowls",
          description:
            "Divide rice among bowls. Top with glazed salmon, cucumber, green onions, and sesame seeds. Drizzle remaining glaze.",
          time: 3,
        },
      ],
      author: {
        name: "Chef Marcus Chen",
        avatar:
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
      },
      isFavorite: true,
    },
    {
      id: 2,
      title: "Mediterranean Quinoa Power Bowl",
      description:
        "Vibrant and nutritious bowl packed with Mediterranean flavors",
      time: "20 mins",
      difficulty: "Easy",
      rating: 4.7,
      reviews: 856,
      servings: 2,
      calories: 420,
      protein: "18g",
      carbs: "45g",
      fats: "20g",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      tags: ["Vegan", "Gluten-Free", "Healthy"],
      category: "Salad",
      cuisine: "Mediterranean",
      ingredients: [
        { qty: "1 cup", name: "Quinoa", category: "pantry" },
        { qty: "1 can", name: "Chickpeas (drained)", category: "pantry" },
        { qty: "1 cup", name: "Cherry Tomatoes", category: "produce" },
        { qty: "1/2", name: "Red Onion (sliced)", category: "produce" },
        { qty: "1/2 cup", name: "Kalamata Olives", category: "pantry" },
        { qty: "1/2 cup", name: "Feta Cheese", category: "dairy" },
        { qty: "1", name: "Cucumber (diced)", category: "produce" },
        { qty: "3 tbsp", name: "Olive Oil", category: "pantry" },
        { qty: "2 tbsp", name: "Lemon Juice", category: "produce" },
      ],
      steps: [
        {
          title: "Cook Quinoa",
          description:
            "Rinse quinoa and cook according to package directions. Let cool slightly.",
          time: 15,
        },
        {
          title: "Prep Vegetables",
          description:
            "Halve cherry tomatoes, dice cucumber, slice red onion thinly.",
          time: 5,
        },
        {
          title: "Make Dressing",
          description:
            "Whisk olive oil, lemon juice, salt, pepper, and dried oregano.",
          time: 2,
        },
        {
          title: "Assemble",
          description:
            "Combine quinoa with vegetables, chickpeas, and olives. Drizzle dressing and top with feta.",
          time: 3,
        },
      ],
      author: {
        name: "Elena Costa",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      isFavorite: false,
    },
    {
      id: 3,
      title: "Creamy Tuscan Chicken",
      description:
        "Rich and creamy Italian-style chicken in sun-dried tomato sauce",
      time: "35 mins",
      difficulty: "Medium",
      rating: 4.9,
      reviews: 2341,
      servings: 4,
      calories: 520,
      protein: "42g",
      carbs: "12g",
      fats: "35g",
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop",
      tags: ["High Protein", "Comfort Food", "Italian"],
      category: "Main Course",
      cuisine: "Italian",
      ingredients: [
        { qty: "4", name: "Chicken Breasts", category: "meatSeafood" },
        { qty: "1 cup", name: "Heavy Cream", category: "dairy" },
        { qty: "1/2 cup", name: "Sun-dried Tomatoes", category: "pantry" },
        { qty: "3 cups", name: "Fresh Spinach", category: "produce" },
        { qty: "1/2 cup", name: "Parmesan Cheese", category: "dairy" },
        { qty: "4 cloves", name: "Garlic (minced)", category: "produce" },
        { qty: "1 cup", name: "Chicken Broth", category: "pantry" },
        { qty: "2 tbsp", name: "Olive Oil", category: "pantry" },
      ],
      steps: [
        {
          title: "Season Chicken",
          description:
            "Season chicken breasts with Italian seasoning, salt, and pepper.",
          time: 2,
        },
        {
          title: "Sear Chicken",
          description:
            "Cook chicken in olive oil until golden, about 6-7 minutes per side. Remove and set aside.",
          time: 15,
        },
        {
          title: "Make Sauce",
          description:
            "Sauté garlic, add sun-dried tomatoes, broth, and cream. Simmer until thickened.",
          time: 8,
        },
        {
          title: "Add Spinach",
          description: "Stir in spinach and parmesan until wilted and melted.",
          time: 3,
        },
        {
          title: "Combine",
          description:
            "Return chicken to pan, spoon sauce over, and simmer for 2-3 minutes.",
          time: 3,
        },
      ],
      author: {
        name: "Marco Bellini",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      isFavorite: true,
    },
    {
      id: 4,
      title: "Thai Green Curry",
      description:
        "Aromatic and spicy Thai curry with vegetables and coconut milk",
      time: "30 mins",
      difficulty: "Medium",
      rating: 4.8,
      reviews: 1567,
      servings: 4,
      calories: 380,
      protein: "24g",
      carbs: "22g",
      fats: "25g",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
      tags: ["Spicy", "Asian", "Dairy-Free"],
      category: "Main Course",
      cuisine: "Thai",
      ingredients: [
        {
          qty: "1 lb",
          name: "Chicken Thighs",
          category: "meatSeafood",
          substitutes: ["Tofu", "Shrimp"],
        },
        { qty: "1 can", name: "Coconut Milk", category: "pantry" },
        { qty: "3 tbsp", name: "Green Curry Paste", category: "pantry" },
        { qty: "1 cup", name: "Thai Basil", category: "produce" },
        { qty: "1", name: "Bell Pepper", category: "produce" },
        { qty: "1 cup", name: "Bamboo Shoots", category: "pantry" },
        { qty: "2 tbsp", name: "Fish Sauce", category: "pantry" },
        { qty: "1 tbsp", name: "Palm Sugar", category: "pantry" },
      ],
      steps: [
        {
          title: "Prep Ingredients",
          description:
            "Slice chicken into bite-sized pieces. Cut bell pepper into strips.",
          time: 5,
        },
        {
          title: "Fry Curry Paste",
          description:
            "In a wok, fry curry paste in coconut cream until fragrant.",
          time: 3,
        },
        {
          title: "Cook Chicken",
          description: "Add chicken pieces and cook until no longer pink.",
          time: 8,
        },
        {
          title: "Add Coconut Milk",
          description:
            "Pour in remaining coconut milk, bamboo shoots, and bell pepper. Simmer.",
          time: 10,
        },
        {
          title: "Season & Finish",
          description:
            "Add fish sauce, sugar, and Thai basil. Serve over jasmine rice.",
          time: 4,
        },
      ],
      author: {
        name: "Suki Patel",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
      isFavorite: false,
    },
    {
      id: 5,
      title: "Classic Beef Tacos",
      description: "Flavorful seasoned beef tacos with all the fixings",
      time: "25 mins",
      difficulty: "Easy",
      rating: 4.6,
      reviews: 1892,
      servings: 6,
      calories: 350,
      protein: "22g",
      carbs: "28g",
      fats: "18g",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
      tags: ["Quick", "Family Favorite", "Mexican"],
      category: "Main Course",
      cuisine: "Mexican",
      ingredients: [
        { qty: "1.5 lbs", name: "Ground Beef", category: "meatSeafood" },
        { qty: "12", name: "Taco Shells", category: "pantry" },
        { qty: "1 packet", name: "Taco Seasoning", category: "pantry" },
        { qty: "1 cup", name: "Shredded Cheese", category: "dairy" },
        { qty: "2 cups", name: "Shredded Lettuce", category: "produce" },
        { qty: "2", name: "Tomatoes (diced)", category: "produce" },
        { qty: "1/2 cup", name: "Sour Cream", category: "dairy" },
        { qty: "1/4 cup", name: "Cilantro", category: "produce" },
      ],
      steps: [
        {
          title: "Brown Beef",
          description:
            "Cook ground beef in a skillet over medium-high heat until browned. Drain excess fat.",
          time: 8,
        },
        {
          title: "Season",
          description:
            "Add taco seasoning and water according to package. Simmer until thickened.",
          time: 5,
        },
        {
          title: "Warm Shells",
          description: "Heat taco shells according to package directions.",
          time: 3,
        },
        {
          title: "Assemble",
          description:
            "Fill shells with beef, top with cheese, lettuce, tomatoes, sour cream, and cilantro.",
          time: 5,
        },
      ],
      author: {
        name: "Carlos Rivera",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      isFavorite: false,
    },
    {
      id: 6,
      title: "Wild Mushroom Risotto",
      description: "Creamy Italian risotto with a medley of wild mushrooms",
      time: "45 mins",
      difficulty: "Hard",
      rating: 4.8,
      reviews: 945,
      servings: 4,
      calories: 450,
      protein: "12g",
      carbs: "58g",
      fats: "18g",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop",
      tags: ["Vegetarian", "Comfort Food", "Date Night"],
      category: "Main Course",
      cuisine: "Italian",
      ingredients: [
        { qty: "1.5 cups", name: "Arborio Rice", category: "pantry" },
        { qty: "8 oz", name: "Mixed Wild Mushrooms", category: "produce" },
        { qty: "4 cups", name: "Vegetable Broth", category: "pantry" },
        { qty: "1/2 cup", name: "White Wine", category: "pantry" },
        { qty: "1/2 cup", name: "Parmesan Cheese", category: "dairy" },
        { qty: "3 tbsp", name: "Butter", category: "dairy" },
        { qty: "1", name: "Shallot (minced)", category: "produce" },
        { qty: "2 cloves", name: "Garlic", category: "produce" },
      ],
      steps: [
        {
          title: "Prep Mushrooms",
          description:
            "Clean and slice mushrooms. Sauté in butter until golden. Set aside.",
          time: 8,
        },
        {
          title: "Toast Rice",
          description:
            "Sauté shallot and garlic. Add rice and toast for 2 minutes.",
          time: 4,
        },
        {
          title: "Add Wine",
          description: "Pour in white wine and stir until absorbed.",
          time: 3,
        },
        {
          title: "Add Broth",
          description:
            "Add warm broth one ladle at a time, stirring constantly until absorbed before adding more.",
          time: 25,
        },
        {
          title: "Finish",
          description:
            "Stir in mushrooms, parmesan, and remaining butter. Season and serve immediately.",
          time: 5,
        },
      ],
      author: {
        name: "Sofia Rossi",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
      isFavorite: true,
    },
  ],

  collections: [
    {
      id: 1,
      name: "Favorites",
      icon: "favorite",
      color: "primary",
      recipeIds: [1, 3, 6],
    },
    {
      id: 2,
      name: "Quick Meals",
      icon: "timer",
      color: "amber",
      recipeIds: [2, 5],
    },
    {
      id: 3,
      name: "Healthy",
      icon: "eco",
      color: "green",
      recipeIds: [1, 2, 4],
    },
    {
      id: 4,
      name: "Date Night",
      icon: "favorite",
      color: "pink",
      recipeIds: [3, 6],
    },
  ],

  reviews: [
    {
      id: 1,
      recipeId: 1,
      user: "Eleanor P.",
      rating: 5,
      date: "2 days ago",
      comment:
        "The miso glaze is a game changer! I added a splash of lime juice at the end for some extra acidity.",
      verified: true,
      likes: 24,
      avatar: "E",
    },
    {
      id: 2,
      recipeId: 1,
      user: "Marcus J.",
      rating: 4,
      date: "5 days ago",
      comment:
        "Instructions were clear. The glaze thickens quickly so watch the heat. Perfect healthy weeknight meal.",
      verified: false,
      likes: 8,
      avatar: "M",
    },
    {
      id: 3,
      recipeId: 1,
      user: "Sarah K.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Made this for a dinner party and everyone asked for the recipe! Will definitely make again.",
      verified: true,
      likes: 32,
      avatar: "S",
    },
  ],

  user: {
    name: "Sarah",
    fullName: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    memberSince: "2023",
    savedRecipes: [1, 2, 3, 4, 5, 6],
    cookedRecipes: [1, 3, 6],
    isLoggedIn: false,
  },
};

// ============================================
// MAIN APPLICATION CLASS
// ============================================

class CookHubApp {
  constructor() {
    this.data = CookHubData;
    this.ingredients = [];
    this.shoppingList = {};
    this.currentRecipe = null;
    this.currentStep = 0;
    this.timerInterval = null;
    this.timerSeconds = 0;
    this.isTimerRunning = false;

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.detectPage();
      this.bindGlobalEvents();
    });
  }

  detectPage() {
    const path = window.location.pathname;

    if (path.includes("recipe-detail")) {
      this.initRecipeDetailPage();
    } else if (path.includes("cooking-mode")) {
      this.initCookingModePage();
    } else if (path.includes("shopping-list")) {
      this.initShoppingListPage();
    } else if (path.includes("library")) {
      this.initLibraryPage();
    } else {
      this.initHomePage();
    }
  }

  bindGlobalEvents() {
    // Auth modal
    window.openAuthModal = () => this.openAuthModal();
    window.closeAuthModal = () => this.closeAuthModal();

    // Navigation
    window.scrollToSection = (id) => this.scrollToSection(id);

    // Recipe interactions
    window.viewRecipe = (id) => this.viewRecipe(id);
    window.toggleFavorite = (id, event) => this.toggleFavorite(id, event);

    // Fridge raid
    window.handleIngredientEnter = (e) => this.handleIngredientEnter(e);
    window.addIngredient = () => this.addIngredient();
    window.removeIngredient = (i) => this.removeIngredient(i);
    window.findRecipesByIngredients = () => this.findRecipesByIngredients();

    // Search
    window.performSearch = () => this.performSearch();

    // Shopping List
    window.toggleShoppingItem = (cat, idx) => this.toggleShoppingItem(cat, idx);
    window.clearCompleted = () => this.clearCompleted();
    window.shareList = () => this.shareList();
    window.addQuickItem = () => this.addQuickItem();
    window.handleQuickAdd = (e) => this.handleQuickAdd(e);

    // Cooking Mode
    window.nextStep = () => this.nextStep();
    window.prevStep = () => this.prevStep();
    window.toggleTimer = () => this.toggleTimer();

    // Other
    window.loadMoreRecipes = () => this.loadMoreRecipes();
    window.clearFilters = () => this.clearFilters();
    window.updatePortions = (v) => this.updatePortions(v);

    // Occasion filtering
    window.filterByOccasion = (occasion, btn) =>
      this.filterByOccasion(occasion, btn);
  }

  // ============================================
  // HOME PAGE
  // ============================================

  initHomePage() {
    this.loadRecipeGrid();
    this.loadReviews();
    this.setupSearchAutocomplete();
  }

  loadRecipeGrid() {
    const grid = document.getElementById("recipe-grid");
    if (!grid) return;

    grid.innerHTML = this.data.recipes
      .map((recipe) => this.createRecipeCard(recipe))
      .join("");
  }

  createRecipeCard(recipe) {
    return `
            <div class="group bg-white rounded-3xl overflow-hidden border border-orange-50 shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all flex flex-col cursor-pointer" onclick="viewRecipe(${recipe.id})">
                <div class="relative h-64 overflow-hidden">
                    <img alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${recipe.image}">
                    <button class="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center ${recipe.isFavorite ? "text-primary" : "text-gray-300"} hover:text-primary shadow-lg hover:scale-110 transition-all" onclick="toggleFavorite(${recipe.id}, event)">
                        <span class="material-symbols-outlined ${recipe.isFavorite ? "fill-1" : ""}">favorite</span>
                    </button>
                    <div class="absolute bottom-4 left-4 flex gap-2">
                        ${recipe.tags
                          .slice(0, 2)
                          .map(
                            (tag) =>
                              `<span class="bg-amber-500 text-slate-black px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">${tag}</span>`,
                          )
                          .join("")}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-amber-500">schedule</span> ${recipe.time}</span>
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-amber-500">restaurant</span> ${recipe.difficulty}</span>
                    </div>
                    <h3 class="text-xl font-800 text-slate-black mb-2 group-hover:text-primary transition-colors leading-snug">${recipe.title}</h3>
                    <p class="text-sm text-gray-500 mb-4 line-clamp-2">${recipe.description}</p>
                    <div class="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-amber-500 fill-1 text-lg">star</span>
                            <span class="text-sm font-black">${recipe.rating}</span>
                            <span class="text-xs text-gray-400">(${recipe.reviews})</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="${recipe.author.avatar}" alt="${recipe.author.name}" class="w-6 h-6 rounded-full">
                            <span class="text-xs font-medium text-gray-500">${recipe.author.name.split(" ")[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  loadReviews() {
    const container = document.getElementById("reviews-container");
    if (!container) return;

    container.innerHTML = this.data.reviews
      .map(
        (review) => `
            <div class="bg-white p-6 rounded-3xl border border-orange-50 shadow-sm">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                            ${review.avatar}
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-black text-sm">${review.user}</h4>
                            <div class="flex items-center text-primary">
                                ${Array(review.rating).fill('<span class="material-symbols-outlined text-sm fill-1">star</span>').join("")}
                                <span class="ml-2 text-xs text-slate-400 font-bold">${review.date}</span>
                            </div>
                        </div>
                    </div>
                    ${review.verified ? '<span class="bg-orange-100 text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Verified Cook</span>' : ""}
                </div>
                <p class="text-slate-600 leading-relaxed text-sm">${review.comment}</p>
                <div class="mt-4 flex items-center gap-4">
                    <button class="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors" onclick="this.querySelector('span:last-child').textContent = parseInt(this.querySelector('span:last-child').textContent) + 1">
                        <span class="material-symbols-outlined text-lg">thumb_up</span>
                        <span>${review.likes}</span>
                    </button>
                    <button class="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-black transition-colors">
                        <span class="material-symbols-outlined text-lg">chat_bubble</span>
                        Reply
                    </button>
                </div>
            </div>
        `,
      )
      .join("");
  }

  setupSearchAutocomplete() {
    const searchInput = document.getElementById("main-search");
    if (!searchInput) return;

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.performSearch();
    });
  }

  // ============================================
  // RECIPE INTERACTIONS
  // ============================================

  viewRecipe(id) {
    // Navigate to recipe detail page with the recipe ID
    window.location.href = `recipe-detail.html?id=${id}`;
  }

  toggleFavorite(id, event) {
    if (event) {
      event.stopPropagation();
    }
    const recipe = this.data.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.loadRecipeGrid();
      this.showNotification(
        recipe.isFavorite ? "Added to favorites!" : "Removed from favorites",
        "success",
      );
    }
  }

  // ============================================
  // OCCASION FILTERING
  // ============================================

  filterByOccasion(occasion, btnElement) {
    // Update active button styling
    const allBtns = document.querySelectorAll(".occasion-btn");
    allBtns.forEach((btn) => {
      btn.classList.remove("bg-primary", "border-primary");
      btn.classList.add("bg-white", "border-orange-100");
      btn.querySelector("span:last-child").classList.remove("text-white");
      btn.querySelector("span:last-child").classList.add("text-slate-black");
    });

    if (btnElement && occasion !== "all") {
      btnElement.classList.remove("bg-white", "border-orange-100");
      btnElement.classList.add("bg-primary", "border-primary");
      btnElement
        .querySelector("span:last-child")
        .classList.remove("text-slate-black");
      btnElement.querySelector("span:last-child").classList.add("text-white");
    }

    // Filter recipes based on occasion
    let filteredRecipes = this.data.recipes;

    switch (occasion) {
      case "birthday":
        // Show comfort food and special dishes
        filteredRecipes = this.data.recipes.filter(
          (r) =>
            r.tags.some((t) =>
              ["Comfort Food", "Date Night", "Italian"].includes(t),
            ) ||
            r.difficulty === "Medium" ||
            r.difficulty === "Hard",
        );
        break;
      case "quick":
        // Show recipes under 30 mins
        filteredRecipes = this.data.recipes.filter((r) => {
          const time = parseInt(r.time);
          return time <= 30;
        });
        break;
      case "easy":
        // Show easy difficulty recipes
        filteredRecipes = this.data.recipes.filter(
          (r) => r.difficulty === "Easy",
        );
        break;
      case "date":
        // Show romantic/special dishes
        filteredRecipes = this.data.recipes.filter(
          (r) =>
            r.tags.some((t) =>
              ["Date Night", "Italian", "Comfort Food"].includes(t),
            ) || r.rating >= 4.8,
        );
        break;
      case "healthy":
        // Show healthy options
        filteredRecipes = this.data.recipes.filter(
          (r) =>
            r.tags.some((t) =>
              [
                "Healthy",
                "Vegan",
                "Gluten-Free",
                "High Protein",
                "Dairy-Free",
              ].includes(t),
            ) || parseInt(r.calories) < 450,
        );
        break;
      case "comfort":
        // Show comfort food
        filteredRecipes = this.data.recipes.filter((r) =>
          r.tags.some((t) =>
            ["Comfort Food", "Family Favorite", "Italian"].includes(t),
          ),
        );
        break;
      case "all":
      default:
        // Show all recipes
        filteredRecipes = this.data.recipes;
        break;
    }

    // Update the recipe grid
    const grid = document.getElementById("recipe-grid");
    if (grid) {
      if (filteredRecipes.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">restaurant</span>
            <p class="text-gray-500 text-lg">No recipes found for this occasion.</p>
            <button class="mt-4 text-primary font-bold hover:underline" onclick="filterByOccasion('all', null)">View all recipes</button>
          </div>
        `;
      } else {
        grid.innerHTML = filteredRecipes
          .map((recipe) => this.createRecipeCard(recipe))
          .join("");
      }
    }

    // Show notification
    const occasionNames = {
      birthday: "🎂 Birthday Feast",
      quick: "⚡ Quick Meals",
      easy: "🔋 Low Energy",
      date: "🕯️ Date Night",
      healthy: "🥗 Healthy Habit",
      comfort: "🍲 Comfort Food",
      all: "🍽️ All Recipes",
    };

    this.showNotification(
      `Showing ${occasionNames[occasion]} - ${filteredRecipes.length} recipes`,
      "success",
    );

    // Scroll to recipe grid
    this.scrollToSection("discovery");
  }

  // ============================================
  // FRIDGE RAID
  // ============================================

  handleIngredientEnter(event) {
    if (event.key === "Enter") {
      this.addIngredient();
    }
  }

  addIngredient() {
    const input = document.getElementById("ingredient-input");
    if (!input) return;

    const value = input.value.trim();
    if (value && !this.ingredients.includes(value)) {
      this.ingredients.push(value);
      input.value = "";
      this.updateIngredientsList();
    }
  }

  removeIngredient(index) {
    this.ingredients.splice(index, 1);
    this.updateIngredientsList();
  }

  updateIngredientsList() {
    const list = document.getElementById("ingredients-list");
    if (!list) return;

    if (this.ingredients.length === 0) {
      list.innerHTML =
        '<p class="text-gray-400 text-sm">Add ingredients to find matching recipes...</p>';
      return;
    }

    list.innerHTML = this.ingredients
      .map(
        (ingredient, index) => `
            <div class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-md shadow-primary/20 hover:scale-105 transition-transform">
                <span>${ingredient}</span>
                <button class="material-symbols-outlined text-sm hover:text-white/70 transition-colors" onclick="removeIngredient(${index})">close</button>
            </div>
        `,
      )
      .join("");
  }

  findRecipesByIngredients() {
    if (this.ingredients.length === 0) {
      this.showNotification("Please add at least one ingredient", "warning");
      return;
    }

    const results = this.data.recipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map((i) =>
          i.name.toLowerCase(),
        );
        const matches = this.ingredients.filter((ing) =>
          recipeIngredients.some((ri) => ri.includes(ing.toLowerCase())),
        );
        const matchPercent = Math.round(
          (matches.length / recipe.ingredients.length) * 100,
        );
        return { ...recipe, matchPercent, matchedIngredients: matches };
      })
      .filter((r) => r.matchPercent > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent);

    this.displayFridgeRaidResults(results);
  }

  displayFridgeRaidResults(results) {
    const resultsSection = document.getElementById("fridge-raid-results");
    const grid = document.getElementById("fridge-raid-grid");

    if (!resultsSection || !grid) return;

    resultsSection.classList.remove("hidden");

    if (results.length === 0) {
      grid.innerHTML =
        '<p class="text-center text-gray-500 py-12">No matching recipes found. Try adding more ingredients!</p>';
    } else {
      grid.innerHTML = results
        .map(
          (recipe) => `
                <div class="group bg-white rounded-[2rem] overflow-hidden border border-orange-50 hover:shadow-xl transition-all duration-500 cursor-pointer" onclick="viewRecipe(${recipe.id})">
                    <div class="relative h-64 overflow-hidden">
                        <img alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${recipe.image}">
                        <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full text-primary hover:scale-110 transition-all cursor-pointer shadow-md" onclick="toggleFavorite(${recipe.id}, event)">
                            <span class="material-symbols-outlined ${recipe.isFavorite ? "fill-1" : ""}">favorite</span>
                        </div>
                        <div class="absolute bottom-4 left-4">
                            <span class="bg-amber-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">${recipe.matchPercent}% Match</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="material-symbols-outlined text-amber-500 text-lg fill-1">star</span>
                            <span class="text-sm font-bold">${recipe.rating}</span>
                            <span class="text-slate-300">•</span>
                            <span class="text-slate-400 text-sm font-medium">${recipe.time}</span>
                        </div>
                        <h3 class="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors text-slate-800">${recipe.title}</h3>
                        <div class="flex flex-wrap gap-2">
                            ${recipe.tags.map((tag) => `<span class="text-[10px] bg-orange-50 text-amber-600 px-2 py-1 rounded font-bold">${tag}</span>`).join("")}
                        </div>
                    </div>
                </div>
            `,
        )
        .join("");
    }

    resultsSection.scrollIntoView({ behavior: "smooth" });
  }

  // ============================================
  // RECIPE DETAIL PAGE
  // ============================================

  initRecipeDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get("id")) || 1;
    this.currentRecipe =
      this.data.recipes.find((r) => r.id === recipeId) || this.data.recipes[0];

    this.renderRecipeDetail();
  }

  renderRecipeDetail() {
    if (!this.currentRecipe) return;

    // Update title
    document.title = `${this.currentRecipe.title} | COOKHUB`;

    // Render ingredients
    const ingredientsList = document.getElementById("ingredients-list");
    if (ingredientsList) {
      ingredientsList.innerHTML = this.currentRecipe.ingredients
        .map(
          (ing, index) => `
                <div class="group flex ${ing.substitutes ? "flex-col" : "items-center justify-between"} p-6 rounded-2xl bg-white border ${ing.substitutes ? "border-2 border-amber-200" : "border-gray-100 hover:border-amber-300"} transition-all shadow-sm">
                    <div class="flex items-center ${ing.substitutes ? "justify-between mb-4" : "gap-5"}">
                        <div class="flex items-center gap-4">
                            <input class="w-6 h-6 rounded-md border-gray-300 text-amber-500 focus:ring-amber-500/20" type="checkbox" id="ing-${index}">
                            <label for="ing-${index}" class="text-gray-900 font-medium text-lg cursor-pointer"><span class="text-amber-600 font-bold">${ing.qty}</span> ${ing.name}</label>
                        </div>
                        ${
                          ing.substitutes
                            ? `
                            <div class="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
                                <span class="material-symbols-outlined text-sm">swap_horiz</span>
                                <span class="text-[10px] font-extrabold uppercase tracking-widest">Substitution</span>
                            </div>
                        `
                            : ""
                        }
                    </div>
                    ${
                      ing.substitutes
                        ? `
                        <div class="ml-10 flex flex-wrap gap-3">
                            ${ing.substitutes
                              .map(
                                (sub) => `
                                <button class="flex items-center gap-2 text-xs py-2.5 px-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold hover:bg-amber-100 transition-all">
                                    <span class="material-symbols-outlined text-sm">sync</span>
                                    ${sub}
                                </button>
                            `,
                              )
                              .join("")}
                        </div>
                    `
                        : ""
                    }
                </div>
            `,
        )
        .join("");
    }

    // Render steps
    const stepsContainer = document.getElementById("cooking-steps");
    if (stepsContainer) {
      const stepsHtml = this.currentRecipe.steps
        .map(
          (step, index) => `
                <div class="relative pl-20 ${index > 0 ? "opacity-60 hover:opacity-100 transition-all duration-300" : ""}">
                    <div class="absolute left-0 top-0 w-14 h-14 rounded-2xl ${index === 0 ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-gray-100 text-gray-600 border border-gray-200"} flex items-center justify-center font-black text-xl ring-8 ring-white">
                        ${String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 class="font-extrabold text-xl mb-4 text-gray-900">${step.title}</h3>
                    <p class="text-gray-500 leading-relaxed text-lg">${step.description}</p>
                    <div class="mt-6 flex gap-4">
                        <div class="flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-600 rounded-xl text-xs font-extrabold border border-amber-100">
                            <span class="material-symbols-outlined text-sm">schedule</span>
                            ${String(step.time).padStart(2, "0")} MINS
                        </div>
                    </div>
                </div>
            `,
        )
        .join("");
      stepsContainer.innerHTML += stepsHtml;
    }
  }

  updatePortions(value) {
    const display = document.getElementById("portion-display");
    if (display) {
      display.textContent = String(value).padStart(2, "0") + " Portions";
    }
  }

  // ============================================
  // COOKING MODE
  // ============================================

  initCookingModePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get("id")) || 1;
    this.currentRecipe =
      this.data.recipes.find((r) => r.id === recipeId) || this.data.recipes[0];
    this.currentStep = 0;

    this.updateCookingStep();
    this.bindCookingModeEvents();
  }

  updateCookingStep() {
    if (!this.currentRecipe) return;

    const step = this.currentRecipe.steps[this.currentStep];
    const totalSteps = this.currentRecipe.steps.length;

    // Update UI elements
    const stepNum = document.getElementById("stepNum");
    const progressBar = document.getElementById("progressBar");
    const stepBadge = document.getElementById("stepBadge");
    const stepTitle = document.getElementById("stepTitle");
    const stepDesc = document.getElementById("stepDesc");

    if (stepNum) stepNum.textContent = this.currentStep + 1;
    if (progressBar)
      progressBar.style.width = `${((this.currentStep + 1) / totalSteps) * 100}%`;
    if (stepBadge) stepBadge.textContent = this.currentStep + 1;
    if (stepTitle)
      stepTitle.innerHTML = step.title.replace(
        /(\w+)$/,
        '<span class="text-primary">$1</span>',
      );
    if (stepDesc) stepDesc.textContent = step.description;

    // Reset timer
    this.timerSeconds = step.time * 60;
    this.isTimerRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.updateTimerDisplay();

    const timerIcon = document.getElementById("timerIcon");
    const timerText = document.getElementById("timerText");
    if (timerIcon) timerIcon.textContent = "play_arrow";
    if (timerText) timerText.textContent = "Start";

    // Update navigation buttons
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn) prevBtn.disabled = this.currentStep === 0;
    if (nextBtn) {
      if (this.currentStep === totalSteps - 1) {
        nextBtn.innerHTML =
          'Finish<span class="material-symbols-outlined">check</span>';
      } else {
        nextBtn.innerHTML =
          'Next<span class="material-symbols-outlined">arrow_forward</span>';
      }
    }
  }

  nextStep() {
    if (!this.currentRecipe) return;

    if (this.currentStep < this.currentRecipe.steps.length - 1) {
      this.currentStep++;
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.updateCookingStep();
    } else {
      this.showNotification("Recipe completed! Great job! 🎉", "success");
      setTimeout(() => {
        window.location.href = `recipe-detail.html?id=${this.currentRecipe.id}`;
      }, 2000);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.updateCookingStep();
    }
  }

  toggleTimer() {
    const timerIcon = document.getElementById("timerIcon");
    const timerText = document.getElementById("timerText");

    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      if (timerIcon) timerIcon.textContent = "play_arrow";
      if (timerText) timerText.textContent = "Resume";
    } else {
      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
          this.updateTimerDisplay();
        } else {
          clearInterval(this.timerInterval);
          this.isTimerRunning = false;
          this.showNotification(
            "Timer complete! Ready for next step.",
            "success",
          );
          if (timerIcon) timerIcon.textContent = "alarm";
          if (timerText) timerText.textContent = "Done!";
        }
      }, 1000);
      if (timerIcon) timerIcon.textContent = "pause";
      if (timerText) timerText.textContent = "Pause";
    }
    this.isTimerRunning = !this.isTimerRunning;
  }

  updateTimerDisplay() {
    const display = document.getElementById("timerDisplay");
    if (display) {
      const minutes = Math.floor(this.timerSeconds / 60);
      const seconds = this.timerSeconds % 60;
      display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }

  bindCookingModeEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        this.nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prevStep();
      } else if (e.key === "t" || e.key === "T") {
        this.toggleTimer();
      }
    });
  }

  // ============================================
  // SHOPPING LIST
  // ============================================

  initShoppingListPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get("id")) || 1;
    this.currentRecipe =
      this.data.recipes.find((r) => r.id === recipeId) || this.data.recipes[0];

    this.generateShoppingList();
    this.renderShoppingList();
  }

  generateShoppingList() {
    if (!this.currentRecipe) return;

    this.shoppingList = {
      produce: [],
      meatSeafood: [],
      pantry: [],
      dairy: [],
    };

    this.currentRecipe.ingredients.forEach((ing) => {
      const category = ing.category || "pantry";
      if (this.shoppingList[category]) {
        this.shoppingList[category].push({
          name: ing.name,
          qty: ing.qty,
          checked: false,
        });
      }
    });
  }

  renderShoppingList() {
    const container = document.getElementById("shopping-list");
    if (!container) return;

    const categoryIcons = {
      produce: "nutrition",
      meatSeafood: "set_meal",
      pantry: "inventory_2",
      dairy: "egg_alt",
    };

    const categoryNames = {
      produce: "Produce",
      meatSeafood: "Meat & Seafood",
      pantry: "Pantry",
      dairy: "Dairy",
    };

    container.innerHTML = Object.entries(this.shoppingList)
      .filter(([_, items]) => items.length > 0)
      .map(
        ([category, items]) => `
                <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-orange-100 pb-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                            <span class="material-symbols-outlined fill-1 text-2xl">${categoryIcons[category]}</span>
                        </div>
                        <h3 class="text-sm font-extrabold uppercase tracking-wider text-amber-600">${categoryNames[category]}</h3>
                    </div>
                    <div class="grid gap-3">
                        ${items
                          .map(
                            (item, index) => `
                            <label class="group flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer">
                                <div class="flex items-center gap-5">
                                    <input class="rounded-md border-slate-300 text-primary focus:ring-primary w-6 h-6 cursor-pointer" type="checkbox" ${item.checked ? "checked" : ""} onchange="toggleShoppingItem('${category}', ${index})">
                                    <span class="text-slate-700 font-bold text-lg ${item.checked ? "line-through text-slate-400" : ""}">${item.name}</span>
                                </div>
                                <span class="bg-orange-50 px-3 py-1 rounded-lg text-xs font-extrabold text-amber-600 uppercase tracking-tighter">${item.qty}</span>
                            </label>
                        `,
                          )
                          .join("")}
                    </div>
                </section>
            `,
      )
      .join("");
  }

  toggleShoppingItem(category, index) {
    if (this.shoppingList[category] && this.shoppingList[category][index]) {
      this.shoppingList[category][index].checked =
        !this.shoppingList[category][index].checked;
      this.renderShoppingList();
    }
  }

  clearCompleted() {
    Object.keys(this.shoppingList).forEach((category) => {
      this.shoppingList[category] = this.shoppingList[category].filter(
        (item) => !item.checked,
      );
    });
    this.renderShoppingList();
    this.showNotification("Completed items cleared!", "success");
  }

  shareList() {
    const categoryNames = {
      produce: "Produce",
      meatSeafood: "Meat & Seafood",
      pantry: "Pantry",
      dairy: "Dairy",
    };

    const listText =
      `🛒 COOKHUB Shopping List\n${this.currentRecipe ? `📍 ${this.currentRecipe.title}\n` : ""}\n` +
      Object.entries(this.shoppingList)
        .filter(([_, items]) => items.length > 0)
        .map(([category, items]) => {
          return `${categoryNames[category]}:\n${items.map((item) => `  ${item.checked ? "✓" : "○"} ${item.qty} ${item.name}`).join("\n")}`;
        })
        .join("\n\n");

    if (navigator.share) {
      navigator.share({
        title: "COOKHUB Shopping List",
        text: listText,
      });
    } else {
      navigator.clipboard.writeText(listText);
      this.showNotification("Shopping list copied to clipboard!", "success");
    }
  }

  handleQuickAdd(event) {
    if (event.key === "Enter") {
      this.addQuickItem();
    }
  }

  addQuickItem() {
    const input = document.getElementById("quick-add-input");
    if (!input) return;

    const value = input.value.trim();
    if (value) {
      const parts = value.split(",");
      const name = parts[0].trim();
      const qty = parts[1] ? parts[1].trim() : "1 unit";
      this.shoppingList.pantry.push({ name, qty, checked: false });
      input.value = "";
      this.renderShoppingList();
      this.showNotification(`Added "${name}" to list`, "success");
    }
  }

  // ============================================
  // LIBRARY PAGE
  // ============================================

  initLibraryPage() {
    this.renderSavedRecipes();
    this.renderCollections();
  }

  renderSavedRecipes() {
    const container = document.getElementById("savedRecipes");
    if (!container) return;

    const savedRecipes = this.data.recipes.filter((r) =>
      this.data.user.savedRecipes.includes(r.id),
    );

    container.innerHTML = savedRecipes
      .map(
        (recipe) => `
            <a href="recipe-detail.html?id=${recipe.id}" class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div class="relative h-48 overflow-hidden">
                    <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <button class="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-primary" onclick="event.preventDefault(); toggleFavorite(${recipe.id}, event)">
                        <span class="material-symbols-outlined ${recipe.isFavorite ? "fill-1" : ""}">favorite</span>
                    </button>
                </div>
                <div class="p-5">
                    <div class="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-amber-500">schedule</span>${recipe.time}</span>
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-amber-500 fill-1">star</span>${recipe.rating}</span>
                    </div>
                    <h3 class="font-bold text-gray-900 group-hover:text-primary transition-colors">${recipe.title}</h3>
                </div>
            </a>
        `,
      )
      .join("");
  }

  renderCollections() {
    // Collections are rendered in the HTML
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  viewRecipe(id) {
    window.location.href = `recipe-detail.html?id=${id}`;
  }

  toggleFavorite(id, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const recipe = this.data.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;

      // Update UI
      const btn = event?.currentTarget;
      if (btn) {
        const icon = btn.querySelector(".material-symbols-outlined");
        if (icon) {
          icon.classList.toggle("fill-1");
        }
        btn.classList.toggle("text-primary");
        btn.classList.toggle("text-gray-300");
      }

      this.showNotification(
        recipe.isFavorite ? "Added to favorites!" : "Removed from favorites",
        "success",
      );
    }
  }

  performSearch() {
    const searchInput = document.getElementById("main-search");
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const results = this.data.recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        recipe.cuisine.toLowerCase().includes(query),
    );

    const grid = document.getElementById("recipe-grid");
    if (grid) {
      if (results.length === 0) {
        grid.innerHTML =
          '<p class="col-span-full text-center text-gray-500 py-12">No recipes found matching your search.</p>';
      } else {
        grid.innerHTML = results
          .map((recipe) => this.createRecipeCard(recipe))
          .join("");
      }
    }

    this.scrollToSection("discovery");
  }

  loadMoreRecipes() {
    // Additional recipes from all cuisines
    const additionalRecipes = [
      // Chinese
      {
        id: 7,
        title: "Honey Garlic Chicken Stir-Fry",
        description: "Quick stir-fry with honey garlic sauce",
        time: "20 mins",
        difficulty: "Easy",
        rating: 4.7,
        reviews: 892,
        servings: 4,
        calories: 380,
        protein: "28g",
        carbs: "32g",
        fats: "14g",
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop",
        tags: ["Quick", "Asian"],
        category: "Main Course",
        cuisine: "Chinese",
        ingredients: [],
        steps: [],
        author: {
          name: "Chef Lee",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
        isFavorite: false,
      },
      // Japanese
      {
        id: 8,
        title: "Tonkotsu Ramen",
        description: "Rich pork broth ramen with chashu and soft-boiled egg",
        time: "45 mins",
        difficulty: "Medium",
        rating: 4.9,
        reviews: 1876,
        servings: 2,
        calories: 650,
        protein: "38g",
        carbs: "72g",
        fats: "28g",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
        tags: ["Japanese", "Soup"],
        category: "Main Course",
        cuisine: "Japanese",
        ingredients: [],
        steps: [],
        author: {
          name: "Kenji Yamamoto",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        isFavorite: false,
      },
      // Mexican
      {
        id: 9,
        title: "Street Tacos Al Pastor",
        description: "Authentic tacos with marinated pork and pineapple",
        time: "35 mins",
        difficulty: "Medium",
        rating: 4.8,
        reviews: 1654,
        servings: 4,
        calories: 420,
        protein: "28g",
        carbs: "38g",
        fats: "18g",
        image:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop",
        tags: ["Mexican", "Street Food"],
        category: "Main Course",
        cuisine: "Mexican",
        ingredients: [],
        steps: [],
        author: {
          name: "Carlos Mendez",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
        isFavorite: false,
      },
      // Thai
      {
        id: 10,
        title: "Pad Thai",
        description: "Classic stir-fried rice noodles with shrimp and peanuts",
        time: "25 mins",
        difficulty: "Medium",
        rating: 4.7,
        reviews: 2341,
        servings: 2,
        calories: 480,
        protein: "22g",
        carbs: "58g",
        fats: "18g",
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
        tags: ["Thai", "Noodles"],
        category: "Main Course",
        cuisine: "Thai",
        ingredients: [],
        steps: [],
        author: {
          name: "Siri Chaiwan",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        },
        isFavorite: false,
      },
      // Indian
      {
        id: 11,
        title: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken",
        time: "40 mins",
        difficulty: "Medium",
        rating: 4.9,
        reviews: 2103,
        servings: 4,
        calories: 520,
        protein: "35g",
        carbs: "18g",
        fats: "36g",
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&h=600&fit=crop",
        tags: ["Indian", "Curry"],
        category: "Main Course",
        cuisine: "Indian",
        ingredients: [],
        steps: [],
        author: {
          name: "Priya Sharma",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        },
        isFavorite: false,
      },
      // French
      {
        id: 12,
        title: "Coq au Vin",
        description: "Braised chicken in red wine with mushrooms",
        time: "90 mins",
        difficulty: "Hard",
        rating: 4.8,
        reviews: 876,
        servings: 4,
        calories: 580,
        protein: "42g",
        carbs: "22g",
        fats: "32g",
        image:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
        tags: ["French", "Classic"],
        category: "Main Course",
        cuisine: "French",
        ingredients: [],
        steps: [],
        author: {
          name: "Pierre Laurent",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        isFavorite: false,
      },
      // Korean
      {
        id: 13,
        title: "Bibimbap",
        description: "Mixed rice bowl with vegetables, beef, and gochujang",
        time: "30 mins",
        difficulty: "Medium",
        rating: 4.7,
        reviews: 1432,
        servings: 2,
        calories: 520,
        protein: "28g",
        carbs: "68g",
        fats: "16g",
        image:
          "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=600&fit=crop",
        tags: ["Korean", "Healthy"],
        category: "Main Course",
        cuisine: "Korean",
        ingredients: [],
        steps: [],
        author: {
          name: "Ji-Young Kim",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        },
        isFavorite: false,
      },
      // Greek
      {
        id: 14,
        title: "Lamb Souvlaki",
        description: "Grilled lamb skewers with tzatziki and pita",
        time: "35 mins",
        difficulty: "Easy",
        rating: 4.6,
        reviews: 987,
        servings: 4,
        calories: 450,
        protein: "32g",
        carbs: "28g",
        fats: "24g",
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop",
        tags: ["Greek", "Mediterranean"],
        category: "Main Course",
        cuisine: "Greek",
        ingredients: [],
        steps: [],
        author: {
          name: "Nikos Papadopoulos",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
        isFavorite: false,
      },
      // Vietnamese
      {
        id: 15,
        title: "Pho Bo",
        description: "Vietnamese beef noodle soup with fresh herbs",
        time: "50 mins",
        difficulty: "Medium",
        rating: 4.9,
        reviews: 2156,
        servings: 4,
        calories: 420,
        protein: "28g",
        carbs: "52g",
        fats: "12g",
        image:
          "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop",
        tags: ["Vietnamese", "Soup"],
        category: "Soup",
        cuisine: "Vietnamese",
        ingredients: [],
        steps: [],
        author: {
          name: "Mai Nguyen",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        },
        isFavorite: false,
      },
      // Spanish
      {
        id: 16,
        title: "Paella Valenciana",
        description: "Saffron rice with seafood and chorizo",
        time: "55 mins",
        difficulty: "Hard",
        rating: 4.8,
        reviews: 1234,
        servings: 6,
        calories: 580,
        protein: "36g",
        carbs: "62g",
        fats: "22g",
        image:
          "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=600&fit=crop",
        tags: ["Spanish", "Seafood"],
        category: "Main Course",
        cuisine: "Spanish",
        ingredients: [],
        steps: [],
        author: {
          name: "Diego Martinez",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        isFavorite: false,
      },
      // Lebanese
      {
        id: 17,
        title: "Chicken Shawarma",
        description: "Spiced chicken with hummus and tabbouleh",
        time: "40 mins",
        difficulty: "Medium",
        rating: 4.7,
        reviews: 1567,
        servings: 4,
        calories: 490,
        protein: "34g",
        carbs: "42g",
        fats: "22g",
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop",
        tags: ["Lebanese", "Middle Eastern"],
        category: "Main Course",
        cuisine: "Lebanese",
        ingredients: [],
        steps: [],
        author: {
          name: "Omar Hassan",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
        isFavorite: false,
      },
      // Ethiopian
      {
        id: 18,
        title: "Doro Wat",
        description: "Ethiopian spiced chicken stew with berbere",
        time: "60 mins",
        difficulty: "Medium",
        rating: 4.6,
        reviews: 654,
        servings: 4,
        calories: 520,
        protein: "38g",
        carbs: "32g",
        fats: "28g",
        image:
          "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop",
        tags: ["Ethiopian", "Spicy"],
        category: "Main Course",
        cuisine: "Ethiopian",
        ingredients: [],
        steps: [],
        author: {
          name: "Ayana Bekele",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        },
        isFavorite: false,
      },
      // Brazilian
      {
        id: 19,
        title: "Feijoada",
        description: "Black bean stew with pork and beef",
        time: "120 mins",
        difficulty: "Hard",
        rating: 4.8,
        reviews: 743,
        servings: 8,
        calories: 680,
        protein: "42g",
        carbs: "48g",
        fats: "36g",
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop",
        tags: ["Brazilian", "Comfort Food"],
        category: "Main Course",
        cuisine: "Brazilian",
        ingredients: [],
        steps: [],
        author: {
          name: "Luciana Silva",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        },
        isFavorite: false,
      },
      // American
      {
        id: 20,
        title: "Classic Smash Burger",
        description: "Crispy smashed patty with caramelized onions",
        time: "20 mins",
        difficulty: "Easy",
        rating: 4.7,
        reviews: 2890,
        servings: 2,
        calories: 720,
        protein: "38g",
        carbs: "42g",
        fats: "48g",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
        tags: ["American", "Quick"],
        category: "Main Course",
        cuisine: "American",
        ingredients: [],
        steps: [],
        author: {
          name: "Jake Thompson",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        isFavorite: false,
      },
      // Moroccan
      {
        id: 21,
        title: "Lamb Tagine",
        description: "Slow-cooked lamb with apricots and almonds",
        time: "90 mins",
        difficulty: "Medium",
        rating: 4.8,
        reviews: 876,
        servings: 4,
        calories: 580,
        protein: "36g",
        carbs: "38g",
        fats: "32g",
        image:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=600&fit=crop",
        tags: ["Moroccan", "Slow Cook"],
        category: "Main Course",
        cuisine: "Moroccan",
        ingredients: [],
        steps: [],
        author: {
          name: "Fatima Benali",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        },
        isFavorite: false,
      },
      // Turkish
      {
        id: 22,
        title: "Iskender Kebab",
        description: "Turkish doner over bread with tomato sauce",
        time: "45 mins",
        difficulty: "Medium",
        rating: 4.7,
        reviews: 1123,
        servings: 2,
        calories: 620,
        protein: "42g",
        carbs: "48g",
        fats: "32g",
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop",
        tags: ["Turkish", "Grilled"],
        category: "Main Course",
        cuisine: "Turkish",
        ingredients: [],
        steps: [],
        author: {
          name: "Emre Yilmaz",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
        isFavorite: false,
      },
      // Peruvian
      {
        id: 23,
        title: "Ceviche",
        description: "Citrus-marinated fish with corn and sweet potato",
        time: "25 mins",
        difficulty: "Easy",
        rating: 4.8,
        reviews: 1456,
        servings: 4,
        calories: 280,
        protein: "28g",
        carbs: "22g",
        fats: "8g",
        image:
          "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&h=600&fit=crop",
        tags: ["Peruvian", "Seafood"],
        category: "Appetizer",
        cuisine: "Peruvian",
        ingredients: [],
        steps: [],
        author: {
          name: "Maria Gonzales",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        },
        isFavorite: false,
      },
      // Italian
      {
        id: 24,
        title: "Osso Buco",
        description: "Braised veal shanks in white wine and tomatoes",
        time: "150 mins",
        difficulty: "Hard",
        rating: 4.9,
        reviews: 567,
        servings: 4,
        calories: 620,
        protein: "48g",
        carbs: "18g",
        fats: "38g",
        image:
          "https://images.unsplash.com/photo-1544025162-d76978e8e2c6?w=800&h=600&fit=crop",
        tags: ["Italian", "Slow Cook"],
        category: "Main Course",
        cuisine: "Italian",
        ingredients: [],
        steps: [],
        author: {
          name: "Marco Rossi",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        isFavorite: false,
      },
    ];

    // Check which recipes haven't been added yet
    const existingIds = this.data.recipes.map((r) => r.id);
    const newRecipes = additionalRecipes.filter(
      (r) => !existingIds.includes(r.id),
    );

    if (newRecipes.length === 0) {
      this.showNotification("You've explored all cuisines!", "info");
      return;
    }

    // Add new recipes to the data store
    this.data.recipes.push(...newRecipes);

    // Render the new recipes and append to grid
    const grid = document.getElementById("recipe-grid");
    if (grid) {
      const newCardsHtml = newRecipes
        .map((recipe) => this.createRecipeCard(recipe))
        .join("");
      grid.insertAdjacentHTML("beforeend", newCardsHtml);
    }

    // Get unique cuisines from new recipes
    const cuisines = [...new Set(newRecipes.map((r) => r.cuisine))];
    this.showNotification(
      `${newRecipes.length} recipes from ${cuisines.length} cuisines loaded!`,
      "success",
    );

    // Scroll to see the new recipes
    setTimeout(() => {
      const lastCard = grid?.lastElementChild;
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  clearFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => (cb.checked = false));
    this.loadRecipeGrid();
    this.showNotification("Filters cleared", "info");
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  openAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.add("active");
    // Reset to sign-in form when opening modal
    this.showSignInForm();
  }

  closeAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.remove("active");
  }

  showNotification(message, type = "info") {
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-amber-500",
      info: "bg-blue-500",
    };

    const notification = document.createElement("div");
    notification.className = `fixed bottom-6 right-6 ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl z-[9999] animate-bounce font-bold flex items-center gap-3`;
    notification.innerHTML = `
            <span class="material-symbols-outlined">${type === "success" ? "check_circle" : type === "error" ? "error" : type === "warning" ? "warning" : "info"}</span>
            ${message}
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(20px)";
      notification.style.transition = "all 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ============================================
  // AUTHENTICATION FUNCTIONS
  // ============================================

  showSignInForm() {
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");
    const successMsg = document.getElementById("signup-success");

    if (signinForm) signinForm.classList.remove("hidden");
    if (signupForm) signupForm.classList.add("hidden");
    if (successMsg) successMsg.classList.add("hidden");
  }

  showSignUpForm() {
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");
    const successMsg = document.getElementById("signup-success");

    if (signinForm) signinForm.classList.add("hidden");
    if (signupForm) signupForm.classList.remove("hidden");
    if (successMsg) successMsg.classList.add("hidden");
  }

  handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    if (!email || !password) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("cookhub_users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      // Login successful
      localStorage.setItem("cookhub_current_user", JSON.stringify(user));
      this.data.user.isLoggedIn = true;
      this.data.user.name = user.name;
      this.data.user.email = user.email;

      this.closeAuthModal();
      this.showNotification(`Welcome back, ${user.name}!`, "success");
      this.updateUIForLoggedInUser(user);
    } else {
      this.showNotification("Invalid email or password", "error");
    }
  }

  handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password",
    ).value;
    const terms = document.getElementById("terms").checked;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      this.showNotification("Passwords do not match", "error");
      return;
    }

    if (password.length < 6) {
      this.showNotification("Password must be at least 6 characters", "error");
      return;
    }

    if (!terms) {
      this.showNotification("Please accept the Terms of Service", "error");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("cookhub_users") || "[]");
    if (users.find((u) => u.email === email)) {
      this.showNotification(
        "An account with this email already exists",
        "error",
      );
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
      savedRecipes: [],
      cookedRecipes: [],
    };

    users.push(newUser);
    localStorage.setItem("cookhub_users", JSON.stringify(users));
    localStorage.setItem("cookhub_current_user", JSON.stringify(newUser));

    // Show success message
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");
    const successMsg = document.getElementById("signup-success");

    if (signinForm) signinForm.classList.add("hidden");
    if (signupForm) signupForm.classList.add("hidden");
    if (successMsg) successMsg.classList.remove("hidden");

    this.data.user.isLoggedIn = true;
    this.data.user.name = name;
    this.data.user.email = email;
  }

  updateUIForLoggedInUser(user) {
    // Update sign in button to show user name
    const signInBtn = document.querySelector(
      'button[onclick="openAuthModal()"]',
    );
    if (signInBtn) {
      signInBtn.innerHTML = `
        <span class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">${user.name.charAt(0).toUpperCase()}</span>
          ${user.name.split(" ")[0]}
        </span>
      `;
      signInBtn.onclick = () => this.showUserMenu();
    }
  }

  showUserMenu() {
    this.showNotification("User profile coming soon!", "info");
  }

  logout() {
    localStorage.removeItem("cookhub_current_user");
    this.data.user.isLoggedIn = false;
    location.reload();
  }
}

// ============================================
// GLOBAL AUTHENTICATION FUNCTIONS
// ============================================

function showSignInForm() {
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const successMsg = document.getElementById("signup-success");

  if (signinForm) signinForm.classList.remove("hidden");
  if (signupForm) signupForm.classList.add("hidden");
  if (successMsg) successMsg.classList.add("hidden");
}

function showSignUpForm() {
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const successMsg = document.getElementById("signup-success");

  if (signinForm) signinForm.classList.add("hidden");
  if (signupForm) signupForm.classList.remove("hidden");
  if (successMsg) successMsg.classList.add("hidden");
}

function handleSignIn(event) {
  event.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  if (!email || !password) {
    app.showNotification("Please fill in all fields", "error");
    return;
  }

  // Check if user exists in localStorage
  const users = JSON.parse(localStorage.getItem("cookhub_users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Login successful
    localStorage.setItem("cookhub_current_user", JSON.stringify(user));
    CookHubData.user.isLoggedIn = true;
    CookHubData.user.name = user.name;
    CookHubData.user.email = user.email;

    closeAuthModal();
    app.showNotification(`Welcome back, ${user.name}!`, "success");

    // Update UI
    setTimeout(() => location.reload(), 1500);
  } else {
    app.showNotification("Invalid email or password", "error");
  }
}

function handleSignUp(event) {
  event.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password",
  ).value;
  const terms = document.getElementById("terms").checked;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    app.showNotification("Please fill in all fields", "error");
    return;
  }

  if (password !== confirmPassword) {
    app.showNotification("Passwords do not match", "error");
    return;
  }

  if (password.length < 6) {
    app.showNotification("Password must be at least 6 characters", "error");
    return;
  }

  if (!terms) {
    app.showNotification("Please accept the Terms of Service", "error");
    return;
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem("cookhub_users") || "[]");
  if (users.find((u) => u.email === email)) {
    app.showNotification("An account with this email already exists", "error");
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
    savedRecipes: [],
    cookedRecipes: [],
  };

  users.push(newUser);
  localStorage.setItem("cookhub_users", JSON.stringify(users));
  localStorage.setItem("cookhub_current_user", JSON.stringify(newUser));

  // Show success message
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const successMsg = document.getElementById("signup-success");

  if (signinForm) signinForm.classList.add("hidden");
  if (signupForm) signupForm.classList.add("hidden");
  if (successMsg) successMsg.classList.remove("hidden");

  CookHubData.user.isLoggedIn = true;
  CookHubData.user.name = name;
  CookHubData.user.email = email;
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

const app = new CookHubApp();

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("cookhub_current_user");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    CookHubData.user.isLoggedIn = true;
    CookHubData.user.name = user.name;
    CookHubData.user.email = user.email;

    // Update sign in button
    const signInBtn = document.querySelector(
      'button[onclick="openAuthModal()"]',
    );
    if (signInBtn) {
      signInBtn.innerHTML = `
        <span class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">${user.name.charAt(0).toUpperCase()}</span>
          ${user.name.split(" ")[0]}
        </span>
      `;
    }
  }
});

// Export for use in other modules
window.CookHubApp = CookHubApp;
window.CookHubData = CookHubData;
window.showSignInForm = showSignInForm;
window.showSignUpForm = showSignUpForm;
window.handleSignIn = handleSignIn;
window.handleSignUp = handleSignUp;

// Global function bindings for HTML onclick handlers
window.loadMoreRecipes = () => app.loadMoreRecipes();
window.performSearch = () => app.performSearch();
window.openAuthModal = () => app.openAuthModal();
window.closeAuthModal = () => app.closeAuthModal();
window.scrollToSection = (id) => app.scrollToSection(id);
window.viewRecipe = (id) => app.viewRecipe(id);
window.toggleFavorite = (id, event) => app.toggleFavorite(id, event);
window.showNotifications = () =>
  app.showNotification("No new notifications", "info");
window.filterByOccasion = (occasion, btn) =>
  app.filterByOccasion(occasion, btn);
window.clearFilters = () => app.clearFilters();

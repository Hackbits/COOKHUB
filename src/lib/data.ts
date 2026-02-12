/**
 * COOKHUB - Static Data Store
 * This will be replaced by MongoDB Atlas in Phase 3
 */

import { CookHubDataType } from "./types";

export const CookHubData: CookHubDataType = {
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
    {
      id: 7,
      title: "Korean Bibimbap",
      description:
        "Colorful Korean rice bowl with seasoned vegetables and gochujang",
      time: "40 mins",
      difficulty: "Medium",
      rating: 4.7,
      reviews: 1123,
      servings: 2,
      calories: 510,
      protein: "28g",
      carbs: "62g",
      fats: "16g",
      image:
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=600&fit=crop",
      tags: ["Asian", "Healthy", "Colorful"],
      category: "Main Course",
      cuisine: "Korean",
      ingredients: [
        { qty: "2 cups", name: "Steamed Rice", category: "pantry" },
        {
          qty: "1/2 lb",
          name: "Ground Beef",
          category: "meatSeafood",
          substitutes: ["Tofu"],
        },
        { qty: "2", name: "Eggs", category: "dairy" },
        { qty: "1 cup", name: "Spinach", category: "produce" },
        { qty: "1", name: "Carrot (julienned)", category: "produce" },
        { qty: "1 cup", name: "Bean Sprouts", category: "produce" },
        { qty: "3 tbsp", name: "Gochujang", category: "pantry" },
        { qty: "2 tbsp", name: "Sesame Oil", category: "pantry" },
      ],
      steps: [
        {
          title: "Cook Beef",
          description:
            "Season beef with soy sauce, garlic, and sesame oil. Cook until browned.",
          time: 8,
        },
        {
          title: "Prep Vegetables",
          description:
            "Blanch spinach and bean sprouts. Sauté carrots until tender.",
          time: 12,
        },
        {
          title: "Fry Eggs",
          description: "Fry eggs sunny-side up in sesame oil.",
          time: 3,
        },
        {
          title: "Assemble",
          description:
            "Arrange rice in bowls, top with vegetables, beef, and egg. Serve with gochujang.",
          time: 5,
        },
      ],
      author: {
        name: "Ji-Young Kim",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      },
      isFavorite: false,
    },
    {
      id: 8,
      title: "Lemon Herb Grilled Chicken",
      description: "Juicy grilled chicken marinated in fresh herbs and citrus",
      time: "35 mins",
      difficulty: "Easy",
      rating: 4.5,
      reviews: 2100,
      servings: 4,
      calories: 320,
      protein: "38g",
      carbs: "4g",
      fats: "16g",
      image:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&h=600&fit=crop",
      tags: ["High Protein", "Low Carb", "Healthy"],
      category: "Main Course",
      cuisine: "American",
      ingredients: [
        { qty: "4", name: "Chicken Breasts", category: "meatSeafood" },
        { qty: "3", name: "Lemons", category: "produce" },
        { qty: "1/4 cup", name: "Olive Oil", category: "pantry" },
        { qty: "4 cloves", name: "Garlic (minced)", category: "produce" },
        { qty: "2 tbsp", name: "Fresh Rosemary", category: "produce" },
        { qty: "2 tbsp", name: "Fresh Thyme", category: "produce" },
        { qty: "1 tsp", name: "Red Pepper Flakes", category: "pantry" },
        { qty: "to taste", name: "Salt & Pepper", category: "pantry" },
      ],
      steps: [
        {
          title: "Make Marinade",
          description:
            "Combine lemon juice, zest, olive oil, garlic, herbs, and seasonings.",
          time: 5,
        },
        {
          title: "Marinate Chicken",
          description:
            "Coat chicken in marinade. Let sit for at least 15 minutes.",
          time: 15,
        },
        {
          title: "Grill",
          description:
            "Grill over medium-high heat for 6-7 minutes per side until cooked through.",
          time: 14,
        },
        {
          title: "Rest & Serve",
          description:
            "Let rest 5 minutes, then slice and serve with grilled lemon halves.",
          time: 5,
        },
      ],
      author: {
        name: "James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      isFavorite: false,
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

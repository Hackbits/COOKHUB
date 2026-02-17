/**
 * COOKHUB - Firestore Seed Script
 * Migrates the hardcoded data from data.ts into Cloud Firestore.
 *
 * Prerequisites:
 *   1. Place your Firebase service account JSON at ./service-account.json
 *      (download from Firebase Console → Project Settings → Service Accounts)
 *   2. Run: npx tsx scripts/seed-firestore.ts
 */

import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as path from "path";
import * as fs from "fs";

// ---------- 1. Initialize Admin SDK ----------

const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    "❌  Missing service-account.json!\n" +
      "    Download it from Firebase Console → Project Settings → Service Accounts\n" +
      "    and place it at the project root as service-account.json",
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8"),
) as ServiceAccount;

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app, "default");

// ---------- 2. Source data (copied inline to avoid import path issues) ----------

// We import the raw data object from the existing data.ts.
// Since data.ts uses @/ aliases, we read it as a relative import.

async function seed() {
  console.log("🌱  Seeding Firestore...\n");

  // --- Recipes ---
  const recipes = [
    {
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
          title: "Master the Miso Glaze",
          description:
            "In a small saucepan over medium heat, combine the miso paste, soy sauce, grated ginger, honey, and rice vinegar. Whisk continuously as it comes to a gentle simmer.",
          time: 7,
          phase: "Preparation",
        },
        {
          title: "Prep & Season the Salmon",
          description:
            "Remove the salmon from the fridge and pat the fillets extremely dry with paper towels. Season both sides generously with kosher salt and freshly cracked black pepper.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Sear the Salmon to Perfection",
          description:
            "Heat your oil in a large skillet over medium-high heat until it shimmers. Carefully place the salmon fillets skin-side down.",
          time: 5,
          phase: "Cooking",
        },
        {
          title: "Glaze and Caramelize",
          description:
            "Flip the salmon fillets over. Immediately brush them generously with your prepared Miso-Ginger glaze.",
          time: 4,
          phase: "Cooking",
        },
        {
          title: "Artful Assembly",
          description:
            "Fluff the steamed rice with a fork and create a bed in each bowl. Place a glazed salmon fillet prominently on top.",
          time: 3,
          phase: "Plating",
        },
      ],
      author: {
        name: "Chef Marcus Chen",
        avatar:
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "The Perfect Quinoa Fluff",
          description:
            "Rinse the quinoa thoroughly. Combine with water in a pot, bring to a boil, then cover and reduce heat to low.",
          time: 20,
          phase: "Cooking",
        },
        {
          title: "Vegetable Prep Work",
          description:
            "While the quinoa cooks, prepare your fresh ingredients. Slice the cherry tomatoes in half.",
          time: 5,
          phase: "Preparation",
        },
        {
          title: "Whisk the Vinaigrette",
          description:
            "In a small bowl, whisk together the extra virgin olive oil, fresh lemon juice, kosher salt, cracked black pepper, and dried oregano.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Build the Power Bowl",
          description:
            "In a large mixing bowl, combine the warm fluffy quinoa with the drained chickpeas, prepped vegetables, and Kalamata olives.",
          time: 3,
          phase: "Plating",
        },
      ],
      author: {
        name: "Elena Costa",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Season the Chicken",
          description:
            "Pat the chicken breasts dry with paper towels. Season both sides generously.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Golden Sear",
          description:
            "Heat the olive oil in a large skillet over medium-high heat. Add the chicken breasts and cook for 6-7 minutes per side.",
          time: 15,
          phase: "Cooking",
        },
        {
          title: "Build the Cream Sauce",
          description:
            "In the same pan, sauté the minced garlic. Add sun-dried tomatoes and chicken broth. Stir in heavy cream.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Wilt the Spinach",
          description:
            "Stir in the Parmesan cheese until melted and smooth. Add the fresh spinach by the handful.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "Final Simmer & Serve",
          description:
            "Return the cooked chicken back into the skillet. Spoon the rich, creamy sauce over the chicken.",
          time: 3,
          phase: "Plating",
        },
      ],
      author: {
        name: "Marco Bellini",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Aromatic Mise en Place",
          description:
            "Slice the chicken thighs into bite-sized strips. De-seed the bell pepper.",
          time: 5,
          phase: "Preparation",
        },
        {
          title: "Bloom the Curry Paste",
          description:
            "Heat half of the thick coconut cream in a wok. Add the green curry paste and fry for 2-3 minutes.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "Seal the Chicken",
          description:
            "Add the sliced chicken thighs to the fragrant curry base. Stir-fry for 3-4 minutes.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Simmer & Meld",
          description:
            "Pour in the remaining coconut milk. Add the bamboo shoots and bell pepper strips. Simmer for 10 minutes.",
          time: 10,
          phase: "Cooking",
        },
        {
          title: "The Thai Flavor Balance",
          description:
            "Turn off the heat. Stir in the fish sauce, palm sugar, and tear the Thai basil leaves into the pot.",
          time: 4,
          phase: "Plating",
        },
      ],
      author: {
        name: "Suki Patel",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Sear the Beef",
          description:
            "Heat a large skillet over medium-high heat. Add the ground beef and cook for 6-8 minutes.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Simmer with Spices",
          description:
            "Stir in the taco seasoning and water. Reduce heat and let it simmer for 5 minutes.",
          time: 5,
          phase: "Cooking",
        },
        {
          title: "Crisp the Shells",
          description:
            "Preheat your oven to 350°F. Arrange the taco shells on a baking sheet and heat for 3-5 minutes.",
          time: 3,
          phase: "Preparation",
        },
        {
          title: "Taco Bar Assembly",
          description:
            "Spoon the seasoned beef into the warm taco shells. Top with cheese, lettuce, tomatoes, sour cream, and cilantro.",
          time: 5,
          phase: "Plating",
        },
      ],
      author: {
        name: "Carlos Rivera",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Golden Mushroom Prep",
          description:
            "Clean the wild mushrooms with a damp cloth. Slice them and sauté in butter until golden brown.",
          time: 8,
          phase: "Preparation",
        },
        {
          title: "Toasting the Rice",
          description:
            "Add the minced shallot and cook until translucent. Add the Arborio rice and toast for 2-3 minutes.",
          time: 4,
          phase: "Cooking",
        },
        {
          title: "Deglaze with Wine",
          description:
            "Pour in the white wine. Stir constantly until completely evaporated.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "The Ladle Method",
          description:
            "Begin adding warm vegetable broth one ladle at a time. Stir frequently.",
          time: 25,
          phase: "Cooking",
        },
        {
          title: "The Mantecatura",
          description:
            "Remove from heat. Vigorously stir in cold butter, grated Parmesan, and the reserved mushrooms.",
          time: 5,
          phase: "Plating",
        },
      ],
      author: {
        name: "Sofia Rossi",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Savory Beef Bulgogi",
          description:
            "Brown the ground beef with soy sauce, garlic, and sesame oil.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Vegetable Namul",
          description:
            "Blanch spinach, sauté carrots and bean sprouts separately.",
          time: 12,
          phase: "Preparation",
        },
        {
          title: "The Perfect Sunny-Side Up",
          description: "Cook eggs sunny-side up keeping the yolks runny.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "Colorful Assembly",
          description:
            "Scoop warm rice into bowls. Arrange beef and vegetables in sections. Top with egg and gochujang.",
          time: 5,
          phase: "Plating",
        },
      ],
      author: {
        name: "Ji-Young Kim",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      },
    },
    {
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
          title: "Zesty Marinade",
          description:
            "Whisk together lemon juice, olive oil, garlic, rosemary, thyme, and red pepper flakes.",
          time: 5,
          phase: "Preparation",
        },
        {
          title: "Flavor Infusion",
          description:
            "Pour marinade over chicken and let it marinate for at least 15 minutes.",
          time: 15,
          phase: "Preparation",
        },
        {
          title: "Char-Grill",
          description:
            "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F.",
          time: 14,
          phase: "Cooking",
        },
        {
          title: "Rest & Serve",
          description:
            "Let the chicken rest for 5 minutes before serving with fresh herbs and grilled lemon.",
          time: 5,
          phase: "Plating",
        },
      ],
      author: {
        name: "James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
    },
  ];

  // --- Reviews ---
  const reviews = [
    {
      recipeTitle: "Miso-Ginger Glazed Salmon Bowl",
      user: "Eleanor P.",
      rating: 5,
      date: "2 days ago",
      comment: "The miso glaze is a game changer!",
      verified: true,
      likes: 24,
      avatar: "E",
    },
    {
      recipeTitle: "Miso-Ginger Glazed Salmon Bowl",
      user: "Marcus J.",
      rating: 4,
      date: "5 days ago",
      comment: "Instructions were clear. Great weeknight meal.",
      verified: false,
      likes: 8,
      avatar: "M",
    },
    {
      recipeTitle: "Miso-Ginger Glazed Salmon Bowl",
      user: "Sarah K.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Made this for a dinner party and everyone asked for the recipe!",
      verified: true,
      likes: 32,
      avatar: "S",
    },
  ];

  // --- Collections ---
  const collections = [
    {
      name: "Favorites",
      icon: "favorite",
      color: "primary",
      recipeIndices: [0, 2, 5],
    },
    {
      name: "Quick Meals",
      icon: "timer",
      color: "amber",
      recipeIndices: [1, 4],
    },
    { name: "Healthy", icon: "eco", color: "green", recipeIndices: [0, 1, 3] },
    {
      name: "Date Night",
      icon: "favorite",
      color: "pink",
      recipeIndices: [2, 5],
    },
  ];

  // ---------- 3. Write to Firestore ----------

  // Seed recipes
  const recipeIdMap: string[] = [];
  for (const recipe of recipes) {
    const ref = await db.collection("recipes").add({
      ...recipe,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    recipeIdMap.push(ref.id);
    console.log(`  ✅ Recipe: "${recipe.title}" → ${ref.id}`);
  }

  // Seed reviews (link to first recipe)
  for (const review of reviews) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { recipeTitle, ...reviewData } = review;
    const ref = await db.collection("reviews").add({
      ...reviewData,
      recipeId: recipeIdMap[0], // All sample reviews are for the first recipe
      createdAt: new Date(),
    });
    console.log(`  ✅ Review by ${review.user} → ${ref.id}`);
  }

  // Seed collections (map indices to Firestore IDs)
  for (const col of collections) {
    const recipeIds = col.recipeIndices.map((i) => recipeIdMap[i]);
    const ref = await db.collection("collections").add({
      name: col.name,
      icon: col.icon,
      color: col.color,
      recipeIds,
    });
    console.log(`  ✅ Collection: "${col.name}" → ${ref.id}`);
  }

  console.log("\n🎉  Seeding complete! Your Firestore is now populated.");
  console.log(
    `    ${recipes.length} recipes, ${reviews.length} reviews, ${collections.length} collections`,
  );
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});

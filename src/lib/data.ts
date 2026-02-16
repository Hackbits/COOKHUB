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
          title: "Master the Miso Glaze",
          description:
            "In a small saucepan over medium heat, combine the miso paste, soy sauce, grated ginger, honey, and rice vinegar. Whisk continuously as it comes to a gentle simmer. Let it bubble softly for 5-7 minutes. You're looking for a glossy, slightly thickened consistency that coats the back of a spoon—similar to warm maple syrup. The aroma should be savory-sweet and fragrant with ginger.",
          time: 7,
          phase: "Preparation",
          proTip:
            "Use fresh ginger for a sharper flavor that cuts through the richness of the salmon. If it gets too thick, just whisk in a teaspoon of water.",
        },
        {
          title: "Prep & Season the Salmon",
          description:
            "Remove the salmon from the fridge and pat the fillets extremely dry with paper towels—moisture is the enemy of a crispy sear! Season both sides generously with kosher salt and freshly cracked black pepper. Press the seasoning gently into the flesh to ensure it adheres.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Sear the Salmon to Perfection",
          description:
            "Heat your oil in a large skillet over medium-high heat until it shimmers but doesn't smoke. Carefully place the salmon fillets skin-side down in the pan, pressing gently with a spatula for 10 seconds to maximize skin contact. Cook undisturbed for 4-5 minutes until the skin is crispy and the salmon turns opaque halfway up the side.",
          time: 5,
          phase: "Cooking",
          proTip:
            "Resist the urge to move the salmon! If it sticks, it's not ready to flip yet. A perfect sear releases itself.",
        },
        {
          title: "Glaze and Caramelize",
          description:
            "Flip the salmon fillets over. Immediately brush them generously with your prepared Miso-Ginger glaze. Let them cook for another 3-4 minutes. As the glaze hits the hot pan, it will bubble and caramelize rapidly. Brush with a second layer of glaze one minute before finishing to get that sticky, glossy shine without burning.",
          time: 4,
          phase: "Cooking",
        },
        {
          title: "Artful Assembly",
          description:
            "Fluff the steamed rice with a fork and create a bed in each bowl. Place a glazed salmon fillet prominently on top. Arrange the sliced cucumber and green onions around the salmon to create color contrast. Sprinkle toasted sesame seeds over everything for texture. Finally, drizzle any remaining glaze from the pan over the salmon and rice for that final burst of umami flavor.",
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
          title: "The Perfect Quinoa Fluff",
          description:
            "Rinse the quinoa thoroughly in a fine-mesh sieve under cold running water until the water runs clear—this removes the bitter saponin coating. Combine with water in a pot, bring to a boil, then cover and reduce heat to low. Simmer for 15 minutes. Remove from heat and let it steam with the lid on for 5 more minutes before fluffing with a fork.",
          time: 20,
          phase: "Cooking",
          proTip:
            "Toast the dry quinoa in the saucepan for 2 minutes before adding water to unlock a deeper, nuttier flavor profile.",
        },
        {
          title: "Vegetable Prep Work",
          description:
            "While the quinoa cooks, prepare your fresh ingredients. Slice the cherry tomatoes in half to release their juices. Dice the cucumber into bite-sized refreshers. Thinly slice the red onion—if you find raw onion too sharp, soak the slices in ice water for 10 minutes to mellow them out.",
          time: 5,
          phase: "Preparation",
        },
        {
          title: "Whisk the Vinaigrette",
          description:
            "In a small bowl, whisk together the extra virgin olive oil, fresh lemon juice, kosher salt, cracked black pepper, and dried oregano. Emulsify until the dressing becomes slightly opaque and creamy-looking. Taste and adjust acidity if needed.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Build the Power Bowl",
          description:
            "In a large mixing bowl, combine the warm fluffy quinoa with the drained chickpeas, prepped vegetables, and Kalamata olives. Pour the dressing over while the quinoa is still warm to help it absorb the flavors. Toss gently to combine. Top generously with crumbled feta cheese before serving.",
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
          title: "Season the Chicken",
          description:
            "Pat the chicken breasts dry with paper towels. Season both sides generously with the Italian seasoning, kosher salt, and black pepper. Press the herbs into the meat to create a crust when searing.",
          time: 2,
          phase: "Preparation",
        },
        {
          title: "Golden Sear",
          description:
            "Heat the olive oil in a large skillet over medium-high heat. Add the chicken breasts and cook without moving them for 6-7 minutes until a golden-brown crust forms. Flip and cook for another 5-6 minutes until cooked through (165°F internal). Remove chicken to a plate and cover with foil to keep warm.",
          time: 15,
          phase: "Cooking",
          proTip:
            "Don't overcrowd the pan! If the chicken pieces are touching, they will steam instead of sear.",
        },
        {
          title: "Build the Cream Sauce",
          description:
            "In the same pan (don't wipe it out! those brown bits are flavor), reduce heat to medium. Sauté the minced garlic for 30 seconds until fragrant. Add the sun-dried tomatoes and chicken broth, scraping up the browned bits from the bottom. Stir in the heavy cream and bring to a gentle simmer until slightly thickened.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Wilt the Spinach",
          description:
            "Stir in the Parmesan cheese until melted and smooth. Add the fresh spinach by the handful, stirring constantly until it wilts down into the sauce, which should take about 1-2 minutes.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "Final Simmer & Serve",
          description:
            "Return the cooked chicken (and any juices from the plate) back into the skillet. Spoon the rich, creamy sauce over the chicken and let it simmer together for 2-3 minutes to reheat the chicken and marry the flavors. Serve hot, garnished with extra Parmesan.",
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
          title: "Aromatic Mise en Place",
          description:
            "Preparation is key for stir-fries and curries! Slice the chicken thighs into bite-sized, uniform strips for even cooking. De-seed the bell pepper and slice it into thin strips. If you're using bamboo shoots, rinse them well to remove any tinny flavor. Have all your liquids and pastes measured and ready by the stove.",
          time: 5,
          phase: "Preparation",
        },
        {
          title: "Bloom the Curry Paste",
          description:
            "Heat half of the thick coconut cream (from the top of the can) in a wok or large pot over medium heat. Add the green curry paste and fry it in the coconut fat for 2-3 minutes. You want to see the oil start to separate from the paste and smell an intense, aromatic fragrance—this 'blooming' process releases the essential oils.",
          time: 3,
          phase: "Cooking",
          proTip:
            "If your coconut milk doesn't separate, add a splash of vegetable oil to help fry the paste properly.",
        },
        {
          title: "Seal the Chicken",
          description:
            "Add the sliced chicken thighs to the fragrant curry base. Stir-fry for 3-4 minutes, ensuring every piece is coated in the green paste. Cook until the outside of the chicken is opaque and no longer pink.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Simmer & Meld",
          description:
            "Pour in the remaining coconut milk (and a little water or stock if you prefer a thinner curry). Add the bamboo shoots and bell pepper strips. Bring to a boil, then reduce heat to a gentle simmer. Let it bubble for 10 minutes until the vegetables are tender but still have a bit of bite.",
          time: 10,
          phase: "Cooking",
        },
        {
          title: "The Thai Flavor Balance",
          description:
            "Turn off the heat—this is crucial! excessive boiling destroys fresh herb flavors. Stir in the fish sauce for saltiness, palm sugar for sweetness, and tear the Thai basil leaves right into the pot. Taste and adjust: it should be a perfect harmony of spicy, salty, sweet, and aromatic. Serve immediately over steaming jasmine rice.",
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
          title: "Sear the Beef",
          description:
            "Heat a large skillet over medium-high heat. Add the ground beef and break it up with a wooden spoon. Cook for 6-8 minutes, stirring occasionally, until the beef is fully browned and no pink remains. Carefully drain the excess grease from the pan, leaving just a teaspoon for flavor.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Simmer with Spices",
          description:
            "Stir in the taco seasoning packet and the amount of water recommended on the package (usually about 2/3 cup). Reduce heat to low and let it simmer for 5 minutes. The sauce will thicken and coat the meat, making it juicy and flavorful rather than dry.",
          time: 5,
          phase: "Cooking",
          proTip:
            "For an extra depth of flavor, add a tablespoon of tomato paste or a splash of beef broth instead of just water.",
        },
        {
          title: "Crisp the Shells",
          description:
            "While the meat simmers, preheat your oven to 350°F (175°C). Arrange the taco shells on a baking sheet and heat them for 3-5 minutes. This restores their crunch and warm corn flavor.",
          time: 3,
          phase: "Preparation",
        },
        {
          title: "Taco Bar Assembly",
          description:
            "Spoon the seasoned beef into the warm taco shells. Top immediately with shredded cheese so it gets slightly melty. Layer on the crispy lettuce, diced tomatoes, a dollop of sour cream, and fresh cilantro. Serve with lime wedges for a zesty kick.",
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
          title: "Golden Mushroom Prep",
          description:
            "Gently clean the wild mushrooms with a damp cloth (don't soak them!). Slice them into meaty pieces. Heat half the butter in a heavy-bottomed pot over medium-high heat. Sauté the mushrooms until they release their liquid and turn golden brown. Remove them from the pot and set aside to keep their texture perfect.",
          time: 8,
          phase: "Preparation",
        },
        {
          title: "Toasting the Rice",
          description:
            "In the same pot, add the minced shallot and cook until translucent. Add the Arborio rice and toast it, stirring constantly, for 2-3 minutes. The grains should become slightly translucent at the edges with a pearly white center. This step creates a shell that prevents the rice from turning into mush.",
          time: 4,
          phase: "Cooking",
        },
        {
          title: "Deglaze with Wine",
          description:
            "Pour in the white wine. It will hiss and steam aggressively. Stir constantly until the wine has completely evaporated and satisfied the thirsty rice grains. This adds a crucial layer of acidity to balance the creaminess.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "The Ladle Method",
          description:
            "Reduce heat to medium. Begin adding the warm vegetable broth one ladle at a time. Stir frequently (you don't need to stir constantly, but often). Wait until the liquid is almost completely absorbed before adding the next ladle. The rice releases its starch slowly, creating that natural creamy texture.",
          time: 25,
          phase: "Cooking",
          proTip:
            "If you run out of broth and the rice is still crunchy, just continue with hot water. The starch does the heavy lifting for texture.",
        },
        {
          title: "The Mantecatura",
          description:
            "When the rice is tender but still has a slight bite (al dente), remove the pot from the heat. Vigorously stir in the cold butter, grated Parmesan, and the reserved sautéed mushrooms. This final step, called 'mantecatura', whips air into the risotto making it incredibly creamy and glossy. Serve immediately on warmed plates.",
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
          title: "Savory Beef Bulrog",
          description:
            "In a hot skillet, brown the ground beef breaking it into small crumbles. Stir in the soy sauce, minced garlic, and a drizzle of sesame oil. Cook until the liquid evaporates and the beef is caramelized and deeply flavorful.",
          time: 8,
          phase: "Cooking",
        },
        {
          title: "Vegetable Namul",
          description:
            "Each vegetable needs individual attention. Blanch the spinach in boiling water for 30 seconds, drain, squeeze dry, and season with salt and sesame oil. Sauté the julienned carrots and bean sprouts separately in a little oil until just tender-crisp. Arrange them on a platter so you can assemble easily.",
          time: 12,
          phase: "Preparation",
        },
        {
          title: "The Perfect Sunny-Side Up",
          description:
            "Heat a non-stick pan over medium heat with a little oil. Crack the eggs carefully to keep the yolks intact. Cook until the whites are set but the yolks are still runny. That runny yolk acts as a sauce for the rice bowl.",
          time: 3,
          phase: "Cooking",
        },
        {
          title: "Colorful Assembly",
          description:
            "Scoop warm steamed rice into bowls. Arrange the beef and prepared vegetables in neat sections over the rice to create a color wheel. Place the fried egg in the center. Add a generous dollop of Gochujang (Korean chili paste) on the side. Mix everything thoroughly just before eating!",
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
          title: "Zesty Marinade",
          description:
            "In a glass bowl or measuring cup, whisk together the juice of 2 lemons, olive oil, minced garlic, chopped fresh rosemary, thyme leaves, red pepper flakes, salt, and pepper. The acid from the lemon will tenderize the meat, while the oil carries the herb flavors.",
          time: 5,
          phase: "Preparation",
          proTip:
            "Zest the lemons before juicing them! The zest contains essential oils that pack way more lemony flavor than the juice alone.",
        },
        {
          title: "Flavor Infusion",
          description:
            "Place the chicken breasts in a ziplock bag or shallow dish. Pour the marinade over, massaging it to ensure every inch is coated. Let it marinate in the refrigerator for at least 15 minutes, but no longer than 2 hours (or the texture can become mealy from the acid).",
          time: 15,
          phase: "Preparation",
        },
        {
          title: "Char-Grill",
          description:
            "Preheat your grill or grill pan to medium-high heat. Oil the grates to prevent sticking. Place the chicken on the grill and cook for 6-7 minutes per side. You want definitive grill marks and an internal temperature of 165°F (74°C). Grill the remaining lemon halves cut-side down for a smoky garnish.",
          time: 14,
          phase: "Cooking",
        },
        {
          title: "Rest & Serve",
          description:
            "Transfer the chicken to a cutting board and let it rest for 5 minutes. This allows the juices to redistribute throughout the meat instead of spilling out when you slice. Serve topped with fresh herbs and a squeeze of the caramelized grilled lemon.",
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

"use server";

import * as cheerio from "cheerio";

export type ScrapedRecipe = {
  title: string;
  description: string;
  image: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
};

export async function scrapeRecipe(url: string): Promise<ScrapedRecipe | null> {
  if (!url) return null;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Initial heuristic scraping (works for many recipe sites with structured data or common classes)
    // In a real app, this would be much more robust with fallback logic or using a dedicated scraping API (like browserless)

    // LD+JSON parsing (Best case scenario)
    let jsonRecipe: any = null;
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse($(el).html() || "{}");
        if (
          data["@type"] === "Recipe" ||
          (Array.isArray(data) &&
            data.find((item: any) => item["@type"] === "Recipe"))
        ) {
          jsonRecipe = Array.isArray(data)
            ? data.find((item: any) => item["@type"] === "Recipe")
            : data;
        }
      } catch (e) {
        // Ignore parse errors
      }
    });

    if (jsonRecipe) {
      return {
        title: jsonRecipe.name || "",
        description: jsonRecipe.description || "",
        image: Array.isArray(jsonRecipe.image)
          ? jsonRecipe.image[0]
          : jsonRecipe.image?.url || jsonRecipe.image || "",
        time: jsonRecipe.totalTime || "",
        servings: jsonRecipe.recipeYield?.toString() || "",
        ingredients: Array.isArray(jsonRecipe.recipeIngredient)
          ? jsonRecipe.recipeIngredient
          : [],
        steps: Array.isArray(jsonRecipe.recipeInstructions)
          ? jsonRecipe.recipeInstructions
              .map((i: any) => i.text || i.name || i || "")
              .filter(Boolean)
          : [],
      };
    }

    // Fallback Cheerio Selectors (Generic)
    const title = $("h1").first().text().trim();
    const description = $("meta[name='description']").attr("content") || "";
    const image = $("meta[property='og:image']").attr("content") || "";

    // Attempt to find ingredients lists
    const ingredients: string[] = [];
    $("ul li").each((_, el) => {
      const text = $(el).text().trim();
      // Heuristic: Ingredient lines often start with a number or fraction
      if (/^[\d¼½¾⅛\s]/.test(text) && text.length < 100) {
        ingredients.push(text);
      }
    });

    return {
      title,
      description,
      image,
      time: "",
      servings: "",
      ingredients: ingredients.slice(0, 20), // Limit to avoid junk
      steps: [], // Hard to reliably identify steps without LD+JSON generic selectors
    };
  } catch (error) {
    console.error("Scraping error:", error);
    return null;
  }
}

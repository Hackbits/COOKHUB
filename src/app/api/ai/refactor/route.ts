import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { recipe_text, instruction } = await req.json();

    const prompt = `You are an expert professional chef and nutritionist.
Refactor the following recipe based on this instruction: "${instruction}".

Original Recipe:
${recipe_text}

You MUST respond with EXACTLY two sections, clearly separated:

SECTION 1 — A human-readable Markdown version of the refactored recipe.

SECTION 2 — A JSON code block (fenced with \`\`\`json ... \`\`\`) containing the structured recipe data. The JSON MUST follow this exact schema:

\`\`\`json
{
  "title": "string",
  "description": "string",
  "time": "string (e.g. '25 mins')",
  "difficulty": "Easy" | "Medium" | "Hard",
  "servings": number,
  "calories": number,
  "protein": "string (e.g. '32g')",
  "carbs": "string (e.g. '18g')",
  "fats": "string (e.g. '24g')",
  "tags": ["string"],
  "ingredients": [
    { "qty": "string", "name": "string", "category": "meatSeafood" | "pantry" | "produce" | "dairy" }
  ],
  "steps": [
    { "title": "string", "description": "string", "time": number }
  ]
}
\`\`\`

IMPORTANT:
- The JSON must be valid and parseable.
- "steps" must include step-by-step cooking instructions with timing for each step.
- Apply the user's instruction strictly to both the markdown AND the JSON.
- Keep ingredient categories accurate.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    // --- Improved Parsing Logic ---

    // 1. Extract the JSON block (if present)
    let structured = null;
    // Regex to find code block with optional "json" tag, case insensitive
    const jsonMatch = text.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);

    if (jsonMatch) {
      try {
        // Prepare the string for parsing (trim, remove potential leading/trailing non-JSON chars)
        const jsonContent = jsonMatch[1].trim();
        structured = JSON.parse(jsonContent);
      } catch (e) {
        console.error("JSON parse failed:", e);
      }
    }

    // 2. Extract the Markdown content
    let markdown = text;

    // If we found a JSON block, remove it and everything after it (assuming JSON is at the end)
    if (jsonMatch) {
      // Find the start index of the match
      const matchIndex = text.indexOf(jsonMatch[0]);
      if (matchIndex !== -1) {
        markdown = text.substring(0, matchIndex).trim();
      }
    }

    // Remove "SECTION 1..." headers
    markdown = markdown.replace(/SECTION \d+\s*[-—]\s*.*$/gm, "").trim();
    // Remove "SECTION 2" and anything following it til end of string
    markdown = markdown.replace(/SECTION 2[\s\S]*$/, "").trim();
    // Remove horizontal rules (--- or ***) at the end of the markdown
    markdown = markdown.replace(/[-*_]{3,}\s*$/, "").trim();

    return NextResponse.json({
      result: markdown,
      structured,
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 },
    );
  }
}

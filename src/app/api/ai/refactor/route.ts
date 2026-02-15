import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { recipe_text, instruction } = await req.json();

    const prompt = `
        You are an expert professional chef and nutritionist.
        Refactor the following recipe based on this instruction: "${instruction}".
        
        Original Recipe:
        ${recipe_text}
        
        Output ONLY the rewritten recipe in a clear, structured Markdown format. 
        Maintain the original style but apply the changes strictly.
        `;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 },
    );
  }
}

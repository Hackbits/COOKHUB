import { NextResponse } from "next/server";
import { calculateEcoScore } from "@/actions/ecoscore";
import { z } from "zod/v4";

const EcoScoreRequestSchema = z.object({
  ingredients: z
    .array(z.string().min(1))
    .min(1, "At least one ingredient is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = EcoScoreRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.prettifyError(parsed.error) },
        { status: 400 },
      );
    }

    const result = await calculateEcoScore(parsed.data.ingredients);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Eco-Score API error:", error);
    return NextResponse.json(
      { error: "Failed to calculate eco-score" },
      { status: 500 },
    );
  }
}

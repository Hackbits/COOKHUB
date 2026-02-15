"use server";

// Simplified CO2 footprint data (kg CO2e per kg)
// Source: Our World in Data / Poore & Nemecek (2018)
const CO2_DATABASE: Record<string, number> = {
  beef: 60.0,
  lamb: 24.0,
  cheese: 21.0,
  chocolate: 19.0,
  coffee: 17.0,
  pork: 7.0,
  poultry: 6.0,
  chicken: 6.0,
  fish: 5.0,
  eggs: 4.5,
  rice: 4.0,
  milk: 3.0,
  vegetables: 0.5,
  fruits: 0.5,
  nuts: 0.3,
  potatoes: 0.3,
  bread: 0.6,
  pasta: 1.2,
};

export type EcoScoreResult = {
  score: number;
  label: "A" | "B" | "C" | "D" | "E";
  breakdown: Record<string, number>;
};

export async function calculateEcoScore(
  ingredients: string[],
): Promise<EcoScoreResult> {
  let totalCO2 = 0.0;
  const breakdown: Record<string, number> = {};

  for (const ingredient of ingredients) {
    const lowerIng = ingredient.toLowerCase();
    let matchedScore = 1.0; // Default low impact

    for (const [key, value] of Object.entries(CO2_DATABASE)) {
      if (lowerIng.includes(key)) {
        matchedScore = value;
        break;
      }
    }

    breakdown[ingredient] = matchedScore;
    totalCO2 += matchedScore;
  }

  // Normalize to 0-100 scale (inverse of CO2 impact)
  // Heuristic: >30kg CO2 = Score 0, <1kg CO2 = Score 100
  const normalizedScore = Math.max(0, Math.min(100, 100 - totalCO2 * 2.5));

  let label: "A" | "B" | "C" | "D" | "E";
  if (normalizedScore >= 80) label = "A";
  else if (normalizedScore >= 60) label = "B";
  else if (normalizedScore >= 40) label = "C";
  else if (normalizedScore >= 20) label = "D";
  else label = "E";

  return {
    score: Math.round(normalizedScore),
    label,
    breakdown,
  };
}

import { ImageResponse } from "next/og";
import { getServerRecipeById } from "@/lib/services/server/recipe-service";

export const runtime = "edge";

export const alt = "Recipe Details - COOKHUB";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const recipe = await getServerRecipeById(params.id);

  if (!recipe) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Recipe not found
      </div>,
      {
        ...size,
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#111827", // dark background
        backgroundImage: recipe.image
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${recipe.image})`
          : "linear-gradient(to bottom right, #111827, #374151)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            background: "#F59E0B",
            color: "white",
            padding: "8px 16px",
            borderRadius: "50px",
            fontSize: "20px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {recipe.category || "Recipe"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "24px",
            fontWeight: 600,
            color: "#D1D5DB",
          }}
        >
          by {recipe.author.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "20px",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {recipe.title}
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#D1D5DB",
            marginBottom: "40px",
            maxWidth: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {recipe.description.substring(0, 100)}...
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "20px 40px",
          borderRadius: "20px",
          maxWidth: "fit-content",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              color: "#9CA3AF",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Time
          </span>
          <span style={{ fontSize: "32px", fontWeight: 800 }}>
            {recipe.time}
          </span>
        </div>
        <div style={{ width: "1px", height: "40px", background: "#4B5563" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              color: "#9CA3AF",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Difficulty
          </span>
          <span style={{ fontSize: "32px", fontWeight: 800 }}>
            {recipe.difficulty}
          </span>
        </div>
        <div style={{ width: "1px", height: "40px", background: "#4B5563" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              color: "#9CA3AF",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Calories
          </span>
          <span style={{ fontSize: "32px", fontWeight: 800 }}>
            {recipe.calories}
          </span>
        </div>
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "60px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#F59E0B",
            borderRadius: "10px",
          }}
        />
        <span style={{ fontSize: "24px", fontWeight: 900 }}>COOKHUB</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

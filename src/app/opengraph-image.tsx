import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "COOKHUB - Your Smart Cooking Companion";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDFBF7", // soft-cream
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #E5E7EB 2%, transparent 0%), radial-gradient(circle at 75px 75px, #E5E7EB 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            marginRight: "20px",
            boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
        </div>
        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#111827",
            fontFamily: "sans-serif",
          }}
        >
          COOKHUB
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "32px",
          color: "#6B7280",
          fontFamily: "sans-serif",
          fontWeight: 500,
          marginTop: "10px",
        }}
      >
        Your Smart Cooking Companion
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "60px",
          padding: "12px 30px",
          background: "#111827",
          borderRadius: "50px",
          color: "white",
          fontSize: "24px",
          fontWeight: 600,
          alignItems: "center",
          gap: "10px",
        }}
      >
        Discover • Cook • Share
      </div>
    </div>,
    {
      ...size,
    },
  );
}

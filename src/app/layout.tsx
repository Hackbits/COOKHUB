import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./main.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SocketProvider } from "@/components/providers/socket-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COOKHUB - Collaborative Culinary Knowledge System",
  description:
    "A dynamic ecosystem for culinary enthusiasts featuring intelligent recipe discovery, adaptive cooking, and collaborative community features.",
  keywords:
    "recipes, cooking, culinary, food, community, meal planning, fridge raid",
  authors: [{ name: "COOKHUB" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} min-h-screen bg-soft-cream font-sans antialiased`}
        suppressHydrationWarning
      >
        <SocketProvider>
          <TooltipProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </TooltipProvider>
        </SocketProvider>
      </body>
    </html>
  );
}

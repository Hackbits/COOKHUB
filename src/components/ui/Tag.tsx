"use client";

import React from "react";

interface TagProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "gray" | "green";
  className?: string;
}

export default function Tag({
  children,
  variant = "primary",
  className = "",
}: TagProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-slate-black text-white border-transparent",
    accent: "bg-amber-500 text-slate-black border-transparent",
    gray: "bg-gray-100 text-gray-500 border-gray-200",
    green: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

"use client";

import React from "react";

interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({
  options,
  activeTab,
  onChange,
  className = "",
}: TabsProps) {
  return (
    <div className={`flex gap-1 bg-gray-100 rounded-2xl p-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all capitalize ${
            activeTab === option.id
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

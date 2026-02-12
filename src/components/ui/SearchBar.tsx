"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative group w-full ${className}`}
    >
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <Search className="text-gray-400 group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white h-14 md:h-16 pl-14 pr-4 border-none rounded-2xl text-base md:text-lg focus:ring-4 focus:ring-primary/20 shadow-2xl placeholder:text-gray-400 outline-none transition-all"
      />
      <button
        type="submit"
        className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-all"
      >
        Search
      </button>
    </form>
  );
}

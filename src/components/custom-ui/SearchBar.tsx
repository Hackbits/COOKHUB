"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search recipes...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 py-6 text-base rounded-2xl border-2 border-orange-100 focus-visible:ring-primary bg-white shadow-sm"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="rounded-2xl px-6 py-6 font-bold shadow-md hover:shadow-lg transition-all"
      >
        Search
      </Button>
    </form>
  );
}

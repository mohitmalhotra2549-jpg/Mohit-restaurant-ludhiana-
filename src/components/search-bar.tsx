"use client";

import { Search, X } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-cream-100/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search for a dish…"
        className="w-full rounded-full border border-ink-900/10 bg-white/80 py-3.5 pl-11 pr-10 text-sm text-ink-900 placeholder:text-ink-500/60 shadow-sm outline-none transition-all duration-300 focus:border-gold-300/60 focus:shadow-gold dark:border-white/10 dark:bg-white/[0.04] dark:text-cream-100 dark:placeholder:text-cream-100/30"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900/10 text-ink-600 transition hover:bg-ink-900/20 dark:bg-white/10 dark:text-cream-100"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

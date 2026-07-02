"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/dishes";
import { cn } from "@/lib/utils";
import type { DishCategory } from "@/types/dish";

export function CategoryFilter({
  active,
  onChange,
}: {
  active: DishCategory | "all";
  onChange: (c: DishCategory | "all") => void;
}) {
  return (
    <div className="scrollbar-none flex w-full gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              "relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300",
              isActive
                ? "text-ink-950"
                : "text-ink-600 hover:text-ink-900 dark:text-cream-100/60 dark:hover:text-cream-100"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-gold-shine bg-[length:200%_auto] shadow-gold"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {!isActive && (
              <span className="absolute inset-0 rounded-full border border-ink-900/10 dark:border-white/10" />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

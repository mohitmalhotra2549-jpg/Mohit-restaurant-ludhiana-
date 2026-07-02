"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";
import { DishCard } from "@/components/dish-card";
import { ARViewer } from "@/components/ar-viewer";
import { dishes } from "@/data/dishes";
import type { Dish, DishCategory } from "@/types/dish";

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DishCategory | "all">("all");
  const [activeDish, setActiveDish] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const matchesCategory = category === "all" || d.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q) ||
        d.ingredients.some((i) => i.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50 pb-20 pt-28 dark:bg-ink-950 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 text-center sm:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              The Menu
            </p>
            <h1 className="mt-3 font-display text-4xl text-ink-900 dark:text-cream-100 sm:text-5xl">
              Explore in Augmented Reality
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink-600/70 dark:text-cream-100/50">
              Tap “View in AR” on any dish to place a true-to-scale 3D model
              right on your table.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-[68px] z-30 mb-10 flex flex-col gap-4 rounded-3xl border border-ink-900/[0.06] bg-white/80 p-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-ink-900/70 sm:top-[76px] sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="sm:w-80">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <CategoryFilter active={category} onChange={setCategory} />
          </motion.div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((dish, i) => (
                <DishCard
                  key={dish.slug}
                  dish={dish}
                  index={i}
                  onViewAR={setActiveDish}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-24 text-center"
            >
              <PackageSearch className="h-10 w-10 text-ink-400 dark:text-cream-100/30" />
              <p className="text-ink-600 dark:text-cream-100/50">
                No dishes match your search.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      {activeDish && (
        <ARViewer
          dish={activeDish}
          open={!!activeDish}
          onClose={() => setActiveDish(null)}
        />
      )}
    </>
  );
}

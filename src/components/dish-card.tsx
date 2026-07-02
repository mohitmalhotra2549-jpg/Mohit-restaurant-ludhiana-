"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import type { Dish } from "@/types/dish";
import { formatPrice } from "@/lib/utils";
import {
  ChefSpecialTag,
  DietBadge,
  PrepTimeChip,
  RatingBadge,
  SpiceChip,
} from "./badges";

interface DishCardProps {
  dish: Dish;
  index: number;
  onViewAR: (dish: Dish) => void;
}

export function DishCard({ dish, index, onViewAR }: DishCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-ink-900/[0.06] bg-white shadow-card transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-xl dark:border-white/[0.06] dark:bg-ink-800 dark:shadow-card-dark"
    >
      {/* image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          {dish.isChefSpecial && <ChefSpecialTag />}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2">
          {dish.rating && <RatingBadge rating={dish.rating} />}
        </div>

        <button
          onClick={() => onViewAR(dish)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold text-ink-900 shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold-shine hover:bg-[length:200%_auto] hover:text-ink-950 hover:shadow-gold active:scale-95 dark:bg-ink-950/85 dark:text-cream-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          View in AR
        </button>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <DietBadge diet={dish.diet} />
            <h3 className="font-display text-xl leading-tight text-ink-900 dark:text-cream-100">
              {dish.name}
            </h3>
          </div>
          <p className="whitespace-nowrap font-display text-lg text-gold-500 dark:text-gold-300">
            {formatPrice(dish.price, dish.currency)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-ink-700/80 dark:text-cream-100/65">
          {dish.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <PrepTimeChip minutes={dish.prepTimeMinutes} />
          {dish.spiceLevel ? <SpiceChip level={dish.spiceLevel} /> : null}
        </div>

        <button
          onClick={() => setExpanded((s) => !s)}
          className="mt-1 flex items-center justify-between rounded-xl border border-ink-900/[0.07] bg-ink-50/60 px-3.5 py-2.5 text-xs font-medium text-ink-700 transition-colors hover:border-gold-300/50 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-cream-100/70"
        >
          Ingredients
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-1.5 pb-1 pt-3">
            {dish.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-medium text-gold-600 dark:bg-gold-500/10 dark:text-gold-200"
              >
                {ing}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

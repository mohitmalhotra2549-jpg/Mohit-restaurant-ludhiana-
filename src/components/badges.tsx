import { Clock, Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DietType } from "@/types/dish";

export function DietBadge({ diet }: { diet: DietType }) {
  const isVeg = diet === "veg";
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-[4px] border-2",
        isVeg ? "border-emerald-500" : "border-rose-600"
      )}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          isVeg ? "bg-emerald-500" : "bg-rose-600"
        )}
      />
    </span>
  );
}

export function PrepTimeChip({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-cream-100/80">
      <Clock className="h-3.5 w-3.5 text-gold-400" />
      {minutes} min
    </span>
  );
}

export function SpiceChip({ level }: { level: number }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-cream-100/80">
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="h-3.5 w-3.5 text-rose-500" />
      ))}
    </span>
  );
}

export function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur">
      <Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
      {rating.toFixed(1)}
    </span>
  );
}

export function ChefSpecialTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold-shine bg-[length:200%_auto] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-950 shadow-gold animate-shimmer">
      Chef&apos;s Special
    </span>
  );
}

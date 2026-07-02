"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { restaurant } from "@/data/restaurant";

export function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative h-20 w-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-300/60"
                animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-300/40"
                animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6,
                }}
              />
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_18px_rgba(201,162,76,0.45)]"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="font-display text-2xl tracking-[0.25em] text-cream-100">
                {restaurant.name.toUpperCase()}
              </p>
              <div className="h-px w-16 gold-border bg-gold-300/60" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream-100/50">
                Preparing your experience
              </p>
            </div>

            <div className="mt-2 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/2 bg-gold-shine bg-[length:200%_auto]"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Box,
  ScanLine,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { restaurant } from "@/data/restaurant";
import { dishes } from "@/data/dishes";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />

      <main className="relative overflow-hidden">
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center justify-center px-5 pt-24 sm:px-8">
          <div className="absolute inset-0">
            <Image
              src={restaurant.heroImage}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/75 to-ink-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,76,0.12),_transparent_60%)]" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-8 flex flex-col items-center gap-5"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                <div className="absolute inset-0 animate-float">
                  <Image
                    src={restaurant.logo}
                    alt={restaurant.name}
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(201,162,76,0.35)]"
                  />
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-200 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Augmented Reality Dining
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-5xl leading-[1.05] tracking-tight text-cream-50 sm:text-6xl md:text-7xl"
            >
              {restaurant.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-cream-100/60 sm:text-lg"
            >
              {restaurant.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                href="/menu"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold-shine bg-[length:200%_auto] px-8 py-4 text-sm font-semibold text-ink-950 shadow-gold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_10px_45px_-10px_rgba(201,162,76,0.7)] animate-shimmer"
              >
                <ScanLine className="h-4 w-4" />
                View AR Menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-cream-100 backdrop-blur transition hover:border-gold-300/50 hover:bg-white/5"
              >
                Reserve a Table
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-16 flex items-center gap-8 text-cream-100/40"
            >
              <div className="flex flex-col items-center gap-1">
                <p className="font-display text-2xl text-gold-200">
                  {dishes.length}
                </p>
                <p className="text-[11px] uppercase tracking-widest">
                  AR Dishes
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <p className="font-display text-2xl text-gold-200">4.9</p>
                <p className="text-[11px] uppercase tracking-widest">
                  Avg. Rating
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <p className="font-display text-2xl text-gold-200">100%</p>
                <p className="text-[11px] uppercase tracking-widest">
                  True-to-scale
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-gold-300"
              />
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="relative bg-cream-50 px-5 py-24 dark:bg-ink-950 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                A New Way to Dine
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink-900 dark:text-cream-100 sm:text-4xl">
                See it before you order it
              </h2>
              <p className="mt-4 text-ink-600/70 dark:text-cream-100/50">
                Every dish on our menu is captured as a true-to-scale 3D
                model — place it right on your table with your phone camera.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Box,
                  title: "True 3D Models",
                  desc: "Each dish is faithfully modelled in 3D — see every detail before it arrives.",
                },
                {
                  icon: ScanLine,
                  title: "Instant AR",
                  desc: "Tap “View in AR” to place the dish on your table using just your camera.",
                },
                {
                  icon: UtensilsCrossed,
                  title: "No App Needed",
                  desc: "Works directly in your browser — Scene Viewer on Android, Quick Look on iPhone.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group rounded-3xl border border-ink-900/[0.06] bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/[0.06] dark:bg-ink-800 dark:shadow-card-dark"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-500 transition-colors duration-500 group-hover:bg-gold-shine group-hover:bg-[length:200%_auto] group-hover:text-ink-950 dark:bg-gold-500/10">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-lg text-ink-900 dark:text-cream-100">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600/70 dark:text-cream-100/50">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="relative overflow-hidden bg-ink-950 px-5 py-20 sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,76,0.15),_transparent_65%)]" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
          >
            <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">
              Ready to explore the menu?
            </h2>
            <p className="max-w-lg text-cream-100/50">
              Browse our five signature dishes, each with a full augmented
              reality preview.
            </p>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold-shine bg-[length:200%_auto] px-8 py-4 text-sm font-semibold text-ink-950 shadow-gold transition-all duration-500 hover:scale-[1.03] animate-shimmer"
            >
              <ScanLine className="h-4 w-4" />
              View AR Menu
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}

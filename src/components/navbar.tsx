"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { QrCode, Menu as MenuIcon, Phone } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { ThemeToggle } from "./theme-toggle";
import { QRModal } from "./qr-modal";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-sm dark:shadow-none"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              width={34}
              height={34}
              className="object-contain"
            />
            <span className="font-display text-lg tracking-wide text-ink-900 dark:text-cream-100">
              {restaurant.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-1.5 rounded-full border border-ink-900/10 px-3.5 py-2 text-xs font-medium text-ink-700 transition hover:border-gold-300/50 sm:flex dark:border-white/10 dark:text-cream-100/70"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              Reserve
            </a>

            <button
              onClick={() => setQrOpen(true)}
              aria-label="Show QR code"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white/70 text-ink-900 transition hover:border-gold-300/60 dark:border-white/10 dark:bg-white/5 dark:text-cream-100"
            >
              <QrCode className="h-[18px] w-[18px]" />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}

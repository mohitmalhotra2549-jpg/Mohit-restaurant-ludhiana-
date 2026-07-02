import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { restaurant } from "@/data/restaurant";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-ink-900/10 bg-cream-100/60 px-5 pb-10 pt-16 dark:border-white/10 dark:bg-ink-900 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              width={36}
              height={36}
            />
            <span className="font-display text-xl text-ink-900 dark:text-cream-100">
              {restaurant.name}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-600/70 dark:text-cream-100/50">
            {restaurant.description}
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={restaurant.social.instagram}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition hover:border-gold-300/60 hover:text-gold-500 dark:border-white/10 dark:text-cream-100/70"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={restaurant.social.facebook}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition hover:border-gold-300/60 hover:text-gold-500 dark:border-white/10 dark:text-cream-100/70"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Visit Us
          </p>
          <div className="flex items-start gap-3 text-sm text-ink-700/80 dark:text-cream-100/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            {restaurant.address}
          </div>
          <div className="flex items-start gap-3 text-sm text-ink-700/80 dark:text-cream-100/60">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            {restaurant.hours}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Contact
          </p>
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-sm text-ink-700/80 transition hover:text-gold-500 dark:text-cream-100/60"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold-400" />
            {restaurant.phone}
          </a>
          <a
            href={`mailto:${restaurant.email}`}
            className="flex items-center gap-3 text-sm text-ink-700/80 transition hover:text-gold-500 dark:text-cream-100/60"
          >
            <Mail className="h-4 w-4 shrink-0 text-gold-400" />
            {restaurant.email}
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Experience AR
          </p>
          <p className="text-sm leading-relaxed text-ink-700/70 dark:text-cream-100/50">
            View every dish in true-to-scale 3D on your own table before you
            order — right from your phone&apos;s browser, no app required.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-ink-900/10 pt-6 text-xs text-ink-500/60 dark:border-white/10 dark:text-cream-100/30 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {restaurant.name}. All rights
          reserved.
        </p>
        <p>Crafted with premium AR technology.</p>
      </div>
    </footer>
  );
}

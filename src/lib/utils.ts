import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "₹") {
  return `${currency}${price.toLocaleString("en-IN")}`;
}

/** Detects platform to decide which AR flow to hint at (Scene Viewer vs Quick Look). */
export function getDevicePlatform():
  | "android"
  | "ios"
  | "desktop"
  | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios"; // iPadOS
  return "desktop";
}

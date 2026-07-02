"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Move3d,
  RotateCw,
  Smartphone,
  Sparkles,
  View,
  X,
  ZoomIn,
} from "lucide-react";
import type { Dish } from "@/types/dish";
import { formatPrice } from "@/lib/utils";

interface ARViewerProps {
  dish: Dish;
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen AR / 3D preview modal.
 *
 * Uses <model-viewer> under the hood, which automatically routes to:
 *  - Android  → Scene Viewer (or WebXR when supported)
 *  - iOS      → Quick Look (via the `ios-src` .usdz asset)
 *  - Desktop  → interactive 3D preview with orbit controls
 */
export function ARViewer({ dish, open, onClose }: ARViewerProps) {
  const modelRef = useRef<HTMLElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [arSupported, setArSupported] = useState(true);

  useEffect(() => {
    if (!open) setModelLoaded(false);
  }, [open]);

  useEffect(() => {
    const el = modelRef.current;
    if (!el) return;
    const onLoad = () => setModelLoaded(true);
    const onArStatus = (e: any) => {
      if (e?.detail?.status === "not-presenting" && e?.detail?.reason) {
        // no-op, purely informational
      }
    };
    el.addEventListener("load", onLoad);
    el.addEventListener("ar-status", onArStatus as EventListener);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("ar-status", onArStatus as EventListener);
    };
  }, [open]);

  useEffect(() => {
    // @ts-ignore
    const supported = typeof navigator !== "undefined";
    setArSupported(supported);
  }, []);

  const handleActivateAR = () => {
    const el = modelRef.current as any;
    if (el?.activateAR) el.activateAR();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-ink-950/80 backdrop-blur-md sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-ink-900 shadow-2xl sm:h-[85vh] sm:rounded-[28px]"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-ink-900/90 px-5 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-shine bg-[length:200%_auto] text-ink-950 animate-shimmer">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-lg leading-tight text-cream-100">
                    {dish.name}
                  </p>
                  <p className="text-xs text-cream-100/50">
                    {formatPrice(dish.price, dish.currency)} · Live AR Preview
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close AR viewer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-cream-100/70 transition hover:bg-white/10 hover:text-cream-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* viewer */}
            <div className="relative flex-1 bg-[radial-gradient(ellipse_at_center,_#181820_0%,_#0b0b10_75%)]">
              {!modelLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-gold-300/20 border-t-gold-300" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cream-100/40">
                    Loading 3D model
                  </p>
                </div>
              )}

              {/* @ts-ignore custom element */}
              <model-viewer
                ref={modelRef}
                src={dish.model.glb}
                ios-src={dish.model.usdz}
                alt={`3D model of ${dish.name}`}
                ar
                ar-modes="scene-viewer webxr quick-look"
                ar-scale={dish.model.arScale ?? "auto"}
                ar-placement="floor"
                camera-controls
                auto-rotate
                auto-rotate-delay="1200"
                rotation-per-second="18deg"
                camera-orbit={dish.model.cameraOrbit ?? "0deg 75deg auto"}
                field-of-view="30deg"
                shadow-intensity="1.1"
                shadow-softness="0.8"
                exposure="1.05"
                interaction-prompt="none"
                loading="eager"
                reveal="auto"
                style={{ width: "100%", height: "100%", background: "transparent" }}
              >
                <button
                  slot="ar-button"
                  onClick={handleActivateAR}
                  className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold-shine bg-[length:200%_auto] px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-gold transition-transform duration-300 hover:scale-105 active:scale-95 animate-shimmer"
                >
                  <View className="h-4 w-4" />
                  View on your table
                </button>
              </model-viewer>
            </div>

            {/* footer instructions */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-ink-900/95 px-4 py-4 text-center sm:px-8">
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
                  <Move3d className="h-4 w-4 text-gold-300" />
                </span>
                <p className="text-[11px] leading-tight text-cream-100/60">
                  Drag to place
                  <br />
                  on your table
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
                  <RotateCw className="h-4 w-4 text-gold-300" />
                </span>
                <p className="text-[11px] leading-tight text-cream-100/60">
                  Rotate with
                  <br />
                  one finger
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
                  <ZoomIn className="h-4 w-4 text-gold-300" />
                </span>
                <p className="text-[11px] leading-tight text-cream-100/60">
                  Pinch to
                  <br />
                  zoom & scale
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-white/5 bg-ink-950/60 px-4 py-2.5">
              <Smartphone className="h-3.5 w-3.5 text-cream-100/40" />
              <p className="text-center text-[11px] text-cream-100/40">
                Tap &ldquo;View on your table&rdquo; to launch AR — works with
                Scene Viewer / WebXR on Android and Quick Look on iPhone.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

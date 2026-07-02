"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
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

export function ARViewer({ dish, open, onClose }: ARViewerProps) {
  const modelRef = useRef<HTMLElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [canActivateAR, setCanActivateAR] = useState<boolean | null>(null);
  const [arError, setArError] = useState<string | null>(null);
  const [viewerKey, setViewerKey] = useState(0);

  useEffect(() => {
    if (!open) {
      setModelLoaded(false);
      setCanActivateAR(null);
      setArError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        setModelLoaded(false);
        setCanActivateAR(null);
        setViewerKey((k) => k + 1);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [open]);

  useEffect(() => {
    const el = modelRef.current as any;
    if (!el) return;

    const onLoad = () => {
      setModelLoaded(true);
      let attempts = 0;
      const checkAR = () => {
        attempts += 1;
        if (el.canActivateAR) {
          setCanActivateAR(true);
          return;
        }
        if (attempts >= 6) {
          setCanActivateAR(false);
          return;
        }
        setTimeout(checkAR, 400);
      };
      setTimeout(checkAR, 300);
    };
    const onArStatus = (e: any) => {
      const status = e?.detail?.status;
      if (status === "failed") {
        setArError(
          "Couldn't start AR on this device/browser. Try Chrome on Android with Google Play Services for AR installed, or Safari on iPhone."
        );
      }
      if (status === "not-presenting") {
        setTimeout(() => setViewerKey((k) => k + 1), 50);
      }
    };
    el.addEventListener("load", onLoad);
    el.addEventListener("ar-status", onArStatus as EventListener);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("ar-status", onArStatus as EventListener);
    };
  }, [open, viewerKey]);

  const handleActivateAR = () => {
    const el = modelRef.current as any;
    setArError(null);
    if (el?.canActivateAR) {
      el.activateAR();
    } else {
      setArError(
        "AR isn't supported on this device/browser yet. On Android, use Chrome + Google Play Services for AR. On iPhone, use Safari."
      );
    }
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

              <model-viewer
                key={viewerKey}
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

              {modelLoaded && canActivateAR === false && !arError && (
                <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 flex justify-center">
                  <div className="pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-2xl border border-amber-400/30 bg-ink-950/90 px-4 py-3 text-left backdrop-blur">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <p className="text-xs leading-relaxed text-cream-100/70">
                      AR isn&apos;t available on this device/browser. On
                      Android, open this page in{" "}
                      <span className="text-cream-100">Chrome</span> and
                      install{" "}
                      <span className="text-cream-100">
                        Google Play Services for AR
                      </span>
                      . On iPhone, use{" "}
                      <span className="text-cream-100">Safari</span>.
                    </p>
                  </div>
                </div>
              )}

              {arError && (
                <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 flex justify-center">
                  <div className="pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-2xl border border-rose-400/30 bg-ink-950/90 px-4 py-3 text-left backdrop-blur">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <p className="text-xs leading-relaxed text-cream-100/70">
                      {arError}
                    </p>
                  </div>
                </div>
              )}
            </div>

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

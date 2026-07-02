"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Download, X } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function QRModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/menu`);
    }
  }, [open]);

  const downloadQR = () => {
    const svg = document.getElementById("menu-qr-code");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const svgBlob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${restaurant.name.toLowerCase()}-ar-menu-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-white p-8 text-center shadow-2xl dark:bg-ink-800"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/5 text-ink-700 transition hover:bg-ink-900/10 dark:bg-white/10 dark:text-cream-100"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-display text-2xl text-ink-900 dark:text-cream-100">
              Scan to Open Menu
            </p>
            <p className="mt-1.5 text-sm text-ink-600/70 dark:text-cream-100/50">
              Point your phone camera at the code below
            </p>

            <div className="mx-auto mt-6 flex w-fit items-center justify-center rounded-3xl border border-gold-300/30 bg-gradient-to-br from-gold-50 to-white p-6 shadow-gold dark:from-white/5 dark:to-white/[0.02]">
              {url && (
                <QRCodeSVG
                  id="menu-qr-code"
                  value={url}
                  size={200}
                  bgColor="transparent"
                  fgColor="#0b0b10"
                  level="H"
                  imageSettings={{
                    src: restaurant.logo,
                    height: 34,
                    width: 34,
                    excavate: true,
                  }}
                />
              )}
            </div>

            <button
              onClick={downloadQR}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-sm font-medium text-cream-100 transition hover:bg-ink-800 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <Download className="h-4 w-4" />
              Download QR
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

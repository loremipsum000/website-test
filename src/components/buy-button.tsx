'use client';

import { X, CreditCard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { OnramperWidget } from "./onramper-widget";

export function BuyButton() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  useEffect(() => {
    if (isWidgetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWidgetOpen]);

  return (
    <>
      <button
        onClick={() => setIsWidgetOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ED5409] to-[#F0B90B] p-[1px] text-base font-medium text-white transition-all hover:scale-105 active:scale-95 md:text-lg"
      >
        <div className="relative overflow-hidden rounded-full bg-black/90 px-5 py-3">
          <div className="relative z-10 flex items-center gap-3">
            <span>Buy</span>
            <span className="text-[#ED5409]">S</span>
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>
      </button>

      <AnimatePresence>
        {isWidgetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsWidgetOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-x-0 bottom-0 z-[60] mx-auto h-[85vh] w-full max-w-lg overflow-hidden bg-gray-900 p-4 shadow-xl md:bottom-8 md:h-[600px] md:rounded-2xl"
            >
              <div className="sticky top-0 z-10 -mx-4 -mt-4 bg-gray-900 px-4 pt-4">
                <button
                  onClick={() => setIsWidgetOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <OnramperWidget className="h-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 
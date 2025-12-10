"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Shimmer } from "./shimmer";

export const DotsonicFloater = ({
  cta,
}: {
  cta?: {
    title: string;
    url: string;
  };
}) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem("dotsonicFloaterHidden");
    setIsVisible(hidden !== "true");
  }, []);

  const handleHide = () => {
    localStorage.setItem("dotsonicFloaterHidden", "true");
    setIsAnimating(true);
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      setIsAnimating(false);
    }
  };

  if (isVisible === null && !isAnimating) return null;

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="rounded-lg overflow-hidden px-4 py-3 group shadow-lg relative"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20
            }
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          }}
          whileHover={{ scale: 1.02 }}
        >
          <button
            onClick={handleHide}
            className="absolute top-1 right-1 text-white/70 hover:text-white z-30 transition-colors p-1"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <div
            className="absolute inset-0 bg-cover rounded-lg"
            style={{
              backgroundColor: '#000',
              backgroundSize: 'cover',
              backgroundImage: 'url(/dotsonic-bg.png)',
            }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg" />
          <Shimmer className="absolute inset-0 z-20 rounded-lg" />
          <div className="flex flex-col gap-y-2 items-start relative z-10">
            <div className="flex items-center gap-x-2">
              <div className="relative">
                <div className="absolute h-2 w-2 bg-primary rounded-full animate-ping" />
                <div className="relative h-2 w-2 bg-primary rounded-full" />
              </div>
              <p className="text-white text-body-sm font-medium tracking-wide">
                Earn <span className="text-primary">Points</span> Now
              </p>
            </div>
            <Link
              target="_blank"
              href="https://my.soniclabs.com/points"
              className="relative inline-block group"
            >
              <div className="absolute inset-0 bg-gradient-sonic-mirrored animate-gradient rounded-full blur-sm group-hover:blur group-hover:brightness-125 transition" />
              <div className="relative z-10 p-[1px] rounded-full bg-gradient-sonic-mirrored animate-gradient">
                <div className="flex items-center justify-center gap-x-2 px-3 py-1 bg-black/85 rounded-full group-hover:bg-black/75 transition">
                  <span className="flex items-center text-white/85 font-medium text-body-sm group-hover:text-white transition">
                    Start Earning
                    <ArrowRight strokeWidth={2} className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

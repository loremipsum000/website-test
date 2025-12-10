"use client";
import { SonicMask, Spikes } from "@/components/decorations";
import { motion } from "framer-motion";

export const HeroDecorations = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Spikes
          className="absolute w-full h-24 sm:h-36 md:h-56"
          direction="down"
        />
        <div className="container mx-auto flex items-center justify-center relative">
          <SonicMask className="absolute top-0 fill-shade-light max-w-full mt-6 sm:mt-10 md:mt-8 lg:mt-6 h-24 md:h-56" />
        </div>
      </motion.div>
    </>
  );
};

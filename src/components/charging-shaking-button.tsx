"use client";
import React from "react";
import { motion } from "framer-motion";

const ChargingShakingButton = () => {
  return (
    <motion.div
      whileHover={{
        scale: [1, 1.2, 1.1, 1.3, 1],
        rotate: [0, -3, 3, -3, 3, 0],
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center"
    >
      POWER
    </motion.div>
  );
};

export default ChargingShakingButton;

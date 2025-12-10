"use client";
import React, { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";

type PunchyTextEffectProps = {
  prefix?: string;
  value: string | MotionValue<string>;
  postfix?: string;
};

const PunchyTextEffect = ({
  value,
  prefix,
  postfix,
}: PunchyTextEffectProps) => {
  const punchyVariants = {
    initial: {
      x: 0,
      filter: "blur(0px)",
    },
    punch: {
      x: [-10, 10, -5, 5, -5, 5, 0], // More intense "zap" effect
      filter: ["blur(20px)", "blur(30px)", "blur(0px)"], // Blur during zap
      transition: {
        duration: 0.4, // Duration of the punchy effect
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="inline-flex items-center gap-x-1">
      <span>{prefix}</span>
      <motion.div
        className="punchy-text"
        key={value.toString()} // Key changes force a new animation on count change
        initial="initial"
        animate="punch"
        variants={punchyVariants}
      >
        {value}
      </motion.div>
      <span>{postfix}</span>
    </div>
  );
};

export default PunchyTextEffect;

"use client";
import React from "react";
import { motion } from "framer-motion";

interface FancyTextProps {
  text: string;
  className?: string;
  duration?: number;
  interval?: number;
}

export const FadeInText: React.FC<FancyTextProps> = ({
  text,
  className = "",
}) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className={`inline-block ${className}`}
  >
    {text}
  </motion.span>
);

export const TypewriterText: React.FC<FancyTextProps> = ({
  text,
  className = "",
}) => (
  <motion.span
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ duration: 2, ease: "linear" }}
    className={`inline-block whitespace-nowrap overflow-hidden ${className}`}
  >
    {text}
  </motion.span>
);

export const WaveText: React.FC<FancyTextProps> = ({
  text,
  className = "",
}) => (
  <span className={`inline-block ${className}`}>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </span>
);

export const GlowText: React.FC<FancyTextProps> = ({
  text,
  className = "",
}) => (
  <motion.span
    initial={{ textShadow: "0 0 0px #fff" }}
    animate={{ textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff" }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    className={`inline-block ${className}`}
  >
    {text}
  </motion.span>
);

export const ScrambleText: React.FC<FancyTextProps> = ({
  text,
  className = "",
  duration = 2000,
  interval = 30,
}) => {
  const [scrambledText, setScrambledText] = React.useState("");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  React.useEffect(() => {
    let isMounted = true;
    const steps = Math.floor(duration / interval);

    const scramble = (progress: number) => {
      if (!isMounted) return;
      const newText = text
        .split("")
        .map((char, index) => {
          if (index < Math.floor(progress * text.length)) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setScrambledText(newText);
    };

    let step = 0;
    setScrambledText(" ".repeat(text.length)); // Start with spaces

    const animation = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      scramble(progress);

      if (step >= steps) {
        clearInterval(animation);
        if (isMounted) setScrambledText(text);
      }
    }, interval);

    return () => {
      isMounted = false;
      clearInterval(animation);
    };
  }, [text, duration, interval]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {scrambledText}
    </motion.span>
  );
};

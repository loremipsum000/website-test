"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

type AnimatedCardWrapperProps = {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  variants?: any;
};

export const AnimatedCardWrapper = ({
  children,
  className,
  wrapperClassName,
  variants,
}: AnimatedCardWrapperProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * 5;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * -5;

    cardRef.current.style.transform = isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
      : "none";
  };

  return (
    <motion.div
      variants={variants}
      ref={cardRef}
      className={cn(
        "relative transition-all duration-300 ease-out",
        wrapperClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (cardRef.current) {
          cardRef.current.style.transform = "none";
        }
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl",
          className
        )}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

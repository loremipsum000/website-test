"use client";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const shimmerVariants = cva(
  "absolute inset-0 -skew-x-12 group pointer-events-none",
  {
    variants: {
      variant: {
        default: "via-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ShimmerProps extends VariantProps<typeof shimmerVariants> {
  className?: string;
}

const ShimmerInner = ({ className, variant }: ShimmerProps) => {
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          setHovering(true);
        } else {
          setHovering(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (hovering) {
      setDirection("forward");
    } else {
      setDirection("backward");
    }
  }, [hovering]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(shimmerVariants({ variant }), className)}
      initial="hidden"
      animate={hovering || direction === "backward" ? "visible" : "hidden"}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent "
        variants={{
          hidden: { opacity: 0, x: direction === "forward" ? "100%" : "-100%" },
          visible: {
            opacity: 1,
            x: direction === "forward" ? "-100%" : "100%",
          },
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        key={direction}
      />
    </motion.div>
  );
};

export const Shimmer = (props: ShimmerProps) => {
  return <ShimmerInner {...props} />;
};

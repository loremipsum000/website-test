"use client";

import { cn } from "@/lib/utils";
import { motion, SVGMotionProps } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button, ButtonProps, buttonVariants } from "./button";

type CtaButtonProps = ButtonProps & {
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" {...props} />
);

export const CtaButton = ({ href, external, ...props }: CtaButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className={cn("flex items-center", buttonVariants({ variant: props.variant }), props.className)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      href={href ?? "#"}
      target={external ? "_blank" : "_self"}
    >
      {props.children}
      {props.variant === "secondary" && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={isHovered ? "hover" : "rest"}
          initial={false}
        >
          <Path
            variants={{
              rest: {
                opacity: 0,
                d: "m7 12 5 0",
              },
              hover: {
                opacity: 1,
                d: "m7 12 10 0",
              },
            }}
          />
          <Path
            variants={{
              rest: {
                d: "m9 7 5 5-5 5",
              },
              hover: {
                d: "m14 7 5 5-5 5",
              },
            }}
          />
        </motion.svg>
      )}
    </Link>
  );
};

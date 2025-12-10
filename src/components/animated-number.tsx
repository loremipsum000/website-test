"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function AnimatedNumber({
  value,
  prefix,
  postfix,
}: {
  value: number;
  prefix?: string;
  postfix?: string;
}) {
  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <div>
      {prefix} <motion.span>{display}</motion.span> {postfix}
    </div>
  );
}

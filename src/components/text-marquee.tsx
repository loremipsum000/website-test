import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type TextMarqueeProps = {
  text: string;
  speed?: number;
};

const TextMarquee = ({ text, speed = 50 }: TextMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const isOverflow = textWidth > containerWidth;
        setIsOverflowing(isOverflow);

        if (isOverflow) {
          const duration = textWidth / speed;
          setAnimationDuration(duration);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, speed]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden w-full ", {})}>
      <div
        className={`inline-flex whitespace-nowrap tracking-wider ${isOverflowing ? "animate-marquee" : ""}`}
        style={{
          animationDuration: `${animationDuration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <span className="" ref={textRef}>
          {text}
        </span>
        {isOverflowing && <span className="ml-[8px]">{text}</span>}
      </div>
    </div>
  );
};

export default TextMarquee;

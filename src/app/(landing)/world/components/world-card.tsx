"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";

export const WorldCard = ({
  children,
  leftImage,
  mobileImage,
  className,
  title,
  href,
}: {
  children: React.ReactNode;
  leftImage?: string;
  mobileImage?: string;
  className?: string;
  title?: string;
  href?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate position for gradient
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * 5;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * -5;

    cardRef.current.style.transform = isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
      : 'none';
  };

  return (
    <Link
      ref={cardRef}
      className={cn(
        "group grid grid-cols-1 sm:grid-cols-2 min-h-[20rem] rounded-2xl divide-x divide-sonic-black/15 relative overflow-hidden transition-all duration-300 ease-out",
        className
      )}
      target={href?.startsWith("http") ? "_blank" : "_self"}
      href={href ?? "#"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (cardRef.current) {
          cardRef.current.style.transform = 'none';
        }
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      {/* Mobile image */}
      {mobileImage && (
        <div className="absolute left-0 right-0 bottom-0 sm:hidden opacity-50">
          <img
            src={mobileImage}
            className="w-full h-auto object-contain rounded-2xl"
            alt={title}
          />
        </div>
      )}
      {/* Desktop left image */}
      <div className="relative hidden sm:flex items-center justify-center">
        <img src={leftImage} className="w-full h-auto rounded-l-2xl" alt={title} />
      </div>
      {/* Content */}
      <div className="flex flex-col items-center gap-y-4 sm:gap-y-6 text-center relative">
        {title && (
          <h4 className="sm:hidden text-h4 pb-4 mt-6 border-b border-sonic-black/10 w-full font-bold max-w-80 leading-9 text-foreground">
            {title}
          </h4>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:h-full">
          {children}
        </div>
      </div>
    </Link>
  );
};


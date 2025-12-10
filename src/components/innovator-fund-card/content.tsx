"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CtaButton } from "../cta-button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { SanityInnovatorFundCard } from ".";
import { useState, useRef } from "react";
import Image from "next/image";

export const InnovatorFundCardContent = ({
  prefix,
  postfix,
  dollarAmount,
  cta,
  partners,
  className,
}: SanityInnovatorFundCard & { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        className,
        "relative flex theme-light bg-background text-foreground w-full flex-col max-md:gap-y-8 rounded-3xl border border-shade-2 p-8 overflow-hidden transition-shadow duration-300",
        isHovered ? "shadow-xl" : "shadow-md"
      )}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 80%)",
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10">
        <div className="relative z-10 flex flex-col gap-y-4 ">
          <div className="flex flex-col gap-y-2 md:gap-y-6">
            <span className="text-h4 xl font-medium">{prefix}</span>
            <span className="leading-none text-h2 lg:text-h1 font-medium lg:self-center lg:text-center">
              <div className="flex items-start flex-wrap sm:hidden">
                {dollarAmount.split(",").map((v, i, o) => (
                  <span key={i}>
                    {v}
                    {i != o.length - 1 ? (
                      ","
                    ) : (
                      <span className="text-hero-2"> S</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="hidden sm:inline-block">{dollarAmount}</span>
              <span className="hidden sm:inline-block text-hero-2 ml-2">
                S
              </span>
            </span>
            <span className="text-h4 font-medium md:text-right">{postfix}</span>
          </div>
          <div className="md:absolute md:top-0 md:right-0 flex items-center justify-between">
            <div className="flex items-center gap-x-3 gap-y-3 flex-wrap">
              {partners.map((partner, i) => (
                <div
                  key={partner.name}
                  className="relative h-10 p-2 md:h-14 md:py-4 md:px-4 rounded-full border border-shade-2"
                >
                  <Image
                    src={urlFor(partner.logo).url() ?? ""}
                    alt={partner.name}
                    fill
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
              ))}
              <div className="h-10 p-2 md:h-14 md:py-4 md:px-4 rounded-full border border-shade-2">
                <span className="select-none h-6 inline-flex text-body-sm md:text-base text-nowrap">
                  + more
                </span>
              </div>
            </div>
          </div>
          <div className="md:absolute md:bottom-0 md:left-0">
            {cta && <CtaButton href={cta.url ?? "#"}>{cta.title}</CtaButton>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

"use client";

import Image from "next/image";
import { Body } from "@/components/ui/typography";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React, {
  forwardRef,
  useRef,
} from "react";

export type OnboardingStep = {
  title: string;
  description: string;
  video: string;
  fallbackImage?: string;
  href?: string;
};

export interface OnboardingCardHandle {
  play: () => void;
  pause: () => void;
}

interface OnboardingCardProps {
  index: number;
  step: OnboardingStep;
}

export const OnboardingCard = forwardRef<
  OnboardingCardHandle,
  OnboardingCardProps
>(({ index, step }, ref) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { amount: 0.8, once: true });
  const formattedIndex = `0${index + 1}`;

  const Wrapper = step.href ? Link : React.Fragment;
  const target = step.href
    ? {
      target: step.href.includes("http") ? "_blank" : undefined,
      rel: "noopener noreferrer",
    }
    : {};

  return (
    <Wrapper href={step.href ?? ""} {...target}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          scale: {
            duration: 0.1,
            ease: "easeIn",
          },
        }}
        className="border bg-card text-card-foreground rounded-2xl flex flex-col shadow-lg transition-colors duration-700"
      >
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-5xl font-bold text-muted-foreground transition-colors duration-700">
              {formattedIndex}
            </span>
          </div>
          <div className="relative overflow-hidden rounded-t-2xl">
            <Image
              src={step.fallbackImage ?? ""}
              alt={`${step.title} onboarding card`}
              className="scale-[1.02] w-full h-auto aspect-[857/304] object-cover"
              width={857}
              height={304}
            />
          </div>
        </div>
        <div className="flex flex-col pt-6 pb-4 px-4">
          <Body bold size="large" className="transition-colors duration-700">
            {step.title}
          </Body>
          <Body className="transition-colors duration-700">
            {step.description}
          </Body>
        </div>
      </motion.div>
    </Wrapper>
  );
});

OnboardingCard.displayName = "OnboardingCard";

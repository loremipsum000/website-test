"use client";

import { ApplePay } from "@/assets/icons/apple-pay";
import RDPCard from "@/assets/images/rdp-card";
import RdpLogo from "@/assets/images/rdp-logo";
import { AnimatedCardWrapper } from "@/components/animated-card-wrapper";
import { Button } from "@/components/button";
import { CtaButton } from "@/components/cta-button";
import { Shimmer } from "@/components/shimmer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { RDPBrandMarquee } from "../../(home)/components/rdp-brand-marquee";

type CardPageHeroProps = {
  title: string;
  tagline: string;
  cta: {
    title: string;
    url: string;
  };
  secondaryCta?: {
    title: string;
    url: string;
  };
  brandPartners: {
    name: string;
    logo: string;
  }[];
  onSignUpClick?: () => void;
};

export const CardPageHero = ({
  title,
  tagline,
  cta,
  secondaryCta,
  brandPartners,
  onSignUpClick,
}: CardPageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1, // Start text animations earlier
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="theme-dark bg-background text-foreground overflow-hidden relative"
    >
      <div className="container mx-auto px-4 py-8 sm:p-8 md:p-16 lg:pb-32 relative">
        <div className="flex flex-col md:flex-row justify-between lg:grid lg:grid-cols-2 lg:place-content-center gap-8 items-center relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-y-6 lg:gap-y-8 items-center md:items-start text-center md:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="font-medium text-h2 leading-none lg:text-h1 md:max-w-[24rem] lg:max-w-[34rem]"
            >
              {title}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="font-medium text-body-lg max-w-[24rem]"
            >
              {tagline}
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center gap-4"
              variants={itemVariants}
            >
              {cta && (
                <CtaButton variant="primary" href={cta.url} external={true}>
                  {cta.title}
                </CtaButton>
              )}
              <div className="flex items-center gap-x-4">
                <ApplePay className="h-5 md:h-6" mode="dark" />
                <Image 
                  src="/images/rdp/google-pay-white.svg" 
                  alt="Google Pay" 
                  width={60} 
                  height={24} 
                  className="h-5 md:h-6 w-auto"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:place-self-end flex flex-col items-center gap-y-4"
          >
            <AnimatedCardWrapper>
              <div className="relative overflow-hidden w-full h-auto md:w-[18rem] lg:w-[28rem] rounded-2xl">
                <RDPCard className="w-full h-full drop-shadow hover:drop-shadow-2xl [box-shadow:2.5px_2px_2px_0px_rgba(255,255,255,0.25)_inset,_-1px_-1px_1.5px_0px_rgba(0,0,0,0.36)_inset]" />
                <Shimmer />
              </div>
            </AnimatedCardWrapper>
            <div className="items-center gap-x-2 hidden md:flex">
              Powered by{" "}
              <Link href="https://pay.soniclabs.com" target="_blank">
                <RdpLogo className="w-auto h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0">
        <motion.div
          className={cn(
            "absolute inset-0",
            "before:absolute before:inset-0",
            "before:bg-[linear-gradient(135deg,#102D3C_0%,#214E81_25%,#214E81_55%,#ED5409_75%,#FFCB67_90%)]",
            "before:opacity-100",
            "after:absolute after:inset-0",
            "after:bg-gradient-to-tl after:from-transparent after:via-black/30 after:to-black",
            "after:via-25%"
          )}
        />
      </div>
      <div className="relative">
        <RDPBrandMarquee brandPartners={brandPartners} />
      </div>
    </section>
  );
};

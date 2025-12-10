"use client";
import { urlFor } from "@/sanity/lib/image";
import { SanityBoomCard } from ".";
import { CtaButton } from "../cta-button";
import { BoomBackground } from "@/assets/patterns/boom-background";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export const BoomCardContent = ({
  sonicLogo,
  tagline,
  boomIllustration,
  cta,
}: SanityBoomCard) => {
  return (
    <div className="relative overflow-hidden border rounded-2xl">
      <BoomBackground vignetteStrength={0.6} gradientOpacity={0.4} />{" "}
      <div className="relative p-4 lg:hidden flex flex-col items-start gap-y-6 ">
        <div className="flex flex-col items-start gap-y-1.5">
          <img
            src={urlFor(sonicLogo).url() ?? ""}
            alt="Sonic Logo"
            className="h-5"
          />
          <img
            src={urlFor(boomIllustration).url() ?? ""}
            alt="Boom Illustration"
            className="h-16"
          />
        </div>
        <div className="flex flex-col gap-y-3 max-w-48">
          <p className="text-body font-medium">{tagline}</p>
          <CtaButton href={cta.url ?? "#"}>{cta.title}</CtaButton>
        </div>
      </div>
      <div className="p-14 relative hidden lg:flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <img
              src={urlFor(sonicLogo).url() ?? ""}
              alt="Sonic Logo"
              className="h-20"
            />
            <p className="text-body-lg font-medium max-w-72">
              <span className="">{tagline}</span>
            </p>
          </div>
          <div>
            <CtaButton href={cta.url ?? "#"}>{cta.title}</CtaButton>
          </div>
        </div>
        <motion.img
          initial={{
            scale: 1,
            rotate: 0,
          }}
          whileHover={{
            scale: [1, 1.1, 1.05, 1.1, 1],
            rotate: [0, -3, 3, -3, 3, 0],
            transition: {
              duration: 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          src={urlFor(boomIllustration).url()}
          className="w-full h-auto"
          alt="SONIC BOOOOOOOM!"
        />
      </div>
    </div>
  );
};

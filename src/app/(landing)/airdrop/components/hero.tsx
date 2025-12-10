"use client";
import { AirdropIllustration } from "@/components/airdrop-illustration";
import { CtaButton } from "@/components/cta-button";
import { motion } from "framer-motion";

type HeroProps = {
  cta: {
    title: string;
    url: string;
  };
  secondaryCta: {
    title: string;
    url: string;
  };
};

export const Hero = ({ cta, secondaryCta }: HeroProps) => {
  return (
    <div className="container mx-auto flex flex-col items-center gap-y-8 relative py-8">
      <AirdropIllustration />
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2 mt-4">
        {cta && <CtaButton href={cta.url}>{cta.title}</CtaButton>}
        {secondaryCta && (
          <CtaButton
            className="max-sm:pl-6"
            variant="secondary"
            href={secondaryCta.url}
          >
            {secondaryCta.title}
          </CtaButton>
        )}
      </div>
    </div>
  );
};

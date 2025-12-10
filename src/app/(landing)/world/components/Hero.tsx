"use client";
import { CtaButton } from "@/components/cta-button";
import { motion } from "framer-motion";

type HomePageHeroProps = {
  title: string;
  tagline: string;
  cta: {
    title: string;
    url: string;
  };
  secondaryCta: {
    title: string;
    url: string;
  };
};

export const Hero = ({
  title,
  tagline,
  cta,
  secondaryCta,
}: HomePageHeroProps) => {
  return (
    <div className="container mx-auto font-urbanist leading-none z-20 relative flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-8 ">
        <div className="flex flex-col sm:gap-y-2 mx-auto max-w-xs md:max-w-2xl lg:max-w-2xl text-center">
          <motion.h1
            className="font-medium leading-none text-h1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          <motion.div
            className="mx-auto max-w-xs md:max-w-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-6 text-base sm:text-body-lg">{tagline}</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-4">
            {cta && (
              <CtaButton className="w-full sm:w-auto" href={cta.url ?? "#"}>
                {cta.title}
              </CtaButton>
            )}
            {secondaryCta && (
              <CtaButton
                href={secondaryCta.url ?? "#"}
                variant={"secondary"}
                className="w-full sm:w-auto pl-6 sm:pl-0"
              >
                {secondaryCta.title}
              </CtaButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

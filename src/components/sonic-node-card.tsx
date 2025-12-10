"use client";
import { motion, useInView } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { useRef } from "react";
import { CtaButton } from "./cta-button";
import { Spikes } from "./decorations";

type SonicNodeCardProps = {
  title: string;
  description: string;
  features: { title: string; description?: string }[];
  logos: { url: string; alt: string }[];
  cta: { title: string; url: string };
  secondaryCta: { title: string; url: string };
};

export const SonicNodeCard = ({
  title,
  description,
  features,
  logos,
  cta,
  secondaryCta,
}: SonicNodeCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: "some",
    once: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="grid md:grid-cols-2 rounded-2xl border border-shade-2 bg-background overflow-hidden">
      <div className="relative pt-16">
        <Spikes direction="down" className="absolute w-full top-0" />
        <div className="flex flex-col gap-y-6 h-full justify-end p-6">
          <div className="flex flex-col items-start gap-y-2 relative">
            <span className="text-h5 font-medium leading-snug">{title}</span>
            <p className="text-body-lg max-w-72">{description}</p>
          </div>
          {logos.length > 0 && (
            <div className="flex items-center gap-x-1 flex-wrap gap-1">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.url}
                  alt={logo.alt}
                  className="h-6 border rounded-full px-2 py-1"
                />
              ))}
              <div className="h-6 border rounded-full px-2 py-1 flex items-center justify-center text-body-sm font-medium">
                + more
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            {cta && <CtaButton href={cta.url}>{cta.title}</CtaButton>}
            {secondaryCta && (
              <CtaButton variant="secondary" href={secondaryCta.url}>
                {secondaryCta.title}
              </CtaButton>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center md:items-center border-t md:border-l">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col gap-y-2 p-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-x-6"
            >
              <CheckCheck className="w-8 h-8 text-green-600" />
              <div className="flex flex-col md:gap-y-1 py-2 w-full">
                <div className="text-body-lg font-medium">{feature.title}</div>
                {feature.description && (
                  <div className="opacity-80">{feature.description}</div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

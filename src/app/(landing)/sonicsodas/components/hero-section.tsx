"use client";
import { CtaButton } from "@/components/cta-button";
import { motion } from "framer-motion";
import React from "react";

type HeroSectionProps = {
  title: string;
  description: string;
  cta: {
    title: string;
    url: string;
  };
  secondaryCta: {
    title: string;
    url: string;
  };
  image: string;
};

export function HeroSection({
  title,
  description,
  cta,
  secondaryCta,
  image,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <motion.div
          className="w-full md:w-3/5 lg:w-3/5 order-2 md:order-1"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center md:items-start">
            <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
              <h1 className="text-h2 md:text-h2 lg:text-h1 leading-none text-center md:text-left font-pecita">
                {title.split("\\n").map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && (
                      <br className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </h1>
            </motion.div>
            <motion.p
              className="text-body-lg mb-6 sm:w-3/4 md:w-full md:mb-8 text-center md:text-left"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center md:justify-start"
              variants={itemVariants}
            >
              {cta && <CtaButton href={cta.url}>{cta.title}</CtaButton>}
              {secondaryCta && (
                <CtaButton
                  className="max-sm:ml-8"
                  href={secondaryCta.url}
                  variant="secondary"
                >
                  {secondaryCta.title}
                </CtaButton>
              )}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-end w-full md:w-1/2 lg:w-2/5 order-1 md:order-2"
          variants={imageVariants}
        >
          <img
            src={image}
            alt="Sonic & Sodas"
            className="w-32 sm:w-48 md:w-full h-auto mx-auto md:mx-0"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

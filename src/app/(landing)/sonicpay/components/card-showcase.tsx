"use client";

import { ApplePay } from "@/assets/icons/apple-pay";
import Image from "next/image";
import { Button } from "@/components/button";
import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CardTabs } from "./card-tabs";
import { SignUpForm } from "./signup-form";

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const PaymentIcons = () => (
  <div className="flex items-center gap-4">
    <ApplePay className="h-5 w-auto" />
    <Image 
      src="/images/rdp/google-pay.svg" 
      alt="Google Pay" 
      width={60} 
      height={24} 
      className="h-6 w-auto"
    />
  </div>
);

const TabContent = ({
  title,
  content,
  ctaText,
  ctaUrl,
  showPaymentIcons = true,
  disableCta = false,
}: {
  title: string;
  content: React.ReactNode;
  ctaText?: string;
  ctaUrl?: string;
  showPaymentIcons?: boolean;
  disableCta?: boolean;
}) => (
  <motion.div
    className="flex flex-col gap-4"
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{
      duration: 0.25,
      ease: [0.23, 1, 0.32, 1],
    }}
    variants={{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
      exit: { opacity: 0 },
    }}
  >
    <motion.h2
      variants={fadeInUp}
      transition={{
        duration: 0.25,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="text-h2 text-center md:text-left leading-tight md:leading-none font-semibold text-sonic-black"
    >
      {title}
    </motion.h2>
    <motion.div variants={fadeInUp}>{content}</motion.div>
    {(ctaText || ctaUrl) && (
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row items-center gap-4 md:justify-start justify-start sm:justify-center"
      >
        {!disableCta ? (
          <CtaButton size="lg" href={ctaUrl ?? "#"} variant="primary">
            {ctaText}
          </CtaButton>
        ) : (
          <Button variant="primary" disabled className="opacity-80">
            {ctaText}
          </Button>
        )}
        {showPaymentIcons && <PaymentIcons />}
      </motion.div>
    )}
  </motion.div>
);

export const CardShowcase = forwardRef<
  { scrollToSignUp: () => void },
  {
    virtualCard: any;
    physicalCard: any;
  }
>(function CardShowcase({ virtualCard, physicalCard }, ref) {
  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToSignUp: () => {
      setActiveTab("virtual");
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
  }));

  return (
    <div className="bg-[#FFF8F0] theme-light text-foreground overflow-hidden">
      <div className="container mx-auto">
        <div className="min-h-[800px] py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 relative">
            <div className="md:col-span-7 flex flex-col">
              <div className="flex">
                <CardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="mt-8 w-full" ref={containerRef}>
                <AnimatePresence mode="wait">
                  {activeTab === "virtual" ? (
                    <TabContent
                      key="virtual"
                      title={virtualCard.title}
                      content={
                        <div className="flex flex-col gap-4 items-center md:items-start">
                          <div className="text-center md:text-left text-body-lg text-sonic-black max-w-[30ch]">
                            {virtualCard.description}
                          </div>
                          <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                            <CtaButton
                              size="lg"
                              href="https://pay.soniclabs.com"
                              variant="primary"
                              external={true}
                            >
                              Order card
                            </CtaButton>
                            <div className="flex items-center gap-4">
                              <ApplePay className="h-5 w-auto" />
                              <Image 
                                src="/images/rdp/google-pay.svg" 
                                alt="Google Pay" 
                                width={60} 
                                height={24} 
                                className="h-6 w-auto"
                              />
                            </div>
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <TabContent
                      key="physical"
                      title={physicalCard.title}
                      content={
                        <div className="flex flex-col gap-4 items-center md:items-start">
                          <div className="text-center md:text-left text-body-lg text-sonic-black max-w-[30ch]">
                            {physicalCard.description}
                          </div>
                        </div>
                      }
                      ctaText={physicalCard.cta.title}
                      ctaUrl={physicalCard.cta.url}
                      showPaymentIcons={false}
                      disableCta={true}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="md:col-span-5 relative h-[300px] md:h-auto">
              <div className="h-full md:h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <img
                      src={
                        activeTab === "virtual"
                          ? "/images/rdp-mockup.png"
                          : "/images/rdp-cards-stacked.png"
                      }
                      alt={
                        activeTab === "virtual"
                          ? "Phone mockup"
                          : "Stacked cards"
                      }
                      className={cn(
                        "w-full object-contain",
                        activeTab === "virtual"
                          ? "h-[450px] max-md:mt-64"
                          : "h-[400px]"
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

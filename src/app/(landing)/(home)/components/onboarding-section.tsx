"use client";

import { LinesHorizontal } from "@/components/decorations";
import { Switch } from "@/components/ui/switch";
import { Body, H2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { OnboardingBackground } from "./onboarding-background";
import { OnboardingCard, OnboardingStep } from "./onboarding-card";

const userSteps: OnboardingStep[] = [
  {
    title: "Get Wallet",
    description:
      "Enjoy the best user experience on Sonic by using Rabby Wallet.",
    video: "/videos/onboarding/wallet.mp4",
    fallbackImage: "/images/onboarding/rabby.png",
    href: "https://rabby.io/",
  },
  {
    title: "Bridge",
    description:
      "Bridge from any network to Sonic.",
    video: "/videos/onboarding/bridge.mp4",
    fallbackImage: "/images/onboarding/bridge.png",
    href: "https://my.soniclabs.com/bridge",
  },
  {
    title: "Earn",
    description:
      "Immerse yourself in our ecosystem and earn points for the S token airdrop.",
    video: "/videos/onboarding/points.mp4",
    fallbackImage: "/images/onboarding/earn-points.png",
    href: "https://my.soniclabs.com/points",
  },
];

const developerSteps: OnboardingStep[] = [
  {
    title: "Build",
    description:
      "Transform your idea into reality on Sonic — explore our documentation.",
    video: "/videos/onboarding/build.mp4",
    fallbackImage: "/images/onboarding/build.png",
    href: "https://docs.soniclabs.com/",
  },
  {
    title: "Connect",
    description:
      "Join the Sonic Builders group on Telegram to connect and collaborate.",
    video: "/videos/onboarding/connect.mp4",
    fallbackImage: "/images/onboarding/connect.png",
    href: "https://t.me/SonicBuilders",
  },
  {
    title: "Earn",
    description:
      "With Fee Monetization, earn up to 90% of the fees your app generates.",
    video: "/videos/onboarding/earn.mp4",
    fallbackImage: "/images/onboarding/earn-feem.png",
    href: "https://docs.soniclabs.com/funding/fee-monetization",
  },
];

export const OnboardingSection = () => {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const labelClass = (isDeveloper: boolean) =>
    cn(
      "transition cursor-pointer active:scale-[0.99] active:translate-y-[1px]",
      {
        "text-muted-foreground": !isDeveloper,
        "text-foreground": isDeveloper,
      }
    );

  return (
    <section
      className={cn(
        "transition-colors duration-700 bg-background text-foreground py-20 relative overflow-hidden",
        {
          "theme-light": !isDeveloper,
          "theme-dark": isDeveloper,
        }
      )}
    >
      <div className="absolute inset-0">
        <div className="relative container mx-auto">
          <div className="absolute w-full top-0 opacity-50 [mask-image:linear-gradient(to_right,transparent,black_50%,black_50%,transparent)]">
            <LinesHorizontal className="w-full h-40" />
          </div>
        </div>
      </div>
      <OnboardingBackground />
      <div className="flex flex-col items-center gap-y-8 relative">
        <div className="container mx-auto flex flex-col gap-y-4 items-center">
          <H2 className="text-center max-w-[14ch] leading-none md:leading-tight">
            Getting started with Sonic
          </H2>
          <div className="w-full flex items-center mx-auto">
            <button
              className="flex-1 flex justify-end"
              onClick={() => setIsDeveloper(false)}
            >
              <Body semibold size="large" className={labelClass(!isDeveloper)}>
                I{"'"}m a user
              </Body>
            </button>
            <Switch
              size="lg"
              indeterminate
              checked={isDeveloper}
              onCheckedChange={() => setIsDeveloper(!isDeveloper)}
              className="mx-4"
            />
            <button
              className="flex-1 flex justify-start"
              onClick={() => setIsDeveloper(true)}
            >
              <Body semibold size="large" className={labelClass(isDeveloper)}>
                I{"'"}m a builder
              </Body>
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={isDeveloper ? "developer" : "user"}
              initial={{
                opacity: 0,
                y: -20,
                x: isDeveloper ? 20 : -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
                x: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-1 gap-4 max-w-xl mx-auto"
            >
              {(isDeveloper ? developerSteps : userSteps).map((step, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isDeveloper ? -20 : 20,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <OnboardingCard index={index} step={step} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

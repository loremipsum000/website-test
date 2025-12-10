"use client";

import { useRef } from "react";
import { CardPageHero } from "./card-page-hero";
import { CardShowcase } from "./card-showcase";

export function CardPageContent({
  heroSection,
  virtualCardSection,
  physicalCardSection,
  brandPartners,
}: {
  heroSection: any;
  virtualCardSection: any;
  physicalCardSection: any;
  brandPartners: any;
}) {
  const showcaseRef = useRef<{ scrollToSignUp: () => void }>(null);

  const handleSignUpClick = () => {
    showcaseRef.current?.scrollToSignUp();
  };

  return (
    <>
      <div>
        <CardPageHero
          title={heroSection.title}
          tagline={heroSection.subtitle}
          cta={{
            title: "Order card",
            url: "https://pay.soniclabs.com",
          }}
          brandPartners={brandPartners}
          onSignUpClick={handleSignUpClick}
        />
      </div>
      <CardShowcase
        ref={showcaseRef}
        virtualCard={virtualCardSection}
        physicalCard={physicalCardSection}
      />
    </>
  );
}

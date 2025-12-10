import Image from "next/image";
import { Spikes } from "@/components/decorations";
import { FadeTag } from "@/components/fade-tag";
import { HighlightSection } from "@/components/highlight-section";
import { NetworkStatsCard } from "@/components/network-stats-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { HeroSection } from "@/components/section-hero";
import { SectionSeparator } from "@/components/ui/separator";
import { sanityFetch } from "@/sanity/lib/client";
import { getHomePage, getNavBanner } from "@/sanity/lib/queries";
import { BookmarkIcon } from "lucide-react";
import { cache } from "react";
import { SanityImageAsset } from "../../../../sanity.types";
import { AppShowcaseMarquee } from "./components/app-showcase-marquee";
import { MainnetHero } from "./components/mainnet-hero";
import { OnboardingSection } from "./components/onboarding-section";
import { FeatureColumn } from "./components/sonic-stack-section";
import { SonicStackTag } from "./components/sonic-stack-tag";
import { getMetadata } from "@/lib/seo";
import { BuyButton } from "@/components/buy-button";

const getPageData = cache(
  async () => (await sanityFetch({ query: getHomePage })) as any
);

const getNavBannerData = cache(
  async () => (await sanityFetch({ query: getNavBanner })) as any
);

export const metadata = await getMetadata("home");

export default async function HomePage() {
  const homePage = await getPageData();

  return (
    <main className="theme-light bg-background text-foreground flex flex-col">
      <MainnetHero />
      <OnboardingSection />
      <AppShowcaseMarquee
        caption={homePage.appShowcase.caption}
        apps={homePage.appShowcase.apps}
      />
      <div className="theme-dark relative bg-background text-foreground overflow-hidden flex flex-col gap-y-12 md:gap-y-24 lg:gap-y-32 py-32 theme-dark">
        <Spikes
          direction="down"
          className="absolute top-0 left-0 w-full h-64"
        />
        <HeroSection
          topline={<SonicStackTag />}
          title="Tailor-made for blockchain"
          subtitle="Sonic offers unprecedented scalability and storage to developers, and a swift, streamlined experience for users."
        />
        <SectionSeparator />
        <HighlightSection
          title="Earn 90% of your app's fees on Sonic."
          subtitle="With Fee Monetization, developers earn by building apps that boost on-chain traffic."
          cta={{
            title: "Learn more",
            url: "https://docs.soniclabs.com/funding/fee-monetization",
          }}
          rightContent={
            <div className="w-full flex items-center justify-center md:justify-end">
              <Image
                className="hidden md:block"
                src="/images/feem.svg"
                alt="Fee Monetization"
                width={378}
                height={487}
              />
              <Image
                className="block md:hidden"
                src="/images/feem-mobile.svg"
                alt="Fee Monetization"
                width={358}
                height={282}
              />
            </div>
          }
        />
        <SectionSeparator />
        <HighlightSection
          title="Real sub-second confirmation times"
          subtitle="Sonic is the fastest settlement layer for digital assets with over 400k TPS."
          rightContent={
            <NetworkStatsCard stats={homePage.networkStatsSection.stats} />
          }
        />
        <SectionSeparator />
        <section className="container mx-auto">
          <dl className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
            {homePage.sonicStackSection.features?.map(
              (
                feature: {
                  icon: SanityImageAsset;
                  title: string;
                  url: string;
                  bulletPoints: string[];
                  showAuditPartners: boolean;
                  auditPartners: {
                    name: string;
                    logo: SanityImageAsset;
                    url: string;
                  }[];
                },
                i: number
              ) => <FeatureColumn key={feature.title} feature={feature} index={i} />
            )}
          </dl>
        </section>
        <NewsletterCta
          topLine={
            <FadeTag rounded="xl" padding="lg">
              <BookmarkIcon className="w-4 h-4" />
              <span className="font-semibold">Stay up to date!</span>
            </FadeTag>
          }
        />
      </div>
    </main>
  );
}

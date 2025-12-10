import { CtaButton } from "@/components/cta-button";
import { LinesHorizontal } from "@/components/decorations";
import { NewsletterCta } from "@/components/newsletter-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { World } from "@/components/world";
import { sanityFetch } from "@/sanity/lib/client";
import { getCardPage as CardPageQuery } from "@/sanity/lib/queries";
import {
  PortableText,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { cache } from "react";
import { CardFeatures } from "./components/card-features";
import { CardPageContent } from "./components/card-page-content";
import Image from "next/image";
import { ApplePay } from "@/assets/icons/apple-pay";

// Override metadata with custom title and description
export const metadata = {
  title: "Sonic Pay | Spend Crypto Anywhere",
  description:
    "Experience spending with Sonic Pay. Use your USDC.e to pay effortlessly online or at any POS terminal.",
};

const components = {
  list: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside">{children}</ul>
  ),
  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<{
      _type: "url";
      blank: boolean;
      href: string;
    }>) => {
      if (!value) return null;
      const { blank, href } = value;
      return blank ? (
        <a
          className="underline text-hero-3"
          href={href}
          target="_blank"
          rel="noopener"
        >
          {children}
        </a>
      ) : (
        <a className="underline text-hero-3" href={href}>
          {children}
        </a>
      );
    },
  },
};

const getCardPage = cache(
  async () => (await sanityFetch({ query: CardPageQuery })) as any
);

export default async function SonicPayPage() {
  const cardPage = await getCardPage();
  const {
    heroSection,
    physicalCardSection,
    virtualCardSection,
    globalCoverageSection,
    faqSection,
    brandPartners,
  } = cardPage;

  return (
    <div className="flex-1 flex-col theme-dark bg-background text-foreground">
      {/* -- Existing content sections for hero, etc. -- */}
      <CardPageContent
        heroSection={heroSection}
        virtualCardSection={virtualCardSection}
        physicalCardSection={physicalCardSection}
        brandPartners={brandPartners}
      />

      {/* -- MAIN: The dotted world map background with heading & feature cards -- */}
      <div className="relative py-12 md:py-16">
        <div className="container mx-auto relative">
          {/* Heading & subtitle */}
          <div className="flex flex-col gap-y-3 mb-8 md:mb-14">
            <h3 className="text-h3 text-center leading-tight md:leading-none max-w-[90%] md:max-w-4xl mx-auto font-medium">
              {globalCoverageSection.title}
            </h3>
            <p className="text-body-lg max-w-[90%] sm:max-w-[24rem] text-center font-medium mx-auto">
              {globalCoverageSection.subtitle}
            </p>
            <div className="flex justify-center mt-4 md:mt-5">
              <CtaButton
                href={globalCoverageSection?.cta?.url || "https://pay.soniclabs.com"}
                variant="primary"
                external={true}
              >
                Learn more
              </CtaButton>
            </div>
          </div>
          
          {/* Feature cards with map background */}
          <div className="relative">
            {/* Background map - sized to match reference but not cut off at top */}
            <div className="absolute inset-x-0 top-0 h-[500px] sm:h-[600px] md:h-[700px] overflow-visible flex justify-center pointer-events-none">
              <div className="relative w-[200%] sm:w-[190%] md:w-[200%] max-w-none">
                <div className="absolute inset-0 top-0">
                  <World className="w-full h-full" />
                </div>
              </div>
            </div>
            
            {/* Add spacing below for proper map display */}
            <div className="relative z-10 py-4 mb-16 sm:mb-20 md:mb-24">
              <CardFeatures features={globalCoverageSection.features} />
            </div>
          </div>
        </div>

        {/* -- Spend Your Crypto section with POS image -- */}
        <div className="container mx-auto pt-24 sm:pt-30 md:pt-40 lg:pt-52 pb-16 md:pb-32 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Image on the left */}
            <div className="w-full md:w-1/2 flex items-center justify-center pb-6 md:pb-0">
              <Image
                src="/images/rdp/Sonic-pay-Pos-terminal.jpg"
                alt="Sonic Pay POS Terminal"
                width={856}
                height={1024}
                className="rounded-lg shadow-lg w-[80%] max-w-[320px] md:w-[70%] md:max-w-[380px] h-auto object-contain"
                priority
              />
            </div>
            {/* Text on the right */}
            <div className="w-full md:w-1/2 flex flex-col gap-y-3 md:gap-y-4 text-center md:text-left">
              <div className="flex items-center gap-x-4 justify-center md:justify-start">
                <ApplePay className="h-5 w-auto" mode="dark" />
                <Image 
                  src="/images/rdp/google-pay-white.svg" 
                  alt="Google Pay" 
                  width={60} 
                  height={24} 
                  className="h-5 w-auto"
                />
              </div>
              <div className="space-y-1 mt-2">
                <h4 className="text-2xl md:text-h4 font-medium">Spend Crypto Anywhere</h4>
              </div>
              <p className="text-sm md:text-body-lg max-w-md mx-auto md:mx-0">
                Experience spending with <span className="font-semibold">Sonic Pay</span>. Use
                your USDC.e to pay effortlessly online or at any POS
                terminal—fast, secure, and with near-zero fees. Powered by the
                Sonic.
              </p>
              <div className="mt-4 md:mt-5">
                <CtaButton
                  href="https://pay.soniclabs.com"
                  variant="primary"
                  external={true}
                  className="rounded-full bg-[#4A4A4A] hover:bg-[#5D5D5D]"
                >
                  Start using
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- FAQ Section -- */}
      <section className="relative">
        <div className="flex flex-col items-center container mx-auto mt-24 md:mt-32 px-4">
          <h3 className="text-h3 font-medium">{faqSection.title}</h3>
          <div className="flex flex-col w-full mt-16">
            <Accordion type="single" collapsible>
              {faqSection.questions?.map((item: any, i: number) => (
                <AccordionItem
                  key={i}
                  className="border-shade-2"
                  value={`item-${i}`}
                >
                  <AccordionTrigger className="text-left text-body-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-lg my-4 flex flex-col gap-y-4">
                    <PortableText value={item.answer} components={components} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* -- Newsletter CTA at bottom -- */}
      <section className="container mx-auto py-16 md:py-24 relative z-10 px-4">
        <NewsletterCta />
      </section>

      {/* -- Decorative lines at the very bottom -- */}
      <section className="relative pt-12">
        <LinesHorizontal
          className="absolute bottom-0 left-0 right-0 z-0"
          direction="up"
        />
      </section>
    </div>
  );
}

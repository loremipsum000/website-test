import { BoomCard } from "@/components/boom-card";
import { CtaButton } from "@/components/cta-button";
import { LinesHorizontal, Spikes } from "@/components/decorations";
import { InnovatorFundCard } from "@/components/innovator-fund-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { SimpleCard } from "@/components/simple-card";
import { getMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getDeveloperResourcesPage } from "@/sanity/lib/queries";
import { cache } from "react";

const getPageData = cache(
  async () => (await sanityFetch({ query: getDeveloperResourcesPage })) as any
);

export const metadata = await getMetadata("developer-resources");


export default async function DeveloperResourcesPage() {
  const data = await getPageData();

  return (
    <main className="flex-1 theme-dark text-foreground bg-background relative flex flex-col gap-y-12 md:gap-y-24 lg:gap-y-32">
      <LinesHorizontal className="h-32 absolute top-0" />
      <section>
        <div className="relative mt-20 md:mt-16 z-10 container mx-auto flex flex-col gap-y-8 md:gap-y-16">
          <div className="flex flex-col gap-y-8">
            <h1 className="text-h1 font-medium">{data.title}</h1>
            <p className="max-w-xl text-body-lg font-medium">{data.tagline}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.quickstartCards?.map((card: any, i: number) => (
              <SimpleCard
                key={i}
                title={card.title}
                description={card.description}
                image={urlFor(card.image).url() as string}
                cta={card.cta}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="relative -mt-16 md:-mt-32">
        <Spikes
          direction="down"
          className="absolute top-0 w-full -mt-16 h32 md:h-48"
        />
      </div>
      <section className="theme-dark">
        <div className="relative container mx-auto flex flex-col gap-y-8">
          <h3 className="text-h3 font-medium">Innovator Fund</h3>
          <InnovatorFundCard />
        </div>
      </section>
      <section>
        <div className="container mx-auto">
          <BoomCard />
        </div>
      </section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 border rounded-2xl p-4 lg:p-8 gap-4">
          <div className="flex flex-col justify-end">
            <span className="text-body-lg lg:text-[4rem] font-medium">
              Up To
            </span>
            <span className="text-h1 lg:text-[14rem] leading-none font-semibold">
              90%
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="text-h5 leading-tight">
              We offer builders up to{" "}
              <span className="text-transparent bg-gradient-to-r from-[#ED5409] to-[#FFCB67] bg-clip-text">
                90% of the fees
              </span>{" "}
              their apps generate, rewarding traffic they bring to Sonic.
            </div>
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4">
              <CtaButton
                external
                href={"https://docs.soniclabs.com/funding/fee-monetization"}
              >
                Learn more
              </CtaButton>
            </div>
          </div>
        </div>
        <div className="relative max-sm:mx-4 justify-center flex sm:w-64 max-lg:mx-auto lg:ml-4">
          <svg
            className="absolute w-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 368 48"
          >
            <defs>
              <linearGradient id="bgGradient">
                <stop offset="0%" stop-color="#102D3C" />
                <stop offset="20%" stop-color="#214E81" />
                <stop offset="50%" stop-color="#506179" />
                <stop offset="80%" stop-color="#ED5409" />
                <stop offset="100%" stop-color="#FFCB67" />
              </linearGradient>
              <mask id="gas-monetization-mask">
                <path
                  fill="white"
                  d="M23.9922 0H343.992V32C343.992 40.8366 336.829 48 327.992 48H39.9922C31.1556 48 23.9922 40.8366 23.9922 32V0Z"
                />
                <path
                  fill="white"
                  d="M23.9922 24C23.9922 10.7477 13.2512 0.00427246 0 0H24V24H23.9922Z"
                />
                <path
                  fill="white"
                  d="M344 24H343.992V0H367.992C354.741 0.0042212 344 10.7478 344 24Z"
                />
              </mask>
            </defs>
            <rect
              width="368"
              height="48"
              fill="url(#bgGradient)"
              mask="url(#gas-monetization-mask)"
            ></rect>
          </svg>
          <div className="text-sonic-black text-body font-semibold relative flex items-center justify-center pt-1">
            Fee Monetization
          </div>
        </div>
      </div>
      <section className="z-10 relative pb-64">
        <div className="container mx-auto">
          <NewsletterCta />
        </div>
      </section>
      <LinesHorizontal direction="up" className="h-40 absolute bottom-0" />
    </main>
  );
}

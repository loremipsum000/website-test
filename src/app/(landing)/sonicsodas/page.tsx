import { CtaButton } from "@/components/cta-button";
import { LinesHorizontal, Spikes } from "@/components/decorations";
import { EventCard } from "@/components/event-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { World } from "@/components/world";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getSodasPage } from "@/sanity/lib/queries";
import { cache } from "react";
import { AnimatedStepper } from "./components/animated-stepper";
import { HeroSection } from "./components/hero-section";
import { getMetadata } from "@/lib/seo";

const getPageData = cache(
  async () => (await sanityFetch({ query: getSodasPage })) as any
);

export const metadata = await getMetadata("sonicsodas");

export default async function SodasPage() {
  const data = await getPageData();

  const { heroSection, howItWorksSection, upcomingEventsSection } = data;

  return (
    <main className="flex-1 theme-dark text-foreground bg-background relative flex flex-col gap-y-16 sm:gap-y-32 md:pt-24">
      <HeroSection
        title={heroSection.title}
        description={heroSection.description}
        cta={heroSection.cta}
        secondaryCta={heroSection.secondaryCta}
        image={urlFor(heroSection.image).url()}
      />

      <div className="relative">
        <Spikes direction="down" className="absolute top-0 left-0 w-full" />
        <section className="container mx-auto mt-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:gap-x-8 lg:gap-x-36">
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-h4  font-medium text-center sm:text-left">
                {howItWorksSection.title}
              </h2>
              <p className="text-body md:w-full md:text-body-lg text-center sm:text-left">
                {howItWorksSection.description}
              </p>
              {howItWorksSection.termsAndConditionsUrl && (
                <CtaButton
                  external
                  variant="secondary"
                  href={howItWorksSection.termsAndConditionsUrl}
                >
                  Terms and Conditions
                </CtaButton>
              )}
            </div>

            <div className="flex flex-col lg:place-self-end lg:items-end md:w-4/5 lg:w-full">
              <AnimatedStepper
                steps={howItWorksSection.steps}
                currentStep={0}
              />
            </div>
          </div>
        </section>
      </div>
      <section className="container mx-auto">
        <World className="w-full" />
      </section>
      {upcomingEventsSection?.events?.length > 0 && (
        <section className="mt-16 md:mt-24 container mx-auto max-w-4xl flex flex-col gap-y-12">
          <h2 className="text-h3 sm:text-h5 font-medium text-center">
            Upcoming Events
          </h2>
          {upcomingEventsSection.events?.map((event: any) => (
            <EventCard
              key={event._id}
              image={urlFor(event.image).url()}
              title={event.title}
              description={event.shortDescription}
              time={event.time}
              location={event.location}
              link={event.link}
            />
          ))}
        </section>
      )}

      <section className="container mx-auto relative z-10 mb-48 md:mb-64">
        <NewsletterCta />
      </section>

      <div className="absolute bottom-0 w-full">
        <LinesHorizontal
          direction="up"
          className="absolute bottom-0 w-full h-36"
        />
      </div>
    </main>
  );
}

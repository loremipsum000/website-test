import { Button } from "@/components/button";
import ContactForm from "@/components/contact-form";
import { Spikes } from "@/components/decorations";
import { NewsletterCta } from "@/components/newsletter-cta";
import { SimpleCard } from "@/components/simple-card";
import { getMetadata } from "@/lib/seo";
import { generateMetadataFromSeo } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getGetInTouchPage } from "@/sanity/lib/queries";
import { cache } from "react";

const getPageData = cache(
  async () => (await sanityFetch({ query: getGetInTouchPage })) as any
);

export const metadata = await getMetadata("contact");


export default async function ContactPage() {
  const data = await getPageData();

  const { contactSection, quickstartSection } = data;

  return (
    <main className="flex-1 flex flex-col theme-light bg-background relative text-foreground gap-y-12 md:gap-y-24 lg:gap-y-32">
      <Spikes
        direction="down"
        className="absolute w-full h-24 sm:h-32 md:h-56 top-0"
      />
      <section className="relative pt-20">
        <div className="relative container mx-auto grid lg:grid-cols-2 gap-8 lg:place-items-center">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-h1 font-medium">{contactSection.title}</h1>
            <p className="text-body-lg max-w-sm font-medium">
              {contactSection.description}
            </p>
          </div>
          <div className="w-full">
            <ContactForm
              title={contactSection.contactForm.title}
              topics={contactSection.contactForm.topics}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto grid gap-4 md:grid-cols-2">
          {quickstartSection.cards.map((card: any, i: number) => (
            <SimpleCard
              key={i}
              title={card.title}
              description={card.description}
              image={urlFor(card.image).url() as string}
              cta={card.cta}
            />
          ))}
        </div>
      </section>
      <section className="relative pb-32">
        <div className="z-10 relative container mx-auto">
          <NewsletterCta />
        </div>
      </section>
      <Spikes
        direction="up"
        className="absolute w-full h-24 sm:h-32 md:h-56 bottom-0"
      />
    </main>
  );
}

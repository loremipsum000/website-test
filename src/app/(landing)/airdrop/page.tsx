import { BoomBackground } from "@/assets/patterns/boom-background";
import { sanityFetch } from "@/sanity/lib/client";
import { getAirdropPage } from "@/sanity/lib/queries";
import { cache } from "react";
import { AirdropAmount } from "./components/airdrop-amount";
import { Hero } from "./components/hero";
import { Stepper } from "./components/stepper";
import { getMetadata } from "@/lib/seo";

const getPageData = cache(
  async () => (await sanityFetch({ query: getAirdropPage })) as any
);

export const metadata = await getMetadata("airdrop");

export default async function AirdropPage() {
  const pageData = await getPageData();

  return (
    <main className="flex-1 theme-dark bg-background text-foreground relative pb-12 md:pb-24 flex flex-col gap-y-4 md:gap-y-12">
      <div className="relative pt-12 pb-12 md:pb-24 rounded-b-3xl overflow-hidden">
        <BoomBackground className="absolute inset-0" />
        <section className="container mx-auto">
          <Hero cta={pageData.cta} secondaryCta={pageData.secondaryCta} />
        </section>
        <section className="container mx-auto">
          <AirdropAmount
            kicker={pageData.prizeCard.kicker}
            amount={pageData.prizeCard.tokenAmount}
            defillamaId={pageData.prizeCard.tokenDefillamaId}
            tokenSymbol={pageData.prizeCard.tokenSymbol}
          />
        </section>
      </div>
      <section className="relative container mx-auto pt-12 pb-12">
        <div className="mx-auto max-w-4xl">
          <Stepper steps={pageData.stepper.steps} />
        </div>
      </section>
    </main>
  );
}

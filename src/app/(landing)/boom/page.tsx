import { BoomBackground } from "@/assets/patterns/boom-background";
import { BountyBrowser } from "@/components/bounty-browser";
import { Button } from "@/components/button";
import { LinesHorizontal } from "@/components/decorations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getBoomPage as BoomPageQuery } from "@/sanity/lib/queries";
import {
  PortableText,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cache } from "react";
import { TotalPrize } from "./components/total-prize";
import { getMetadata } from "@/lib/seo";
import Image from "next/image";

const getBoomPage = cache(
  async () => (await sanityFetch({ query: BoomPageQuery })) as any
);

export const metadata = await getMetadata("boom", {
  robots: {
    index: false,
  }
});

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

export default async function BoomPage() {
  const boomPage = await getBoomPage();

  return (
    <div className="flex-1 theme-dark text-foreground bg-background">
      <div className="relative rounded-b-3xl overflow-hidden">
        <BoomBackground />
        <div className="container mx-auto pt-24 pb-16 md:pb-24 relative mb-16 md:eb-24">
          <div className="flex flex-col gap-y-24">
            <div className="flex flex-col items-center gap-y-8">
              <img
                className="w-full h-auto"
                src={urlFor(boomPage.hero.image).url()}
                alt=""
              />
              <p className="text-body-lg text-center max-w-2xl">
                {boomPage.hero.description}
              </p>
              <div className="text-body-lg text-center max-w-2xl flex flex-col sm:flex-row gap-x-2 gap-y-1 items-center">
                <AlertTriangle className="w-6 h-6" />
                <p>Sonic Boom has concluded.</p>
                <Link
                  className="underline text-hero-2"
                  href="https://docs.soniclabs.com/funding/airdrop/sonic-boom/winners"
                  target="_blank"
                >
                  Check out the winners here
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-24 md:-mt-24 mx-auto container">
        <div className="shadow-lg bg-gradient-sonic-mirrored animate-gradient relative rounded-3xl h-32 md:h-48 flex">
          <div className="flex-1 m-0.5 bg-background rounded-3xl flex flex-col xl:flex-row items-center justify-center text-center break-words gap-x-6 gap-y-2">
            <span className="text-h5 font-medium">Up to</span>
            <span className="text-h3 sm:text-h2 font-medium">
              <TotalPrize fantomAmount={boomPage?.prizeCard?.fantomAmount} />
            </span>
          </div>
        </div>
      </div>
      <div className="items-center justify-center flex mt-6">
        <span className="font-body-lg text-shade-2">
          *{" "}
          {Intl.NumberFormat(["en-US"], { maximumFractionDigits: 0 }).format(
            boomPage?.prizeCard?.fantomAmount
          )}{" "}
          FTM
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-8 container mx-auto mt-16">
        {boomPage.cards?.map((card: any, i: number) => (
          <div
            key={i}
            className="rounded-2xl p-8 border border-shade-2 flex flex-col items-start gap-y-8"
          >
            <div className="relative">
              <Image
                className="h-32"
                src={urlFor(card.image).url()}
                alt={card.title}
                fill
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <h6 className="text-h6 font-bold">{card.title}</h6>
              <p className="text-body-lg max-w-md">{card.description}</p>
            </div>
            <div className="flex-1 flex items-end">
              {card.cta && (
                <Link target="_blank" href={card.cta.url ?? ""}>
                  <Button>{card.cta.title}</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 md:mt-32 container mx-auto flex flex-col gap-y-8">
        <h3 className="text-h3 font-medium">Rankings</h3>
        <div className="grid lg:grid-cols-3 gap-4">
          {boomPage?.rankingCards?.map((card: any, key: number) => (
            <div
              key={key}
              className="rounded-2xl p-8 border border-shade-2 flex items-start gap-y-8 gap-x-4 relative"
            >
              <div className="w-24 h-24">
                <img className="h-24" src={urlFor(card.image).url()} alt="" />
              </div>
              <div className="flex flex-col gap-y-4 relative">
                <h6 className="text-h6 font-bold">{card.title}</h6>
                <p className="text-body max-w-64">{card.description}</p>
                <div className="absolute text-transparent px-4 bg-gradient-sonic-mirrored font-semibold text-body-sm animate-gradient rounded-full leading-tight top-0 right-0 blur-sm">
                  {card.indicator}
                </div>
                <div className="absolute px-4 bg-gradient-sonic-mirrored font-semibold text-body-sm animate-gradient rounded-full leading-tight top-0 right-0">
                  {card.indicator}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 md:mt-32 container mx-auto grid lg:grid-cols-2 gap-8 gap-y-16 place-items-center justify-items-start">
        <div className="flex flex-col gap-y-8 items-start">
          <h3 className="text-h3 font-medium">
            {boomPage.bountySection.title}
          </h3>
          <p className="text-body-lg max-w-md">
            {boomPage.bountySection.description}
          </p>
        </div>
        <BountyBrowser
          variant="compact"
          contentWrapperClasses={
            "flex-1 max-lg:max-h-96 lg:h-96 overflow-y-scroll"
          }
          bounties={boomPage.bountySection.bounties}
        />
      </div>
      <div className="mt-16 md:mt-32 container mx-auto flex flex-col gap-y-8">
        <h3 className="text-h3 font-medium">Earn a bonus!</h3>
        <div className="grid lg:grid-cols-3 gap-8">
          {boomPage?.bonusCards?.map((card: any, key: number) => (
            <div
              key={key}
              className="flex bg-gradient-sonic-mirrored animate-gradient rounded-2xl relative"
            >
              <div className="h-full w-full top-0 left-0 absolute bg-gradient-sonic-mirrored animate-gradient rounded-2xl blur" />
              <div className="flex-1 rounded-2xl p-8 m-0.5 bg-background flex items-start gap-y-8 gap-x-4 relative">
                <div className="relative w-12 h-12">
                  <Image
                    src={urlFor(card.image).url()}
                    alt={card.title}
                    fill
                    objectFit="contain"
                  />
                </div>
                <div className="flex flex-col gap-y-4 relative">
                  <h6 className="text-h6 font-bold">{card.title}</h6>
                  <p className="text-body max-w-md">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center container mx-auto mt-16 md:mt-32">
        <h3 className="text-h3 font-medium">FAQ</h3>
        <div className="flex flex-col w-full mt-16">
          {boomPage.faq.map((item: any, i: number) => (
            <Accordion key={item.question} type="single" collapsible>
              <AccordionItem className="border-shade-2" value="item-1">
                <AccordionTrigger className="text-left text-body-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-body-lg my-4 flex flex-col gap-y-4">
                  <PortableText value={item.answer} components={components} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="relative mt-96">
        <LinesHorizontal className="w-full absolute bottom-0" direction="up" />
      </div>
    </div>
  );
}

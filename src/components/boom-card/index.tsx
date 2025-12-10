import { sanityFetch } from "@/sanity/lib/client";
import { getBoomCard } from "@/sanity/lib/queries";
import { createElement } from "react";
import { SanityImageAsset } from "../../../sanity.types";
import { BoomCardContent } from "./content";

export type SanityBoomCard = {
  sonicLogo: SanityImageAsset;
  tagline: string;
  boomIllustration: SanityImageAsset;
  cta: {
    title: string;
    url: string;
  };
};

export const BoomCard = async () => {
  const data = (await sanityFetch({
    query: getBoomCard,
  })) as SanityBoomCard;

  if (!data) {
    throw new Error("No data found for the innovator fund card");
  }

  return createElement(BoomCardContent, { ...data });
};

import { sanityFetch } from "@/sanity/lib/client";
import { getInnovatorFundCard } from "@/sanity/lib/queries";
import { createElement } from "react";
import { InnovatorFundCardContent } from "./content";
import { SanityImageAsset } from "../../../sanity.types";
import { cn } from "@/lib/utils";

export type SanityInnovatorFundCard = {
  prefix: string;
  postfix: string;
  dollarAmount: string;
  cta: {
    title: string;
    url: string;
  };
  partners: {
    name: string;
    logo: SanityImageAsset;
  }[];
};

export const InnovatorFundCard = async ({
  className,
}: {
  className?: string;
}) => {
  const data = (await sanityFetch({
    query: getInnovatorFundCard,
  })) as SanityInnovatorFundCard;

  if (!data) {
    throw new Error("No data found for the innovator fund card");
  }

  return createElement(InnovatorFundCardContent, {
    ...data,
  });
};

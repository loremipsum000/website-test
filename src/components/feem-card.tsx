"use client";
import { CtaButton } from "./cta-button";

type SonicNodeCardProps = {
  title: string;
  description: string;
  cta: { title: string; url: string };
  imageUrl: string;
};

export const FeeMCard = ({
  title,
  description,
  cta,
  imageUrl,
}: SonicNodeCardProps) => {
  return (
    <div className="grid md:grid-cols-2 place-content-center rounded-2xl border border-shade-2 bg-background overflow-hidden">
      <div className="flex justify-center md:items-center border-b md:border-b-0 md:border-l order-first md:order-last">
        <img
          src={imageUrl}
          alt="feem"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative p-6 my-auto flex flex-col gap-y-2 sm:gap-y-6 order-last md:order-first">
        <div className="shrink flex flex-col justify-center">
          <h4 className="text-4xl sm:text-5xl md:text-6xl leading-tight md:leading-[1.15] text-sonic-black font-semibold">
            {title}
          </h4>
          <p className="mt-6 text-sonic-black max-w-md text-xl">
            {description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          {cta && <CtaButton href={cta.url ?? "#"}>{cta.title}</CtaButton>}
        </div>
      </div>
    </div>
  );
};

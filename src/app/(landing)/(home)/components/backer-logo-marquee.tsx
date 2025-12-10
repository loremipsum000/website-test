"use client";
import { Marquee } from "@/components/marquee";
import { BackerLogo, BackerLogoProps } from "./backer-logo";

type BackerLogoMarqueeProps = {
  backerLogos?: BackerLogoProps[];
};

export const BackerLogoMarquee = ({ backerLogos }: BackerLogoMarqueeProps) => (
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="whitespace text-shade-2 md:max-w-32">
      Backed by industry veterans:
    </div>
    <div className="flex items-center gap-x-2 overflow-hidden filter w-full">
      <Marquee
        speed={25}
        gradient={true}
        gradientWidth={50}
        gradientColor="hsl(var(--background))"
        direction="left"
        autoFill={true}
      >
        {backerLogos?.map((backerLogo: any, i: any) => (
          <div key={i} className="mx-1">
            <BackerLogo {...backerLogo} />
          </div>
        ))}
      </Marquee>
    </div>
  </div>
);

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageAsset } from "../../../../../sanity.types";

export type BackerLogoProps = {
  logo: SanityImageAsset;
  name: string;
  variant: "organization" | "individual";
};

export const BackerLogo = ({ logo, name, variant }: BackerLogoProps) => {
  return (
    <div className="shrink-0 bg-background rounded-full border">
      {
        {
          organization: (
            <div className="mx-3 my-3">
              <Image
                src={urlFor(logo).url()}
                alt={`${name} logo`}
                className="shrink-0 my-1 h-8"
              />
            </div>
          ),
          individual: (
            <div className="flex w-full items-center gap-x-2 m-1 ">
              <Image
                src={urlFor(logo).url()}
                alt={`${name} logo`}
                className="bg-white object-scale-down w-12 h-12 rounded-full"
              />
              <span className="inline-block whitespace-pre-wrap text-body font-medium max-w-20 leading-4">
                {name}
              </span>
            </div>
          ),
        }[variant]
      }
    </div>
  );
};

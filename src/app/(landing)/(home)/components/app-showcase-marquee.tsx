import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { SanityImageAsset } from "../../../../../sanity.types";

export type AppShowcaseMarqueeProps = {
  caption: string;
  apps: {
    icon: SanityImageAsset;
    name: string;
    url: string;
  }[];
};

export const AppShowcaseMarquee = ({
  caption,
  apps,
}: AppShowcaseMarqueeProps) => {
  return (
    <div className="theme-dark bg-background text-foreground">
      <div className="container flex flex-col md:flex-row items-center gap-3 mx-auto justify-center py-4 overflow-hidden ">
        <div className="whitespace-wrap opacity-60 md:max-w-32">{caption}</div>
        <Marquee
          speed={25}
          gradient={true}
          gradientWidth={50}
          gradientColor="hsl(var(--background))"
          direction="right"
          autoFill={true}
        >
          {apps.map((app: any) => (
            <Link key={app.name} target="_blank" href={app.url ?? "#"}>
              <div className="">
                <Image
                  className="aspect-square h-12 flex items-center justify-center mx-2"
                  src={urlFor(app.icon).url()}
                  alt={app.name ?? ""}
                  width={48}
                  height={48}
                />
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

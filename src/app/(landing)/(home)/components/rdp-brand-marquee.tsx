"use client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
type RDPBrandMarqueeProps = {
  brandPartners: {
    name: string;
    logo: string;
  }[];
};

export const RDPBrandMarquee = ({ brandPartners }: RDPBrandMarqueeProps) => {
  const [duplicates, setDuplicates] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDuplicates = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth / duplicates;
        const newDuplicates = Math.ceil((containerWidth * 2) / contentWidth);
        if (newDuplicates !== duplicates) {
          setDuplicates(newDuplicates);
        }
      }
    };

    updateDuplicates();
    window.addEventListener("resize", updateDuplicates);
    return () => window.removeEventListener("resize", updateDuplicates);
  }, [brandPartners]);

  const animationDuration = 20;

  return (
    <div className="theme-dark bg-background text-foreground">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-center py-4">
          <div className="hidden md:block opacity-60 md:w-44 shrink-0 whitespace-pre-wrap">
            Accepted by 130M+ merchants worldwide
          </div>
          <div
            ref={containerRef}
            className="relative w-full max-w-[calc(100vw-2rem)] overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
            <div
              className="flex animate-marquee"
              style={{
                animationDuration: `${animationDuration}s`,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              }}
            >
              {[...Array(duplicates)].map((_, dupIndex) => (
                <div
                  key={dupIndex}
                  ref={dupIndex === 0 ? contentRef : undefined}
                  className="flex shrink-0"
                >
                  {brandPartners.map(({ logo, name }, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center opacity-80 hover:opacity-100 transition px-3 md:px-4"
                    >
                      <Image
                        src={urlFor(logo).url()}
                        alt={`${name} logo`}
                        className="h-5 w-auto object-contain"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

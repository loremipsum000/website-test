"use client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type InfrastructureMarqueeProps = {
  infrastructurePartners: {
    name: string;
    url: string;
    logo: string;
  }[];
};

export const InfrastructureMarquee = ({
  infrastructurePartners,
}: InfrastructureMarqueeProps) => {
  const [duplicates, setDuplicates] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDuplicates = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        const newDuplicates = Math.ceil(containerWidth / contentWidth) + 1;
        setDuplicates(newDuplicates);
      }
    };

    updateDuplicates();
    window.addEventListener('resize', updateDuplicates);
    return () => window.removeEventListener('resize', updateDuplicates);
  }, [infrastructurePartners]);

  const animationDuration = Math.max(10, infrastructurePartners.length * 2);

  return (
    <div className="theme-dark bg-background text-foreground">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-center py-4">
          <div className="hidden md:block whitespace-nowrap opacity-60 md:w-32 shrink-0">
            Infrastructure
          </div>
          <div ref={containerRef} className="relative w-full max-w-[calc(100vw-2rem)] overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
            <div
              className="flex animate-marquee"
              style={{ animationDuration: `${animationDuration}s` }}
            >
              {[...Array(duplicates)].map((_, dupIndex) => (
                <div key={`${dupIndex}-${infrastructurePartners.length}`} ref={contentRef} className="flex shrink-0">
                  {infrastructurePartners.map(({ logo, url, name }, i) => (
                    <Link key={`${dupIndex}-${i}`} target="_blank" href={url ?? "#"}>
                      <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition px-3 md:px-4">
                        <Image
                          src={urlFor(logo).url()}
                          alt={`${name} logo`}
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
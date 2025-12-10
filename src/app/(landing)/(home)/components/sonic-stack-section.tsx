"use client";
import { CtaButton } from "@/components/cta-button";
import { urlFor } from "@/sanity/lib/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowUpRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SanityImageAsset } from "../../../../../sanity.types";
import Image from "next/image";

type SonicStackSectionProps = {
  homePage: any;
};

export const SonicStackSection = ({ homePage }: SonicStackSectionProps) => {
  return (
    <section className="min-h-section py-16">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col items-start md:mx-0">
            <div className="z-10 relative bg-gradient-sonic-mirrored rounded-full select-none">
              <div className="absolute w-full h-full bg-gradient-sonic-mirrored animate-gradient rounded-full blur-sm -z-10"></div>
              <div className="p-[1px] rounded-full">
                <div className="flex items-center gap-x-2 px-3 py-1 bg-black/85 text-body-lg rounded-full overflow-hidden">
                  <span className="bg-clip-text bg-gradient-sonic-mirrored animate-gradient text-transparent">
                    Sonic Stack
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-h2 leading-tight sm:w-[20rem] md:w-[40rem] md:leading-none font-medium text-sonic-white">
              {homePage.sonicStackSection.title}
            </p>
            <p className="mt-6 text-body-lg max-w-2xl text-sonic-white">
              {homePage.sonicStackSection.subtitle}
            </p>
            {homePage.sonicStackSection.cta && (
              <div className="mt-6">
                <CtaButton
                  variant={"secondary"}
                  href={homePage.sonicStackSection.cta.url ?? "#"}
                >
                  {homePage.sonicStackSection.cta.title}
                  <ChevronRightIcon className="h-4 w-4 stroke-[3px]" />
                </CtaButton>
              </div>
            )}
          </div>
          <div className="mt-24 text-sonic-white">
            <dl className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
              {homePage.sonicStackSection.features?.map(
                (
                  feature: {
                    icon: SanityImageAsset;
                    title: string;
                    url: string;
                    bulletPoints: string[];
                    showAuditPartners: boolean;
                    auditPartners: {
                      name: string;
                      logo: SanityImageAsset;
                      url: string;
                    }[];
                  },
                  i: number
                ) => <FeatureColumn key={i} feature={feature} index={i} />
              )}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeatureColumn = ({
  feature,
  index,
}: {
  feature: {
    icon: SanityImageAsset;
    title: string;
    url: string;
    bulletPoints: string[];
    showAuditPartners: boolean;
    auditPartners: {
      name: string;
      logo: SanityImageAsset;
      url: string;
    }[];
  };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({ opacity: 1, y: 0 });
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col"
    >
      <div className="flex flex-col">
        <dt className="text-h6 font-bold text-sonic-white mb-6">
          <div
            className="mb-8 h-20 relative"
          >
            <Image
              fill
              src={urlFor(feature.icon).url()}
              alt={feature.title}
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          {feature.url ? (
            <div className="relative inline-block">
              <Link
                href={feature.url ?? "#"}
                target="_blank"
                className="group inline-flex items-center"
              >
                {feature.title}
                <ArrowUpRight
                  strokeWidth={2}
                  className="w-6 h-6 ml-2 opacity-60 group-hover:opacity-100 transition"
                />
              </Link>
            </div>
          ) : (
            <span>{feature.title}</span>
          )}
        </dt>
        <dd className="flex flex-auto flex-col text-body-lg">
          <ul className="list-disc ml-4 md:ml-0">
            {feature.bulletPoints.map((bullet: string, i: number) => (
              <li key={i} className="list-item ">
                {bullet}
              </li>
            ))}
            {feature.showAuditPartners && (
              <li className="list-item ">Audited by:</li>
            )}
          </ul>
          {feature.showAuditPartners && (
            <div className="flex items-center gap-x-3 gap-y-3 flex-wrap mt-4">
              {feature.auditPartners.map(
                (
                  partner: {
                    name: string;
                    logo: SanityImageAsset;
                    url: string;
                  },
                  i: number
                ) => (
                  <Link key={partner.name} href={partner.url} target="_blank">
                    <div className="border rounded-full h-10 w-36 relative">
                      <Image
                        className=" px-5 py-2 "
                        src={urlFor(partner.logo).url()}
                        alt={`${partner.name} logo`}
                        fill
                      />
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </dd>
      </div>
    </motion.div>
  );
};

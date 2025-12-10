import { Summit2025 } from "@/assets/images/summit-2025";
import { Spikes } from "@/components/decorations";
import { NewsletterCta } from "@/components/newsletter-cta";
import { World } from "@/components/world";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import React from "react";
import { ComingSoonTag } from "./components/coming-soon-tag";
import { WorldCard } from "./components/world-card";
import { getMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CalendarEmbed } from "@/components/calendar-embed";

export const metadata = await getMetadata("world");

export default function WorldPage() {
  return (
    <main className="theme-dark bg-background text-foreground flex flex-col relative">
      <Spikes direction="down" className="absolute top-0 w-full h-48 sm:h-56 opacity-50" />
      <section
        className={cn(
          "pb-0 pt-12 sm:pt-20 sm:pb-16 max-w-3xl mx-auto relative"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="sr-only">
              Sonic World
            </h1>
            <h2 className="text-body-lg font-bold hidden sm:block">
              Building. Learning. Connecting.
            </h2>
          </div>
          <div>
            <Image
              className="p-8 w-full h-auto"
              src="/sonic-world.svg"
              alt="Sonic World"
              width={1080}
              height={472}
            />
          </div>
          <div className="text-body-lg text-center mx-auto px-8 sm:px-0">
            Sonic World is our global effort to bring Sonic to people everywhere
            through official events, community initiatives, education, and
            beyond.
          </div>
        </div>
      </section>
      <section className="container mx-auto relative">
        <World className="absolute top-0 left-0 right-0 w-full" />
        <div className="flex flex-col gap-y-8 relative z-10 py-16 sm:pb-24 sm:pt-16 max-w-3xl mx-auto">
          <WorldCard
            title="Official Events"
            mobileImage="/sonicworld/world-events-mobile.png"
            leftImage="/sonicworld/world-events.png"
            className="bg-gradient-to-br theme-light text-foreground from-[#FFCB67] to-[#FE9A4C] "
            href="/about#upcoming-events"
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-body-lg leading-tight font-bold text-shade-1 max-w-48 sm:max-w-60 px-4">
                Worldwide events by Sonic Labs.
              </div>
              <span className="text-body text-center text-shade-1">
                Meet the team.
              </span>
            </div>
          </WorldCard>
          <WorldCard
            mobileImage="/sonicworld/sonic-sodas-mobile.png"
            title="Sonic & Sodas"
            leftImage="/sonicworld/sonic-sodas.png"
            className="bg-gradient-to-br theme-dark text-foreground from-[#335B8D] to-[#10283C] "
            href="/sonicsodas"
          >
            <div className="flex flex-col items-center justify-center gap-y-2 sm:py-12 text-center theme-dark text-foreground">
              <div className="text-body-lg leading-tight font-bold max-w-48 sm:max-w-64 px-4">
                <span className="italic">Community</span>
                <span>-hosted networking events.</span>
              </div>
              <div className="flex flex-col font-medium">
                <span className="text-body text-center">
                  Funded by Sonic Labs.
                </span>
              </div>
            </div>
          </WorldCard>
          <WorldCard
            title="Sonic University"
            leftImage="/sonicworld/university.png"
            className="bg-gradient-to-br from-[#FFECD4] to-[#B9A68E] theme-light text-foreground"
            href="https://x.com/SonicWorldHQ"
          >
            <div className="flex flex-col items-center justify-center gap-y-2 text-center">
              <img className="sm:hidden mb-4" src="/sonicworld/university-badge.svg" alt="Sonic University" />
              <div className="text-body-lg leading-tight font-bold max-w-48 sm:max-w-60 px-4">
                Where the bold come to learn.
              </div>
              <div className="flex flex-col font-medium px-4">
                <span className="text-body text-center">
                  Education by Sonic Labs.
                </span>
              </div>
            </div>
          </WorldCard>
          <WorldCard
            title="Global Communities"
            leftImage="/sonicworld/global-communities.png"
            className="bg-gradient-to-br from-[#96A7BF] to-[#D5E0F0] theme-light text-foreground"
            href="https://linktr.ee/soniccommunities"
          >
            <div className="flex flex-col items-center justify-center gap-y-2 text-center">
              <div className="text-body-lg leading-tight font-bold max-w-[13.5rem] sm:max-w-52 sm:leading-9 sm:p-0">
                Language and local communities.
              </div>
              <div className="flex flex-col font-medium">
                <span className="text-body text-center">Meet new friends.</span>
                <div className="flex flex-row-reverse flex-wrap items-center max-w-48 mt-6 px-4 mx-auto justify-center sm:hidden">
                  {["es", "it", "fr", "tr", "vn", "cn", "pl", "ae", "ir"].map(
                    (country, index) => (
                      <div
                        key={index}
                        className="border-2 border-shade-1 w-12 h-12 -m-2 rounded-full flex-grow-0 flex-shrink-0 overflow-hidden "
                      >
                        <Image
                          src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                          alt={`${country} flag`}
                          width={48}
                          height={48}
                          className="object-cover h-full w-auto"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </WorldCard>
          <WorldCard
            title="Sonic Swag"
            leftImage="/sonicworld/style.png"
            mobileImage="/sonicworld/style-mobile.png"
            className="bg-gradient-to-br from-[#F6EEE1] to-[#E0DDC9] theme-light text-foreground"
            href="https://swag.soniclabs.com/"
          >
            <div className="flex flex-col items-center justify-center gap-y-2 text-center">
              <div className="text-body-lg leading-tight font-bold max-w-48 sm:max-w-72 sm:leading-9 sm:p-0">
                Sonic-branded merchandise.
              </div>
              <span className="text-body text-center">Free at events.</span>
            </div>
          </WorldCard>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl relative overflow-hidden w-full min-h-[320px] bg-gradient-to-b from-[#FE9A4C] to-[#C25E14]">
              <Link href="/summit" className="flex flex-col items-center justify-center h-full py-4">
                <div className="flex flex-col items-center justify-center h-full w-full px-8">
                  <div className="flex flex-col items-center justify-center gap-y-4 w-full">
                    <Summit2025 className="w-full" />
                    <div className="text-body-lg font-bold flex items-center opacity-80">
                      <MapPin className="w-5 h-5 mr-1" />{" "}
                      <span>Vienna</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="rounded-2xl relative overflow-hidden w-full min-h-[320px] bg-gradient-sonic-mirrored animate-gradient p-1">
              <div className="relative w-full h-full bg-[#212226] rounded-xl overflow-hidden">
                <div className="flex flex-col items-center h-full py-4">
                  <div className="mb-8 z-10">
                    <ComingSoonTag />
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 px-8 pb-8 mb-8">
                    <img
                      src="/sonicworld/matrix.png"
                      className="w-full absolute top-0"
                      alt="Sonic Accelerator"
                    />
                    <div className="flex flex-col items-center justify-center gap-y-2 sm:gap-y-6 relative z-10">
                      <span className="flex items-center font-bold text-h5 sm:text-h6 whitespace-nowrap">
                        <span className="text-shade-2 mr-1">{"<"}</span>
                        <span>Sonic Accelerator</span>
                        <span className="text-shade-2 ml-2">{"/>"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto pb-16 sm:pb-32 5max-w-[13.5rem] z-10">
        <NewsletterCta />
      </section>

      {/* Luma Calendar Iframe */}
      <section className="container mx-auto pb-16 sm:pb-32 z-10 flex justify-center px-4 sm:px-0">
        <div className="w-full max-w-[600px]">
          <CalendarEmbed title="Upcoming Events" />
        </div>
      </section>

      <Spikes direction="up" className="absolute bottom-0 w-full h-48 sm:h-56" />
    </main>
  );
}

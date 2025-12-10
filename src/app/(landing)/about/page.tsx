import { Spikes } from "@/components/decorations";
import { NewsletterCta } from "@/components/newsletter-cta";
import { sanityFetch } from "@/sanity/lib/client";
import { getAboutPage } from "@/sanity/lib/queries";
import { Quote } from "lucide-react";
import { cache } from "react";
import { getMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata = await getMetadata("about");

const getPageData = cache(
  async () => (await sanityFetch({ query: getAboutPage })) as any
);

export default async function AboutPage() {
  const data = await getPageData();

  return (
    <div className="flex-1 h-full theme-light text-foreground bg-background relative">
      <Spikes direction="down" className="absolute top-0 w-full opacity-50" />
      
      <section className="mt-8 sm:mt-16 pb-12 sm:pb-16">
        <div className="flex flex-col gap-y-4 sm:gap-y-8 relative">
          
          {/* Header Section */}
          <div className="flex flex-col items-center gap-y-2 sm:gap-y-4 px-4">
            <h1 className="text-h3 sm:text-h2 md:text-h1 font-medium text-center">About us</h1>
            <p className="text-body-sm sm:text-body md:text-body-lg text-center max-w-xs mb-8 md:max-w-lg text-muted-foreground">
              Our global team of experts work towards democratizing access to advanced technologies.
            </p>
          </div>

          {/* Main Content Container */}
          <div className="max-w-4xl w-full mx-auto px-4 flex flex-col gap-16 sm:gap-24">
            
            {/* CEO Quote Card */}
            {/* Layout: Flex Column on Mobile (Text Top / Image Bottom), Flex Row on Desktop (Text Left / Image Right) */}
            {/* overflow-hidden ensures the image respects the rounded corners */}
            <div className="flex flex-col md:flex-row bg-[#FFECD4] border border-[#989A9C] shadow-lg rounded-3xl overflow-hidden">
              
              {/* Text Section - Has Padding */}
              <div className="flex-1 p-6 sm:p-10 md:p-12 flex flex-col justify-center gap-6">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 fill-orange-400/20" strokeWidth={1.5} />
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-stone-900">
                  We&apos;re working on changing that [FeeM] into a sliding-scale model. Builders might receive around 15%, validators get 10%, and the rest is burned. That way, increased usage actually benefits token holders.
                </p>
                <div>
                  <h6 className="font-bold text-stone-900 text-base sm:text-lg">Mitchell Demeter</h6>
                  <p className="text-sm text-stone-600 italic">CEO @ Sonic Labs</p>
                </div>
              </div>

              {/* Image Section - No Padding, flush with edges */}
              {/* h-64 on mobile gives it height, md:h-auto allows it to match the height of the text section */}
              <div className="relative w-full md:w-[40%] h-64 md:h-auto shrink-0">
                <Image
                  src="/images/about/mitch-pfp.png"
                  alt="Mitchell Demeter, CEO"
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>

            {/* Mission Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
              <div className="md:w-1/4 shrink-0">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                  <span className="text-stone-400">Our</span>{" "}
                  <span className="text-stone-900">Mission</span>
                </h2>
              </div>
              <div className="md:w-3/4">
                <p className="text-base sm:text-lg leading-relaxed text-stone-800">
                  We&apos;re working on changing that [FeeM] into a sliding-scale model. Builders might receive around 15%, validators get 10%, and the rest is burned. That way, increased usage actually benefits token holders. We&apos;re working on changing that [FeeM] into a sliding-scale model. Builders might receive around 15%, validators get 10%, and the rest is burned. That way, increased usage actually benefits token holders.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-stone-300/60" />

            {/* Vision Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
              <div className="md:w-1/4 shrink-0">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                  <span className="text-stone-400">Our</span>{" "}
                  <span className="text-stone-900">Vision</span>
                </h2>
              </div>
              <div className="md:w-3/4">
                <p className="text-base sm:text-lg leading-relaxed text-stone-800">
                  We&apos;re working on changing that [FeeM] into a sliding-scale model. Builders might receive around 15%, validators get 10%, and the rest is burned. That way, increased usage actually benefits token holders. We&apos;re working on changing that [FeeM] into a sliding-scale model. Builders might receive around 15%, validators get 10%, and the rest is burned. That way, increased usage actually benefits token holders.
                </p>
              </div>
            </div>

            {/* Hiring Banner */}
            <div className="w-full rounded-2xl border border-[#989A9C] bg-[#FFECD4] shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">We&apos;re hiring!</h3>
              <Link 
                href="/careers" 
                className="bg-[#DBD3C7] hover:bg-[#CAC6C0] text-[#214E81] font-medium py-3 px-6 rounded-full transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
              >
                See open positions
              </Link>
            </div>

          </div>
        </div>
      </section>
     
      <section className="py-12 sm:py-16 lg:py-32 container">
        <NewsletterCta />
      </section>
      <Spikes direction="up" className="w-full" />
    </div>
  );
}
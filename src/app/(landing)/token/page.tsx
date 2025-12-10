import { CtaButton } from "@/components/cta-button";
import { LinesHorizontal } from "@/components/decorations";
import { NewsletterCta } from "@/components/newsletter-cta";
import { SonicNodeCard } from "@/components/sonic-node-card";
import { SonicTransactionsChart } from "@/components/SonicTransactionsChart";
import Image from "next/image";

export const metadata = {
  title: "Sonic Token",
  description: "Learn about the Sonic token and its utility in the Sonic ecosystem.",
};

export default function TokenPage() {
  return (
    <div className="flex-1 theme-light w-full text-foreground bg-background">
      <section className="container mx-auto pt-16 lg:py-24">
        <div className="flex flex-col gap-y-8 max-lg:items-center text-center">
          <h1 className="text-h1 sm:text-h2 text-sonic-black font-medium">
            Sonic Token
          </h1>
          <p className="text-body-lg max-w-2xl">
            The native token powering the Sonic ecosystem, enabling fast, secure, and scalable transactions.
          </p>
          <CtaButton href="#utility">Learn More</CtaButton>
        </div>
      </section>

      <section id="utility" className="container mx-auto pt-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 place-items-center">
          <div className="flex flex-col gap-y-8 max-lg:items-center text-center lg:text-left">
            <h2 className="text-h2 sm:text-h3 text-sonic-black font-medium">
              Token Utility
            </h2>
            <p className="text-body-lg max-w-md">
              The Sonic token serves as the backbone of our ecosystem, providing various utilities and benefits to holders.
            </p>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="rounded-2xl border border-shade-2 flex items-start sm:flex-row gap-4 p-8 max-w-xl">
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <span className="text-h5 md:text-h6 font-semibold">
                  Network Security
                </span>
                <span className="text-body-lg">
                  Stake your tokens to help secure the network and earn rewards.
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-shade-2 flex items-start sm:flex-row gap-4 p-8 max-w-xl">
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <span className="text-h5 md:text-h6 font-semibold">
                  Governance
                </span>
                <span className="text-body-lg">
                  Participate in network governance and decision-making processes.
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-shade-2 flex items-start sm:flex-row gap-4 p-8 max-w-xl">
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <span className="text-h5 md:text-h6 font-semibold">
                  Transaction Fees
                </span>
                <span className="text-body-lg">
                  Use tokens to pay for transaction fees and network services.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto pt-16 lg:py-24">
        <div className="flex flex-col gap-y-8 max-lg:items-center text-center">
          <h2 className="text-h2 sm:text-h3 text-sonic-black font-medium">
            Sonic Daily Transactions
          </h2>
          <p className="text-body-lg max-w-2xl">
            Track the growth of Sonic's daily transaction volume, showcasing the increasing adoption and usage of the Sonic network.
          </p>
          <div className="w-full">
            <SonicTransactionsChart />
          </div>
        </div>
      </section>

      <section className="container mx-auto pt-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 place-items-center">
          <div className="flex flex-col gap-y-8 w-full items-start max-lg:text-center max-lg:items-center">
            <h2 className="text-h2 sm:text-h3 text-sonic-black font-medium max-w-sm">
              Token Migration
            </h2>
            <p className="text-body-lg max-w-md">
              Migrate your existing tokens to the new Sonic token to access enhanced features and benefits.
            </p>
            <CtaButton href="#migrate">Start Migration</CtaButton>
          </div>
          <div className="flex rounded-2xl border border-shade-2">
            <div className="w-full h-[472px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <p className="text-body-lg text-sonic-black">Token Migration Illustration</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 lg:py-24">
        <div className="mx-auto container">
          <SonicNodeCard
            title="Become a Validator"
            description="Run a validator node to help secure the network and earn rewards."
            features={[
              { title: "Earn staking rewards" },
              { title: "Help secure the network" },
              { title: "Participate in governance" },
              { title: "Access premium features" }
            ]}
            logos={[
              { url: "/images/validators/binance.png", alt: "Binance" },
              { url: "/images/validators/coinbase.png", alt: "Coinbase" },
              { url: "/images/validators/kraken.png", alt: "Kraken" }
            ]}
            cta={{
              title: "Start Validating",
              url: "#validate"
            }}
            secondaryCta={{
              title: "Learn More",
              url: "#learn"
            }}
          />
        </div>
      </section>

      <section className="pt-16 lg:py-24 container mx-auto">
        <NewsletterCta />
      </section>
      
      <LinesHorizontal direction="up" className="pt-16" />
    </div>
  );
}

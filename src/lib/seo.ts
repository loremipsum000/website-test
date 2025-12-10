import { Metadata } from "next";
import { createMetadata } from "./utils";

const pages = [
  "home",
  "about",
  "airdrop",
  "boom",
  "contact",
  "developer-resources",
  "redotpay",
  "sonicsodas",
  "token",
  "world",
] as const;

type PageType = (typeof pages)[number];

const seoConfig: { [K in PageType]: Omit<Parameters<typeof createMetadata>[0], "metadataBase" | "url"> } = {
  home: {
    title: "Sonic | The Fastest EVM Layer-1 Blockchain",
    description:
      "Experience 400,000 TPS and instant finality on Sonic, the high-performance EVM blockchain built for DeFi and Web3 innovation.",
    image: "/images/og/home.png",
  },
  about: {
    title: "Sonic | Building the Future of Blockchain",
    description:
      "Meet the team engineering Sonic, the next-generation layer-1 blockchain platform that's revolutionizing speed and scalability in Web3.",
    image: "/images/og/about.png",
  },
  "developer-resources": {
    title: "Sonic | Developer Resources",
    description:
      "Access comprehensive developer tools, documentation, and resources to build high-performance apps on Sonic's 400,000 TPS EVM-compatible blockchain.",
    image: "/images/og/developer-resources.png",
  },
  airdrop: {
    title: "Sonic Airdrop | Join the S Revolution",
    description:
      "Participate in the ~200M S token airdrop. Join Sonic, the fastest EVM blockchain with 400,000 TPS and instant finality.",
    image: "/images/og/home.png",
  },
  boom: {
    title: "Sonic Boom | Build & Earn Points for the S Airdrop",
    description:
      "Participate in Sonic Boom to earn points for the 190.5M S token airdrop. Join the fastest EVM blockchain's premier developer rewards program and build the future of Web3.",
    image: "/images/og/home.png",
  },
  contact: {
    title: "Sonic | Contact & Partnership Inquiries",
    description:
      "Reach out to Sonic for technical support, partnership opportunities, and community engagement on the world's fastest EVM-compatible blockchain.",
    image: "/images/og/contact.png",
  },
  redotpay: {
    title: "Sonic Pay | Spend Crypto Anywhere",
    description:
      "Experience spending with Sonic Pay. Use your USDC.e to pay effortlessly online or at any POS terminal.",
    image: "/images/og/card.png",
  },
  sonicsodas: {
    title: "Sonic & Sodas | Developer Meetups & Web3 Community Events",
    description:
      "Join Sonic & Sodas developer meetups and community networking events. Connect with Web3 builders, get funded by Sonic Labs, and grow the ecosystem.",
    image: "/images/og/sonicsodas.png",
  },
  token: {
    title: "S Token | Powering the Sonic Network",
    description:
      "Sonic's native S token enables staking, network validation, governance, and fast, low-fee transactions on the fastest EVM blockchain.",
    image: "/images/og/token.png",
  },
  world: {
    title: "Sonic World | Official Events & Community Initiatives",
    description:
      "Explore Sonic World, our global effort to bring Sonic to people everywhere through official events, hackathons, education, and beyond.",
    image: "/images/og/world.png",
  },
};

export const getMetadata = async (page: PageType, options?: Metadata) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.soniclabs.com";
  const seo = seoConfig[page];
  const config = createMetadata({
    ...seo,
    url: `${baseUrl}/${page === "home" ? "" : page}`,
    metadataBase: baseUrl,
  });

  return {
    ...config,
    ...options,
    url: config.openGraph?.url ?? `${baseUrl}/${page === "home" ? "" : page}`,
  };
};

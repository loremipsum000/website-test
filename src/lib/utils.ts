import { cx } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/types";
import { extendTailwindMerge } from "tailwind-merge";
import tailwindConfig from "../../tailwind.config";
import type { Metadata } from "next";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": Object.keys(tailwindConfig.theme.extend.fontSize).map((key) => "text-" + key),
      "text-color": Object.keys(tailwindConfig.theme.extend.colors).map((key) => "text-" + key),
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(cx(inputs));
}

type CreateMetadataArgs = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  metadataBase?: string | URL;
};

// Lightweight helper used by `src/lib/seo.ts`
export function createMetadata({
  title,
  description,
  image,
  url,
  metadataBase,
}: CreateMetadataArgs): Metadata {
  const base =
    typeof metadataBase === "string"
      ? new URL(metadataBase)
      : metadataBase ?? undefined;

  const resolveUrl = (value?: string) => {
    if (!value) return undefined;
    try {
      return new URL(value, base).toString();
    } catch {
      return value;
    }
  };

  const imageUrl = resolveUrl(image);
  const canonical = resolveUrl(url);

  return {
    title,
    description,
    metadataBase: base,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export async function addSonicNetwork() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet found. Please install a Web3 wallet like Rabby.');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x92',
        chainName: 'Sonic',
        nativeCurrency: {
          name: 'S',
          symbol: 'S',
          decimals: 18
        },
        rpcUrls: ['https://rpc.soniclabs.com'],
        blockExplorerUrls: ['https://sonicscan.org']
      }]
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add Sonic network to wallet');
  }
}

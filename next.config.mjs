/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  experimental: {
    taint: true,
  },
  redirects: async () => [
    {
      source: "/redotpay",
      destination: "/sonicpay",
      permanent: true,
    },
    {
      source: "/bd-intake",
      destination: "https://airtable.com/appeXnYBjdPETgohD/pag0wPMXTeIVxhmXT/form",
      permanent: false,
    },
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "anger-intervention-marketing.vercel.app",
        },
      ],
      destination: "https://www.soniclabs.com/airdrop",
      permanent: false,
    },
  ],
};

export default nextConfig;

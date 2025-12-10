import React from 'react';
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { SummitBanner } from "@/components/summit-banner";

const gaId = process.env.GA_TRACKING_ID;

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <SummitBanner className="relative z-50" />
        {children}
        <Toaster />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

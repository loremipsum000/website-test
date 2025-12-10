import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Urbanist } from "next/font/google";
import { BuyButtonWrapper } from "@/components/buy-button-wrapper";

import "./globals.css";

const sans = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("antialiased flex flex-col min-h-full", sans.className)}>
      <Navbar navBanner={{ text: "", link: "", isActive: false }} />
      {children}
      <div className="fixed h-min right-2 bottom-2 z-40 md:bottom-8 lg:bottom-16 md:right-8 lg:right-16">
        <BuyButtonWrapper />
      </div>
      <Footer
        linkSections={[
          {
            title: "Product",
            links: [
              { title: "Token", url: "/token" },
              { title: "Card", url: "/card" },
              { title: "Boom", url: "/boom" },
              { title: "Sodas", url: "/sodas" },
            ],
          },
          {
            title: "Resources",
            links: [
              { title: "Developer Resources", url: "/developer-resources" },
              { title: "Litepaper", url: "/litepaper" },
              { title: "Blog", url: "/blog" },
            ],
          },
          {
            title: "Company",
            links: [
              { title: "About", url: "/about" },
              { title: "Contact", url: "/contact" },
            ],
          },
        ]}
        copyrightNotice="© 2024 Sonic Labs. All rights reserved."
        logo="/images/logo.svg"
      />
    </div>
  );
}

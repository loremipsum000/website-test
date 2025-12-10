"use client";

import { SonicWorldIcon } from "@/assets/icons/sonic-world";
import { faDiscord, faReddit, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";

import Link from "next/link";
import * as React from "react";

import { STokenColor } from "@/assets/icons/s-token";
import { Sonican } from "@/assets/icons/sonican";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight, GraduationCap, Info, MessagesSquare, PanelLeft, Rss, ShoppingCart, SquareCode, Terminal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AirdropLink } from "./airdrop-link";
import { NotificationWidget } from "./notification-widget";
import TextMarquee from "./text-marquee";
import { AddNetworkButton } from "./add-network-button";

const learnNavigation = [
  {
    title: "S Token",
    href: "/token",
    description: "The native token of the Sonic network",
    icon: STokenColor,
  },
  {
    title: "Developer Resources",
    href: "/developer-resources",
    description: "Find all the tools you need to start building",
    icon: Terminal,
  },
  {
    title: "Solidity Course",
    href: "https://www.hackquest.io/learning-track/Sonic",
    description: "Learn Solidity from scratch on HackQuest",
    external: true,
    icon: GraduationCap,
  },
  {
    title: "Testnet",
    href: "https://blaze.soniclabs.com",
    description: "Deploy contracts and experience Sonic's speed",
    external: true,
    icon: SquareCode,
  },
  {
    title: "Docs",
    href: "https://docs.soniclabs.com",
    description: "Read the Sonic documentation",
    external: true,
    icon: PanelLeft,
  },
  // {
  //   title: "GitHub",
  //   href: "https://github.com/Fantom-Foundation",
  //   description: "View our repositories",
  //   external: true,
  //   icon: Github,
  // },
];

const communityNavigation = [
  {
    title: "Sonic World",
    href: "/world",
    description: "Global outreach to engage builders and users",
    icon: SonicWorldIcon,
  },
  {
    title: "Global Communities",
    href: "https://linktr.ee/soniccommunities",
    description: "Find friends who speak your language",
    icon: MessagesSquare,
    external: true,
  },
  {
    title: "Blog",
    href: "https://blog.soniclabs.com",
    description: "Check out our Sonic Insights blog",
    icon: Rss,
    external: true,
  },
  {
    title: "Sonic & Sodas",
    href: "/sonicsodas",
    description: "Funded developer-focused networking events",
    icon: Sonican,
    iconClassName: "w-10 -ml-2 h-auto",
    external: false,
  },

  // {
  //   title: "Governance",
  //   href: "https://wallet.fantom.network/governance",
  //   description: "Learn about the latest network proposals",
  //   icon: Vote,
  //   external: true,
  // },
];

const socials = [
  {
    title: "Telegram",
    href: "https://t.me/Sonic_English",
    // href: 'https://t.me/OfficialSonicBot',
    icon: <FontAwesomeIcon icon={faTelegram} />,
  },
  {
    title: "X",
    href: "https://x.com/SonicLabs",
    icon: <FontAwesomeIcon icon={faXTwitter} />,
  },
  {
    title: "Discord",
    href: "https://discord.gg/3Ynr2QDSnB",
    icon: <FontAwesomeIcon icon={faDiscord} />,
  },
  {
    title: "Reddit",
    href: "https://www.reddit.com/r/0xSonic/",
    icon: <FontAwesomeIcon icon={faReddit} />,
  },
  // {
  //   title: "Instagram",
  //   href: "https://www.instagram.com/0xSonic",
  //   icon: <FontAwesomeIcon icon={faInstagram} />,
  // },
  // {
  //   title: "YouTube",
  //   href: "https://www.youtube.com/@0xSonic",
  //   icon: <FontAwesomeIcon icon={faYoutube} />,
  // },
];

const mobileNavigation = [
  {
    label: "Learn",
    children: [
      {
        label: "S Token",
        description: "Read something",
        href: "/token",
      },
      {
        label: "Developer Resources",
        description: "Find all the tools you need to start building",
        href: "/developer-resources",
      },
      {
        label: "Solidity Course",
        description: "Learn Solidity from scratch on HackQuest",
        href: "https://www.hackquest.io/learning-track/Sonic",
        external: true,
      },
      {
        label: "Testnet",
        description: "Deploy contracts and experience Sonic's speed",
        href: "https://blaze.soniclabs.com",
        external: true,
      },
      {
        label: "Docs",
        description: "Read the Sonic documentation",
        href: "https://docs.soniclabs.com",
        external: true,
      },
    ],
  },
  {
    label: "Community",
    children: [
      {
        label: "Sonic World",
        description: "Global outreach to engage builders and users",
        href: "/world",
      },
      {
        label: "Global Communities",
        description: "Language & local communities",
        href: "https://linktr.ee/soniccommunities",
        external: true,
      },
      {
        label: "Blog",
        description: "Check out our Sonic Insights blog",
        href: "https://blog.soniclabs.com",
        external: true,
      },
      {
        label: "Sonic & Sodas",
        description: "Funded developer-focused networking events",
        href: "/sonicsodas",
        external: false,
      },
    ],
  },
  {
    label: "General",
    children: [
      {
        label: "GitHub",
        description: "View our repositories",
        href: "https://github.com/0xsoniclabs",
        external: true,
      },
      {
        label: "About Us",
        description: "Learn more about Sonic",
        href: "/about",
      },
      {
        label: "Contact Us",
        description: "Get in touch with us",
        href: "/contact",
      },
    ],
  },
];

type NavbarProps = {
  navBanner: {
    text: string;
    link: string;
    isActive: boolean;
  };
};

export function Navbar({ navBanner }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative z-50">
      {navBanner.isActive && (
        <div className="h-6 w-full bg-gradient-sonic-horizontal direction-reverse  text-xs text-center sm:text-sm font-bold bg-opacity-40 flex items-center justify-center">
          <Link className="max-sm:w-full" target="_blank" href={navBanner.link}>
            <TextMarquee text={navBanner.text} />
          </Link>
        </div>
      )}
      <nav className="theme-dark bg-background text-foreground w-full">
        <div className="container mx-auto flex items-center justify-between h-16">
          <Link className="flex items-center py-4" href="/">
            <div className="relative w-32 h-8">
              <Image src={"/sonic-logo.svg"} alt="Sonic Labs Logo" fill className="object-contain" />
            </div>
          </Link>
          <div className="flex md:hidden items-center gap-x-2">
            <NotificationWidget />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="relative -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />

              <div className="absolute w-[14px] h-[14px] top-0.5 right-0.5 bg-gradient-sonic-mirrored animate-gradient bg-opacity-40 rounded-full flex items-center justify-center">
                <div className="h-[12.5px] w-[12.5px] bg-sonic-black flex items-center justify-center rounded-full">
                  <Info className="h-[10px] w-[10px]" />
                </div>
              </div>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-x-3">
            <NavigationMenu key={pathname} className="z-30">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-[3fr_2fr] w-[518px] h-[600px]">
                      <div className="p-4">
                        <ul className="flex flex-col gap-y-3">
                          {learnNavigation.map((item, i) => (
                            <Link key={i} href={item.href} target={item.external ? "_blank" : "_self"}>
                              <div className="px-6 py-3 rounded-md flex items-center gap-x-6 hover:bg-white/5">
                                {React.createElement(item.icon, {
                                  className: "h-8 w-8 text-foreground stroke-foreground",
                                })}
                                <div className="w-full flex flex-col whitespace-wrap gap-y-0.5">
                                  <div className="text-body font-medium flex items-center gap-x-1">
                                    <span>{item.title}</span>
                                    {item.external && <ArrowUpRight className="h-4 w-4" />}
                                  </div>
                                  <div className="text-body text-shade-2 whitespace-pre-wrap">{item.description}</div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div className="px-8 py-4 bg-[#1E1E20]">
                        <ul className="mt-2 flex flex-col gap-y-3">
                          <li>
                            <Link
                              className="flex items-center gap-x-2 text-body font-medium"
                              target="_blank"
                              href={"https://github.com/0xsoniclabs"}
                            >
                              GitHub <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </li>
                          <li>
                            <Link className="flex items-center gap-x-2 text-body font-medium" href={"/about"}>
                              About Us{" "}
                            </Link>
                          </li>
                          <li>
                            <Link className="flex items-center gap-x-2 text-body font-medium" href={"/contact"}>
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-[3fr_2.5fr] w-[518px] h-[520px]">
                      <div className="flex flex-col justify-between p-4">
                        <ul className="flex flex-col gap-y-2">
                          {communityNavigation.map((item, i) => (
                            <Link key={i} target={item.external ? "_blank" : "_self"} href={item.href}>
                              <div className="pl-6 pr-2 py-3 rounded-md flex items-center gap-x-6 hover:bg-white/5">
                                <item.icon
                                  className={cn("w-8 h-auto text-foreground stroke-foreground", item.iconClassName)}
                                />
                                <div className="w-full flex flex-col whitespace-wrap gap-y-0.5">
                                  <div className="text-body font-medium flex items-center gap-x-1">
                                    {item.title}
                                    {/* {item.external && (
                                      <ArrowUpRight className="h-4 w-4" />
                                    )} */}
                                  </div>
                                  <div className="text-body-sm text-shade-2 whitespace-pre-wrap">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </ul>
                        <ul className="p-6 flex flex-col gap-y-3">
                          <li>
                            <Link className="flex items-center gap-x-2 text-body font-medium" href={"/about"}>
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link className="flex items-center gap-x-2 text-body font-medium" href={"/contact"}>
                              Contact Us{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="px-8 py-6 bg-[#1E1E20] flex flex-col gap-y-4">
                        <span className="uppercase text-shade-2 font-medium">SOCIALS</span>
                        <div className="grid grid-cols-2 gap-2">
                          {socials.map((social, i) => (
                            <Link
                              target="_blank"
                              key={i}
                              href={social.href}
                              className="border transition rounded-md aspect-square flex justify-center items-center hover:bg-white/10 "
                            >
                              {React.cloneElement(social.icon, {
                                className: "w-8 h-8",
                              })}
                            </Link>
                          ))}
                          <div className="col-span-2">
                            <Link
                              target="_blank"
                              href={"https://swag.soniclabs.com"}
                              className="border transition rounded-md flex aspect-[2/1] justify-center items-center hover:bg-white/10 "
                            >
                              <ShoppingCart className="w-6 h-6 mr-4" />
                              <span className="font-medium">Sonic Swag</span>
                            </Link>
                          </div>
                          <div className="col-span-2"></div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport className="bg-red-400 border-none" />
            </NavigationMenu>
            <div className="relative z-40 flex items-center gap-x-3">
              <AddNetworkButton />
              <AirdropLink />
              <NotificationWidget />
            </div>
          </div>
        </div>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto sm:ring-1 sm:ring-gray-900/10 theme-dark bg-background text-foreground">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col container mx-auto">
                <div className="flex items-center justify-between h-16 py-4">
                  <Link href="/">
                    <div className="relative w-32 h-8">
                      <Image src={"/sonic-logo.svg"} alt="Sonic" fill className="object-contain" />
                    </div>
                  </Link>
                  <button type="button" onClick={() => setMobileMenuOpen(false)} className="relative rounded-md p-2.5 ">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="flow-root overflow-auto">
                  <div className="divide-y divide-sonic-white/20">
                    <div className="flex flex-col space-y-6 py-6">
                      <div className="mx-2 flex gap-x-2">
                        <AddNetworkButton />
                        <AirdropLink />
                      </div>
                      {mobileNavigation.map((item) => (
                        <div key={item.label}>
                          <h2 className="font-medium text-hero-3 mb-4 text-body-lg">{item.label}</h2>
                          <ul className="text-sonic-white font-medium">
                            {item.children.map((child, i) => (
                              <li key={i} className="mb-2 ml-4">
                                <Link
                                  href={child.href}
                                  className="hover:underline"
                                  target={child.external ? "_blank" : "_self"}
                                >
                                  <span>{child.label}</span>
                                  {child.external && <ArrowUpRight className="h-4 w-4 ml-1 inline" />}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E1E20] grid grid-cols-3">
                {socials.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="flex items-center justify-center hover:bg-white/5 transition-colors p-6"
                  >
                    {React.cloneElement(social.icon, {
                      className: "w-6 h-6 text-foreground stroke-foreground",
                    })}
                  </Link>
                ))}
                <Link
                  target="_blank"
                  href={"https://swag.soniclabs.com"}
                  className="col-span-2 flex items-center justify-center hover:bg-white/5 transition-colors p-6"
                >
                  <ShoppingCart className="w-6 h-6 mr-4 text-foreground stroke-foreground" />
                  <span className="font-medium">Sonic Swag</span>
                </Link>
              </div>
            </div>
          </DialogPanel>
        </Dialog>{" "}
      </nav>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

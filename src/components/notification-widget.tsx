"use client";

import * as React from "react";
import { Bell, ArrowRight, ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SonicButton } from "@/components/button";
import Image from "next/image";
import Link from "next/link";

const PartnerContent = () => (
  <div className="space-y-6">
    <div className="flex flex-col items-center gap-2 text-center">
      <h2 className="text-lg font-medium leading-none text-center text-foreground">
        Sonic <span className="text-hero-2">Notifications</span>
      </h2>
      <p className="px-8 text-xs text-muted-foreground">Stay up to date with the latest news and updates from Sonic.</p>
    </div>
    <div className="space-y-3 px-8">
      <AlertCategory title="General Updates" />
      <AlertCategory title="Sonic World News" />
      <AlertCategory title="Trading Insights" />
      <AlertCategory title="Developer Updates" />
    </div>

    <div className="flex flex-col px-6 w-full">
      <Link className="mx-auto" href="https://sonic.notifi.network" target="_blank">
        <SonicButton>
          <div className="flex flex-row items-center gap-1">
            Get Notified <ArrowUpRight className="w-3 h-3" />
          </div>
        </SonicButton>
      </Link>
    </div>

    <div className="scale-125 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
      Powered by
      <Link href="https://notifi.network/" target="_blank">
        <Image src="/notifi.svg" alt="Notifi" width={35} height={9} />
      </Link>
    </div>
  </div>
);

const PartnerButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => (
    <SonicButton
      ref={ref}
      variant="icon"
      animated={false}
      className="flex items-center justify-center"
      size="lg"
      {...props}
    />
  ),
);
PartnerButton.displayName = "PartnerButton";

export function NotificationWidget() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // For the initial loading state
  if (!mounted) {
    return (
      <PartnerButton>
        <Bell className="h-3 w-3 md:h-4 md:w-4 text-primary" />
      </PartnerButton>
    );
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <PartnerButton>
            <Bell className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          </PartnerButton>
        </PopoverTrigger>
        <PopoverContent
          className="w-[280px] theme-dark rounded-2xl"
          align="end"
          side="bottom"
          sideOffset={8}
          alignOffset={-16}
        >
          <PartnerContent />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PartnerButton>
          <Bell className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        </PartnerButton>
      </DialogTrigger>
      <DialogContent className="theme-dark bg-popover">
        <PartnerContent />
      </DialogContent>
    </Dialog>
  );
}

const AlertCategory = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 text-base text-foreground">
    <ArrowRight className="h-3 w-3 text-[#F09F5D]" />
    {title}
  </div>
);

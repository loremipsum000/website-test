"use client";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useMemo, useState } from "react";

const tabs = [
  "Lending",
  "NFTs",
  "Yield",
  "Payments",
  "Gaming",
  "Exchanges",
  "Stablecoins",
];

const BountyCard = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="rounded-2xl p-6 border border-shade-2 flex flex-col gap-y-2">
      <h6 className="text-h6 font-semibold">{title}</h6>
      <p className="text-body-lg font-medium">{description}</p>
    </div>
  );
};

const CompactBountyCard = ({ title }: { title?: string }) => {
  return (
    <div className="rounded-2xl px-4 py-1 border border-shade-2">
      <p className="text-body-lg font-medium">{title}</p>
    </div>
  );
};

type BountyBrowserProps = {
  variant?: "default" | "compact";
  contentWrapperClasses?: string;
  bounties: {
    title: string;
    description?: string;
    categories: {
      name: string;
    }[];
  }[];
};

export const BountyBrowser = ({
  variant = "default",
  bounties,
  contentWrapperClasses,
}: BountyBrowserProps) => {
  const groupedBounties = useMemo(
    () =>
      bounties.reduce(
        (acc, bounty) => {
          bounty.categories?.forEach((category) => {
            if (!acc[category.name]) {
              acc[category.name] = [];
            }

            acc[category.name].push(bounty);
          });
          return acc;
        },
        {} as Record<string, any>
      ),
    [bounties]
  );

  return (
    <Tabs.Root
      defaultValue={Object.keys(groupedBounties)[0]}
      className="w-full"
    >
      <Tabs.List className="flex gap-2 flex-wrap pb-4 border-b border-b-shade-2">
        {Object.keys(groupedBounties).map((tab, i) => (
          <Tabs.Trigger
            key={i}
            value={tab}
            className="text-sonic-white px-4 py-0.5 text-body-lg font-medium rounded-full data-[state=active]:bg-hero-2/[20%] data-[state=active]:text-hero-2"
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className={cn("pt-4", contentWrapperClasses)}>
        {Object.keys(groupedBounties).map((category, i: number) => (
          <Tabs.Content key={i} className="" value={category}>
            <div className="flex flex-wrap gap-4">
              {groupedBounties[category].map((bounty: any, i: number) => (
                <div key={i}>
                  {
                    {
                      ["default"]: (
                        <BountyCard
                          title={bounty.title}
                          description={bounty.description}
                        />
                      ),
                      ["compact"]: <CompactBountyCard title={bounty.title} />,
                    }[variant]
                  }
                </div>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
};

"use client";

import { AnimatedNumber } from "@/components/animated-number";
import { useCallback, useEffect, useState } from "react";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const AirdropAmount = ({
  kicker,
  amount,
  defillamaId,
  tokenSymbol,
}: {
  kicker: string;
  amount: number;
  defillamaId: string;
  tokenSymbol: string;
}) => {
  const [price, setPrice] = useState<number>();

  const getPrice = useCallback(async () => {
    const response = await fetch(
      `https://coins.llama.fi/prices/current/${defillamaId}`
    );
    const data = await response.json();
    setPrice(data.coins[defillamaId].price);
  }, [defillamaId]);

  useEffect(() => {
    getPrice();
    const interval = setInterval(() => getPrice(), 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (price && amount) {
      setValue(amount * price);
    }
  }, [amount * (price ?? 0)]);

  return (
    <div className="theme-dark relative shadow-xl">
      <div className="absolute bg-gradient-sonic-mirrored animate-gradient inset-0 rounded-2xl" />
      <div className="p-0.5 relative">
        <div className="bg-background text-foreground text-center p-6 rounded-2xl flex flex-col gap-y-2 md:gap-y-4">
          <div className="text-body-lg">{kicker}</div>
          <div className="text-h4 xs:text-h3 sm:text-h2 md:text-h1">
            <AnimatedNumber
              prefix={value ? "~$" : ``}
              value={value ? value : amount}
              postfix={!value ? ` ${tokenSymbol}` : ""}
            />
          </div>
          <div className="text-body-sm text-muted-foreground">
            {formatNumber(amount)} S {price ? `* $${price} USD` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

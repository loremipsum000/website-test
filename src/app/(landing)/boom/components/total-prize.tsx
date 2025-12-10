"use client";

import PunchyTextEffect from "@/components/jiggle-text";
import { inView, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type TotalPrizeProps = {
  fantomAmount: number;
};

export const TotalPrize = ({ fantomAmount }: TotalPrizeProps) => {
  const [value, setValue] = useState(fantomAmount);

  const getPrize = async () => {
    const response = await fetch(
      "https://coins.llama.fi/prices/current/coingecko:fantom"
    );
    const data = await response.json();
    setValue(parseFloat(data.coins["coingecko:fantom"].price) * fantomAmount);
  };

  useEffect(() => {
    getPrize();
    const interval = setInterval(() => getPrize(), 1000 * 5);
    //destroy interval on unmount
    return () => clearInterval(interval);
  }, []);

  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });

  let display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <PunchyTextEffect
      prefix={value != fantomAmount ? "$" : ""}
      value={display}
      postfix={value == fantomAmount ? " FTM" : ""}
    />
  );
};

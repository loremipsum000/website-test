"use client";

import { addSonicNetwork } from "@/lib/utils";
import { useState } from "react";
import { SonicButton } from "./button";
import { ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

export const AddNetworkButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNetwork = async () => {
    setIsLoading(true);
    try {
      await addSonicNetwork();
      toast.success("Sonic network added to your wallet!");
    } catch (error: any) {
      toast.error(error.message);
      if (error.message.includes("install")) {
        window.open("https://rabby.io/", "_blank");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SonicButton
      onClick={handleAddNetwork}
      disabled={isLoading}
    >
      <div className="flex flex-row items-center gap-1">
        {isLoading ? "Adding..." : "Add Sonic"} <ArrowUpRight className="w-3 h-3" />
      </div>
    </SonicButton>
  );
}; 
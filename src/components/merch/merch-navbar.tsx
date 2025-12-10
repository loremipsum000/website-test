"use client";

import Image from "next/image";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export function MerchNavbar() {
  const [currency, setCurrency] = useState("USD");
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);

  return (
    <nav className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image src="/sonic-logo.svg" alt="Sonic Logo" width={60} height={22} className="h-8 w-auto sm:h-10 sm:w-auto" style={{ height: '2rem', width: 'auto' }} />
          <div className="h-8 w-px bg-gray-600 mx-2" />
          <Image src="/images/merch/Gasly-logo.svg" alt="Gasly Logo" height={22} width={60} className="h-8 w-auto sm:h-10 sm:w-auto" style={{ height: '2rem', width: 'auto' }} />
        </div>
        {/* Right side: Only cart on mobile, all items on desktop */}
        <div className="flex items-center">
          {/* Desktop: show all nav items inline */}
          <div className="hidden sm:flex items-center space-x-8">
            <a href="https://soniclabs.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium text-base whitespace-nowrap">Sonic website</a>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-[70px] bg-transparent border-gray-600 text-white">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <div className="group rounded-full transition hover:bg-gray-700/30 p-1 cursor-pointer">
              <Image src="/images/merch/User.svg" alt="User Account" width={24} height={24} className="ml-2" />
            </div>
            <div className="group rounded-full transition hover:bg-gray-700/30 p-1 cursor-pointer">
              <Image src="/images/merch/cart.svg" alt="Cart" width={24} height={24} className="ml-2" />
            </div>
          </div>
          {/* Mobile: only cart icon visible, dropdown for all other items */}
          <div className="relative flex sm:hidden items-center">
            <button
              className="group rounded-full transition hover:bg-gray-700/30 p-1 cursor-pointer flex items-center"
              onClick={() => setIconDropdownOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Image src="/images/merch/cart.svg" alt="Cart" width={24} height={24} className="ml-2" />
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${iconDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {iconDropdownOpen && (
              <div className="absolute right-0 left-auto top-full mt-2 bg-black border border-gray-700 rounded-lg shadow-lg py-2 px-4 z-50 flex flex-col items-start min-w-[180px] w-max">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full bg-transparent border-gray-600 text-white my-2">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <button className="flex items-center w-full py-2 hover:bg-gray-700/30 rounded transition">
                  <Image src="/images/merch/User.svg" alt="User Account" width={24} height={24} className="mr-2" />
                  <span className="text-white text-sm">Account</span>
                </button>
                <div className="w-full h-px bg-gray-700 my-2" />
                <a href="https://soniclabs.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium text-base py-2 w-full text-left">Sonic website</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
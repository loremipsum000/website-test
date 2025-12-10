"use client";

import Image from "next/image";

export default function MerchHero() {
  return (
    <div className="relative w-full h-[500px]!important overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/merch/bg.jpg"
          alt="Racing checkered flag background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Sonic & Gasly Merch
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Official merchandise from the collaboration between Sonic and F1 racer Pierre Gasly. Wear the speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#featured-products" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 text-center"
            >
              Shop Now
            </a>
            <a 
              href="#collection" 
              className="bg-transparent border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white/10 transition duration-300 text-center"
            >
              View Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
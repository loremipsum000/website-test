'use client';

import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface BrandBannerProps {
  className?: string;
  children: ReactNode;
}

/**
 * A reusable banner component with Sonic's brand gradient
 */
export const BrandBanner: React.FC<BrandBannerProps> = ({ className, children }) => {
  return (
    <div 
      className={cn(
        "w-full bg-gradient-sonic-horizontal animate-gradient bg-gradient-nav-banner text-white py-2.5 sm:py-3 relative overflow-hidden", 
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-white/40 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-12 w-36 h-36 rounded-full bg-sonic-white/40 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto flex items-center justify-between gap-2 px-3 sm:px-4 relative z-10">
        {children}
      </div>
    </div>
  );
};

/**
 * Text content component for the BrandBanner
 */
export const BrandBannerText: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("flex-1 text-center sm:text-left text-xs sm:text-sm flex items-center", className)}>
      {children}
    </div>
  );
};

/**
 * Actions container component for the BrandBanner
 */
export const BrandBannerActions: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
      {children}
    </div>
  );
}; 
'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Simple banner component for the Sonic Summit
interface SummitBannerProps {
  className?: string;
}

export const SummitBanner: React.FC<SummitBannerProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  
  // Only show banner after hydration to prevent SSR issues
  useEffect(() => {
    setIsClient(true);
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('summitBannerClosed');
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  // Load iframe script when the modal opens
  useEffect(() => {
    if (isModalOpen && isClient) {
      const script = document.createElement('script');
      script.src = 'https://idloom.events/js/iframed.min.js';
      script.async = true;
      
      // Append script to document body
      document.body.appendChild(script);
      
      // Clean up on modal close
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isModalOpen, isClient]);

  const handleClose = () => {
    setIsVisible(false);
    // Remember that user closed the banner
    localStorage.setItem('summitBannerClosed', 'true');
  };

  if (!isClient || !isVisible) return null;

  return (
    <div 
      className={cn(
        "w-full text-white py-2.5 sm:py-3 relative overflow-hidden",
        className
      )}
      style={{ 
        background: "linear-gradient(304deg, #FFCB67 0%, #ED5409 34.85%, #506179 63.64%, #214E81 83.85%, #102D3C 100%)",
        backgroundSize: "100% 100%"
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-white/40 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-12 w-36 h-36 rounded-full bg-sonic-white/40 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-3 sm:px-4 relative z-10">
        <div className="flex-1 text-center sm:text-left text-xs sm:text-sm flex items-center">
          <span className="hidden sm:inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-sonic-white">
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="font-bold">Sonic Summit Vienna:</span>
            <span className="ml-1.5">May 6-8, 2025 — Secure your spot today!</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="bg-white hover:bg-white/90 text-sonic-black rounded-full px-4 py-1 text-xs font-semibold h-auto min-h-0 shadow-lg shadow-black/20 hover:shadow-black/30 transition-all hover:scale-105 border border-white/80"
              >
                <span className="flex items-center gap-1.5">
                  <span>Buy Tickets</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl p-0 h-[90vh] bg-[#141416] border-white/10">
              <DialogHeader className="p-8 border-b border-white/10">
                <DialogTitle className="text-white text-xl">Register for Sonic Summit</DialogTitle>
              </DialogHeader>
              <div 
                id="idloomForm" 
                data-src="https://idloom.events" 
                className="w-full h-[calc(90vh-89px)] p-4"
              >
                <iframe 
                  ref={iframeRef}
                  id="idloomFrame" 
                  src="https://first-event.idloom.events/sonic-summit/register" 
                  style={{ width: '100%', height: '100%', border: 0 }}
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
          <button 
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            aria-label="Close banner"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 
'use client';

import { useEffect, useRef } from "react";

interface OnramperWidgetProps {
  className?: string;
  onClose?: () => void;
}

export function OnramperWidget({ className = "", onClose }: OnramperWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Apply dark theme when component mounts
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: "change-theme",
        id: "change-theme",
        theme: {
          primaryColor: '#ED5409', // Sonic primary color
          secondaryColor: '#102D3C', // Dark background matching Sonic theme
          primaryTextColor: '#ffffff', // White text
          secondaryTextColor: '#506179', // Sonic secondary text color
          containerColor: '#000000', // Black background
          cardColor: '#102D3C', // Sonic dark blue
          primaryBtnTextColor: '#ffffff', // White text on buttons
          borderRadius: '0.5rem',
          widgetBorderRadius: '1rem',
        },
      }, "*");
    }
  }, []);

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <iframe
        ref={iframeRef}
        src="https://buy.onramper.com/?apiKey=pk_prod_01JJPWKC2AB5GDW5N11GZ2A0Q4&onlyCryptos=sonic_sonic&themeName=dark&defaultCrypto=sonic_sonic&title=Buy%20Sonic"
        title="Buy Sonic"
        className="w-full flex-1 min-h-0 border-0 rounded-lg bg-black"
        allow="accelerometer; autoplay; camera; gyroscope; payment"
      />
    </div>
  );
} 
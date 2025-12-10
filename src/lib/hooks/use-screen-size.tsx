"use client";

import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial size
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return screenSize;
};

export function useAspectRatio() {
  const screenSize = useScreenSize();
  return screenSize.width / screenSize.height;
}

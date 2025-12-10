"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from './event-photo-carousel.module.css';

export const EventPhotoCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Create array of all 21 images
  const images = Array.from({ length: 21 }, (_, i) => {
    const index = String(i + 1).padStart(2, '0');
    return {
      id: index,
      jpgSrc: `/images/summit25/carousel/Sonic-World-summit-2025-${index}.jpg`,
      jpegSrc: `/images/summit25/carousel/Sonic-World-summit-2025-${index}.jpeg`,
      alt: `Event photo ${i + 1}`
    };
  });

  const handleImageError = (id: string, isJpg: boolean) => {
    setImageErrors(prev => ({
      ...prev,
      [`${id}-${isJpg ? 'jpg' : 'jpeg'}`]: true
    }));
  };

  const getImageSrc = (image: typeof images[0], isJpg = true) => {
    const key = `${image.id}-${isJpg ? 'jpg' : 'jpeg'}`;
    if (imageErrors[key]) {
      return isJpg ? image.jpegSrc : image.jpgSrc;
    }
    return isJpg ? image.jpgSrc : image.jpegSrc;
  };

  // Split images into two rows
  const topRow = images.slice(0, 5);
  const bottomRow = images.slice(5, 10);

  // Auto-move effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        if (prev >= 1400) { // Width of 5 images (280px * 5)
          return 0;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel - Auto-moving but not user scrollable */}
      <div className="relative w-full">
        <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden">
          {/* Top Row */}
          <div className="flex gap-3 sm:gap-4 min-w-max" style={{ transform: `translateX(-${scrollPosition}px)` }}>
            {/* First set */}
            {topRow.map((image, i) => (
              <div 
                key={`top-1-${i}`} 
                className="w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] rounded-xl overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 4px 20px rgba(20, 20, 22, 0.5)' }}
              >
                <Image
                  src={getImageSrc(image)}
                  alt={image.alt}
                  width={280}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image.id, true)}
                />
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {topRow.map((image, i) => (
              <div 
                key={`top-2-${i}`} 
                className="w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] rounded-xl overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 4px 20px rgba(20, 20, 22, 0.5)' }}
              >
                <Image
                  src={getImageSrc(image)}
                  alt={image.alt}
                  width={280}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image.id, true)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div 
            className="flex gap-3 sm:gap-4 min-w-max" 
            style={{ 
              transform: `translateX(${100 - scrollPosition}px)` 
            }}
          >
            {/* First set */}
            {bottomRow.map((image, i) => (
              <div 
                key={`bottom-1-${i}`} 
                className="w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] rounded-xl overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 4px 20px rgba(20, 20, 22, 0.5)' }}
              >
                <Image
                  src={getImageSrc(image)}
                  alt={image.alt}
                  width={280}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image.id, true)}
                />
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {bottomRow.map((image, i) => (
              <div 
                key={`bottom-2-${i}`} 
                className="w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] rounded-xl overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 4px 20px rgba(20, 20, 22, 0.5)' }}
              >
                <Image
                  src={getImageSrc(image)}
                  alt={image.alt}
                  width={280}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image.id, true)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#141416] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#141416] to-transparent z-10" />
      </div>
    </div>
  );
};

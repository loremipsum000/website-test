'use client';

import React, { useEffect, useRef } from 'react';
import { BrandBanner } from './brand-banner';
import { BrandBannerText } from './brand-banner';

interface CalendarEmbedProps {
  title?: string;
  className?: string;
}

export const CalendarEmbed: React.FC<CalendarEmbedProps> = ({ 
  title = "Upcoming Events",
  className 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const resizeIframe = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      // Initial height to prevent content jump
      iframe.style.height = '600px';

      try {
        // Add event listener for iframe content load
        iframe.addEventListener('load', () => {
          try {
            setTimeout(() => {
              if (iframe.contentWindow?.document?.body?.scrollHeight) {
                iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
              }
            }, 500);
          } catch (e) {
            console.error('Error resizing iframe:', e);
          }
        });

        // Add window resize listener
        const handleResize = () => {
          try {
            setTimeout(() => {
              if (iframe.contentWindow?.document?.body?.scrollHeight) {
                iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
              }
            }, 100);
          } catch (e) {
            console.error('Error resizing iframe on window resize:', e);
          }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      } catch (e) {
        console.error('Error setting up resize listeners:', e);
      }
    };

    resizeIframe();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <BrandBanner className="rounded-t-lg">
          <BrandBannerText className="text-center">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </BrandBannerText>
        </BrandBanner>
      )}
      
      <div className="relative">
        <iframe 
          ref={iframeRef}
          id="eventFrame"
          src="https://lu.ma/embed/calendar/cal-xWHani0ggxKeo82/events?lt=dark"
          width="100%"
          height="600"
          frameBorder="0"
          className="rounded-lg shadow-lg"
          style={{ 
            border: '1px solid rgba(191, 203, 218, 0.3)',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: title ? '0 0 8px 8px' : '8px',
            overflow: 'hidden'
          }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
    </div>
  );
}; 
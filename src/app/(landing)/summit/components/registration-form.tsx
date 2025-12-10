'use client';

import { useEffect, useRef } from 'react';

export const RegistrationForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the idloom script
    const script = document.createElement('script');
    script.src = 'https://idloom.events/js/iframed.min.js';
    script.async = true;
    
    // Append script to document body
    document.body.appendChild(script);
    
    // Clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      id="idloomForm" 
      data-src="https://idloom.events" 
      className="w-full"
      ref={containerRef}
    >
      <iframe 
        id="idloomFrame" 
        src="https://first-event.idloom.events/sonic-summit/register" 
        height="800"
        style={{ width: '100%', border: 0 }}
      ></iframe>
    </div>
  );
}; 
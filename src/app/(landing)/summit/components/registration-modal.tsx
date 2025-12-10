'use client';

import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

// Custom DialogContent with white close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-32px)] max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#141416] border-white/10 shadow-lg duration-200 rounded-[24px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] p-0 h-[90vh] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-sm ring-offset-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-50">
        <X className="h-6 w-6 text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = "CustomDialogContent";

export const RegistrationModal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerHeight = 73; // Height of the header in pixels (including padding and border)

  useEffect(() => {
    // Only load the script when the dialog is open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state' && 
            containerRef.current?.closest('[data-state="open"]')) {
          // Load the idloom script
          const script = document.createElement('script');
          script.src = 'https://idloom.events/js/iframed.min.js';
          script.async = true;
          
          // Append script to document body
          document.body.appendChild(script);
          
          // Clean up when dialog closes
          const cleanup = () => {
            if (document.body.contains(script)) {
              document.body.removeChild(script);
            }
          };
          
          // Disconnect observer after script is loaded
          observer.disconnect();
          
          return cleanup;
        }
      });
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current.closest('[role="dialog"]') || document.body, {
        attributes: true,
        subtree: true
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-white hover:bg-white/90 text-black font-medium rounded-full px-6 py-3 text-base"
        >
          Download Media
        </Button>
      </DialogTrigger>
      <CustomDialogContent>
        <DialogHeader className="p-8 border-b border-white/10">
          <DialogTitle className="text-white text-xl">Register for Sonic Summit</DialogTitle>
        </DialogHeader>
        <div 
          id="idloomForm" 
          data-src="https://idloom.events" 
          className="w-full h-[calc(90vh-89px)] flex-grow p-4"
          ref={containerRef}
        >
          <iframe 
            id="idloomFrame" 
            src="https://first-event.idloom.events/sonic-summit/register" 
            style={{ width: '100%', height: '100%', border: 0 }}
          ></iframe>
        </div>
      </CustomDialogContent>
    </Dialog>
  );
}; 
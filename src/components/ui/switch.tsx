"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const switchRailVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        default: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        default:
          "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchRailVariants> {
  indeterminate?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, indeterminate = false, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      switchRailVariants({ size }),
      indeterminate
        ? "bg-primary"
        : "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = "Switch";

export { Switch };

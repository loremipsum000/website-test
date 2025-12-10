import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Shimmer } from "./shimmer";

const buttonVariants = cva(
  "tracking-normal inline-flex whitespace-nowrap backdrop-blur items-center justify-center gap-x-1 py-2 px-6 rounded-full font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&>svg]:stroke-[3px]",
  {
    variants: {
      variant: {
        primary: "text-button-foreground bg-button/[0.16] hover:bg-button/[0.24] transition focus-visible:ring-button",
        secondary: "pl-0 text-shade-3 theme-dark:text-shade-light focus-visible:ring-shade-3",
        default: "bg-white text-black rounded-md",
      },
      size: {
        sm: "text-body-sm",
        md: "text-body",
        lg: "text-body",
        xl: "text-body",
        "2xl": "text-body-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const classNames = cn(buttonVariants({ variant, size }));

    return <Comp className={cn(classNames, className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

interface SonicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "icon";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animated?: boolean;
}

export const SonicButton = React.forwardRef<HTMLButtonElement, SonicButtonProps>(
  ({ className, asChild = false, variant = "default", size = "md", animated = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const sizeClasses = {
      sm: variant === "icon" ? "p-0.5" : "px-2 py-0.5 text-xs",
      md: variant === "icon" ? "p-1" : "px-3 py-1 text-body-sm",
      lg: variant === "icon" ? "p-1.5" : "px-4 py-1.5 text-body",
      xl: variant === "icon" ? "p-2" : "px-5 py-2 text-body",
      "2xl": variant === "icon" ? "p-2.5" : "px-6 py-2.5 text-body",
    }[size];

    return (
      <Comp
        className={cn("relative inline-block group", variant === "icon" && "aspect-square", className)}
        ref={ref}
        {...props}
      >
        {animated && (
          <div className="absolute inset-0 bg-gradient-sonic-mirrored animate-gradient rounded-full blur-sm group-hover:blur group-hover:brightness-125 transition" />
        )}
        <div
          className={cn(
            "relative overflow-hidden z-10 p-[1px] rounded-full",
            animated ? "bg-gradient-sonic-mirrored animate-gradient" : "bg-gradient-sonic-subtle",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center gap-x-2 bg-black/85 rounded-full group-hover:bg-black/75 transition",
              sizeClasses,
            )}
          >
            <span className={cn("text-white/85 font-medium group-hover:text-white transition")}>{children}</span>
          </div>
          <Shimmer className="absolute inset-0 z-20" />
        </div>
      </Comp>
    );
  },
);

SonicButton.displayName = "SonicGradientButton";

export { Button, buttonVariants };

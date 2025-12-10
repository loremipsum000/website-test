import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

const weightVariants = {
  light: { true: "font-light" },
  regular: { true: "font-normal" },
  medium: { true: "font-medium" },
  semibold: { true: "font-semibold" },
  bold: { true: "font-bold" },
  black: { true: "font-black" },
};

export const heading = cva("font-urbanist", {
  variants: {
    variant: {
      h1: "text-m-h1 md:text-t-h1 lg:text-d-h1",
      h2: "text-m-h2 md:text-t-h2 lg:text-d-h2",
      h3: "text-m-h3 md:text-t-h3 lg:text-d-h3",
      h4: "text-m-h4 md:text-t-h4 lg:text-d-h4",
      h5: "text-m-h5 md:text-t-h5 lg:text-d-h5",
      h6: "text-m-h6 md:text-t-h6 lg:text-d-h6",
    },
    leading: {
      none: "leading-none",
      normal: "leading-normal",
      tight: "leading-tight",
      relaxed: "leading-relaxed",
    },
    ...weightVariants,
  },
  compoundVariants: [
    {
      // variant: ["h1", "h2", "h3", "h4", "h5", "h6"],
      // className: "text-foreground",
    },
  ],
  defaultVariants: {
    variant: "h1",
    leading: "normal",
    medium: true,
  },
});

export const text = cva("font-urbanist", {
  variants: {
    size: {
      large:
        "text-m-body-large md:text-t-body-large lg:text-d-body-large leading-relaxed",
      base: "text-m-body md:text-t-body lg:text-d-body leading-relaxed",
      small:
        "text-m-body-small md:text-t-body-small lg:text-d-body-small leading-relaxed",
      micro: "text-m-micro md:text-t-micro lg:text-d-micro leading-relaxed",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
    },
    ...weightVariants,
  },
  defaultVariants: {
    size: "base",
    variant: "default",
    regular: true,
  },
});

export const caption = cva(
  "font-urbanist text-m-caption md:text-t-caption lg:text-d-caption leading-tight",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
      },
      ...weightVariants,
    },
    defaultVariants: {
      variant: "muted",
      medium: true,
    },
  }
);

export const label = cva(
  "text-g-label font-urbanist leading-normal tracking-normal text-foreground flex flex-col items-start gap-1.5",
  {
    variants: {
      ...weightVariants,
    },
    defaultVariants: {
      medium: true,
    },
  }
);

interface BaseProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

type WeightProp =
  | {
      regular?: true;
      light?: never;
      medium?: never;
      semibold?: never;
      bold?: never;
      black?: never;
    }
  | {
      regular?: never;
      light?: true;
      medium?: never;
      semibold?: never;
      bold?: never;
      black?: never;
    }
  | {
      regular?: never;
      light?: never;
      medium?: true;
      semibold?: never;
      bold?: never;
      black?: never;
    }
  | {
      regular?: never;
      light?: never;
      medium?: never;
      semibold?: true;
      bold?: never;
      black?: never;
    }
  | {
      regular?: never;
      light?: never;
      medium?: never;
      semibold?: never;
      bold?: true;
      black?: never;
    }
  | {
      regular?: never;
      light?: never;
      medium?: never;
      semibold?: never;
      bold?: never;
      black?: true;
    }
  | {
      regular?: never;
      light?: never;
      medium?: never;
      semibold?: never;
      bold?: never;
      black?: never;
    };

// Updated types
type HeadingProps = BaseProps &
  WeightProp & {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    leading?: "normal" | "tight" | "relaxed" | "none";
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

type TextProps = BaseProps &
  WeightProp & {
    size?: "large" | "base" | "small" | "micro";
    variant?: "default" | "muted" | "destructive" | "success" | "warning";
  };

type CaptionProps = BaseProps & WeightProp & VariantProps<typeof caption>;

type LabelProps = HTMLAttributes<HTMLLabelElement> &
  WeightProp & {
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
  };

// Component implementations with preserved typography styles
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { children, className, regular, medium, semibold, bold, black, ...props },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          label({ regular, medium, semibold, bold, black }),
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export function Heading({
  children,
  className,
  variant,
  leading = "normal",
  as: Component = "h1",
  regular,
  light,
  medium,
  semibold,
  bold,
  black,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        heading({
          variant,
          leading,
          regular,
          light,
          medium,
          semibold,
          bold,
          black,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Body({
  children,
  className,
  size,
  variant,
  regular,
  light,
  medium,
  semibold,
  bold,
  black,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        text({ size, variant, regular, light, medium, semibold, bold, black }),
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Caption({
  children,
  className,
  variant,
  regular,
  light,
  medium,
  semibold,
  bold,
  black,
  ...props
}: CaptionProps) {
  return (
    <span
      className={cn(
        caption({ variant, regular, light, medium, semibold, bold, black }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function H1(props: HeadingProps) {
  return <Heading variant="h1" as="h1" {...props} />;
}

export function H2(props: HeadingProps) {
  return <Heading variant="h2" as="h2" {...props} />;
}

export function H3(props: HeadingProps) {
  return <Heading variant="h3" as="h3" {...props} />;
}

export function H4(props: HeadingProps) {
  return <Heading variant="h4" as="h4" {...props} />;
}

export function H5(props: HeadingProps) {
  return <Heading variant="h5" as="h5" {...props} />;
}

export function H6(props: HeadingProps) {
  return <Heading variant="h6" as="h6" {...props} />;
}

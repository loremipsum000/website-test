import { PropsWithChildren } from "react";

interface FadeTagProps extends PropsWithChildren {
  rounded?: "full" | "xl" | "lg" | "md" | "sm" | "none";
  blur?: "none" | "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg";
}

export const FadeTag = ({
  children,
  rounded = "full",
  blur = "sm",
  padding = "md",
}: FadeTagProps) => {
  const paddingMap = {
    sm: "px-2 py-0.5",
    md: "px-3 py-1",
    lg: "px-4 py-2",
  };

  return (
    <div className="relative inline-block">
      <div
        className={`absolute inset-0 bg-gradient-sonic-mirrored animate-gradient rounded-${rounded} blur-${blur}`}
      />
      <div
        className={`relative z-10 p-[1px] rounded-${rounded} bg-gradient-sonic-mirrored animate-gradient`}
      >
        <div
          className={`flex items-center justify-center gap-x-2 ${paddingMap[padding]} bg-background/85 text-foreground rounded-${rounded}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

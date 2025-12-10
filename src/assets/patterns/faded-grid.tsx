import { SVGProps } from "react";

export const FadedGrid = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props}>
      <defs>
        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0" y2="100%">
          <stop offset="20%" stop-color="currentColor" stop-opacity="0" />
          <stop offset="100%" stop-color="currentColor" stop-opacity={0.4} />
        </linearGradient>
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          fill="white"
        >
          <circle cx="10" cy="10" r="1" fill="white" opacity={1} />
        </pattern>
        <mask id="gridMask">
          <rect width="100%" height="100%" fill="url(#grid)" />
        </mask>{" "}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#fadeGradient)"
        mask="url(#gridMask)"
      />
    </svg>
  );
};

export type BoomBackgroundProps = {
  className?: string;
  vignetteStrength?: number;
  gradientOpacity?: number;
  gridOpacity?: number;
  gridMaskOpacity?: number;
};

export const BoomBackground = ({
  className,
  vignetteStrength = 0.4,
  gradientOpacity = 1,
  gridMaskOpacity = 0.6,
  gridOpacity = 1,
}: BoomBackgroundProps) => {
  return (
    <div className={className}>
      <div className="absolute w-full h-full opacity-70">
        <svg
          width="100%"
          height="100%"
          x1="0%"
          x2="100%"
          y1="30%"
          y2="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgGradient">
              <stop offset="0%" stop-color="#102D3C" />
              <stop offset="20%" stop-color="#214E81" />
              <stop offset="50%" stop-color="#506179" />
              <stop offset="80%" stop-color="#ED5409" />
              <stop offset="100%" stop-color="#FFCB67" />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" />
            </filter>
          </defs>
          <circle
            cx="50%"
            r="100%"
            fill="url(#bgGradient)"
            opacity={gradientOpacity}
          />
        </svg>
      </div>
      <div className="absolute flex flex-wrap w-full h-full backdrop-blur-3xl">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0" y2="100%">
              <stop offset="20%" stop-color="white" stop-opacity="0" />
              <stop
                offset="100%"
                stop-color="white"
                stop-opacity={gridMaskOpacity}
              />
            </linearGradient>
            <radialGradient
              id="vignetteGradient"
              cx="0.8"
              cy="0"
              r="90%"
              fx="60%"
              fy="0%"
            >
              <stop offset="0%" stop-color="black" stop-opacity="0" />
              <stop
                offset="80%"
                stop-color="black"
                stop-opacity={vignetteStrength}
              />
            </radialGradient>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              fill="white"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill={"white"}
                opacity={gridOpacity}
              />
            </pattern>
            <mask id="vignettemask">
              <rect width="100%" height="100%" fill="url(#vignetteGradient)" />
            </mask>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#grid)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#fadeGradient)"
            mask="url(#gridMask)"
          />
          <rect
            width="100%"
            height="100%"
            fill="url(#vignetteGradient)"
            mask="url(#vignetteMask)"
          />
        </svg>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

interface SpikesProps {
  className?: string;
  direction?: "up" | "down";
}

export const Spikes = ({ className, direction = "up" }: SpikesProps) => {
  const scaleClass = direction === "up" ? "scale-y-100" : "-scale-y-100";

  return (
    <svg
      className={cn(scaleClass, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor="#141416" />
          <stop offset="0.15" stopColor="#102D3C" />
          <stop offset="0.36" stopColor="#506179" />
          <stop offset="0.45" stopColor="#FFA59D" />
          <stop offset="0.70" stopColor="#FFCB67" />
          <stop offset="1" stopColor="#214E81" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stop-color="#FFCB67" />
          <stop offset="0.35" stop-color="#ED5409" />
          <stop offset="0.64" stop-color="#506179" />
          <stop offset="0.84" stop-color="#214E81" />
          <stop offset="1" stop-color="#102D3C" />
        </linearGradient>
        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <pattern
          id="spikesPattern"
          patternUnits="userSpaceOnUse"
          width="8"
          height="281"
        >
          <path d="M 0 281 L 8 0 L 6 281 Z" fill="url(#fadeGradient)" />
        </pattern>
        <mask id="spikesMask">
          <rect width="100%" height="281" fill="url(#spikesPattern)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="281"
        className="fill-[url(#grad1)] theme-dark:fill-[url(#grad2)]"
        mask="url(#spikesMask)"
      />
    </svg>
  );
};

type LinesHorizontalProps = {
  className?: string;
  direction?: "up" | "down";
};

export const LinesHorizontal = ({
  className,
  direction = "down",
}: LinesHorizontalProps) => {
  const scaleClass = direction === "up" ? "scale-y-100" : "-scale-y-100";

  return (
    <svg
      className={cn(scaleClass, className)}
      width="100%"
      height="200"
      viewBox="0 0 100 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#102D3C" />
          <stop offset="0.161465" stopColor="#214E81" />
          <stop offset="0.363625" stopColor="#506179" />
          <stop offset="0.651499" stopColor="#ED5409" />
          <stop offset="1" stopColor="#FFCB67" />
        </linearGradient>
        <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stop-color="#FFCB67" />
          <stop offset="0.161465" stop-color="#ED5409" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#214E81" />
          <stop offset="1" stop-color="#102D3C" />
        </linearGradient>
        <mask id="rectanglesMask">
          <line x1="0" y1="0" x2="100" y2="0" stroke="white" stroke-width="1" />
          <line
            x1="0"
            y1="10"
            x2="100"
            y2="10"
            stroke="white"
            stroke-width="1"
          />
          <line
            x1="0"
            y1="20"
            x2="100"
            y2="20"
            stroke="white"
            stroke-width="1.5"
          />
          <line
            x1="0"
            y1="30"
            x2="100"
            y2="30"
            stroke="white"
            stroke-width="2"
          />
          <line
            x1="0"
            y1="40"
            x2="100"
            y2="40"
            stroke="white"
            stroke-width="2.5"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="white"
            stroke-width="3"
          />
          <line
            x1="0"
            y1="60"
            x2="100"
            y2="60"
            stroke="white"
            stroke-width="3.5"
          />
          <line
            x1="0"
            y1="70"
            x2="100"
            y2="70"
            stroke="white"
            stroke-width="4"
          />
          <line
            x1="0"
            y1="80"
            x2="100"
            y2="80"
            stroke="white"
            stroke-width="4.5"
          />
          <line
            x1="0"
            y1="90"
            x2="100"
            y2="90"
            stroke="white"
            stroke-width="5"
          />
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="100"
            stroke="white"
            stroke-width="5.5"
          />
          <line
            x1="0"
            y1="110"
            x2="100"
            y2="110"
            stroke="white"
            stroke-width="6"
          />
          <line
            x1="0"
            y1="120"
            x2="100"
            y2="120"
            stroke="white"
            stroke-width="6.5"
          />
          <line
            x1="0"
            y1="130"
            x2="100"
            y2="130"
            stroke="white"
            stroke-width="7"
          />
          <line
            x1="0"
            y1="140"
            x2="100"
            y2="140"
            stroke="white"
            stroke-width="7.5"
          />
          <line
            x1="0"
            y1="150"
            x2="100"
            y2="150"
            stroke="white"
            stroke-width="8"
          />
          <line
            x1="0"
            y1="160"
            x2="100"
            y2="160"
            stroke="white"
            stroke-width="8.5"
          />
          <line
            x1="0"
            y1="170"
            x2="100"
            y2="170"
            stroke="white"
            stroke-width="9"
          />
          <line
            x1="0"
            y1="180"
            x2="100"
            y2="180"
            stroke="white"
            stroke-width="9.5"
          />
          <line
            x1="0"
            y1="190"
            x2="100"
            y2="190"
            stroke="white"
            stroke-width="10"
          />
          <line
            x1="0"
            y1="200"
            x2="100"
            y2="200"
            stroke="white"
            stroke-width="10.5"
          />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        className="fill-[url(#grad-light)] theme-dark:fill-[url(#grad-dark)]"
        mask="url(#rectanglesMask)"
      />
    </svg>
  );
};

export const SonicMask = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1312 286.22"
    >
      <path d="M188.914 131.752C176.063 125.532 159.649 122.381 140.165 122.381H84.7295C69.9594 122.381 58.1487 118.27 49.7087 110.351L49.2975 109.94C41.0493 101.253 37.076 91.4703 37.076 80.0434C37.076 68.6164 41.1863 58.0663 49.2975 49.5166C57.4636 40.8299 68.6713 36.4454 82.4823 36.4454H218.893V6.823H77.4128C62.0399 6.823 48.8318 10.3854 37.0212 17.6471C25.2106 24.5526 16.2771 33.4585 9.75521 44.8033C3.23335 56.1755 0 68.2053 0 81.6875C0 97.4989 3.37035 110.899 10.084 121.586C17.291 132.465 26.8546 140.604 39.268 146.55C52.1747 152.031 67.4931 154.826 84.7295 154.826H143.042C152.852 154.826 161.594 157.073 168.993 161.539C176.556 165.568 182.173 171.322 185.9 178.639C189.545 185.489 191.244 192.45 191.244 200.616C191.244 208.782 189.243 216.975 185.27 224.429C181.297 231.965 175.186 238.24 167.212 243.172C159.731 247.612 150.578 249.804 140.22 249.804H8.96076V279.372H146.468C162.937 279.372 176.83 275.672 188.969 268.082C201.602 260.409 211.083 250.845 218.016 238.651C225.031 226.128 228.375 213.139 228.375 198.889C228.375 182.338 224.867 168.171 218.071 156.936C211.686 145.865 202.123 137.562 188.942 131.698L188.86 131.752H188.914Z"></path>
      <path d="M514.619 19.2368C493.327 6.49446 468.335 0 440.385 0C412.434 0 387.497 6.49447 366.068 19.2916C344.694 31.6777 327.54 48.9962 315.044 70.7541C302.549 92.0461 296.219 116.407 296.219 143.098C296.219 169.788 302.549 194.423 315.044 216.044C327.54 237.391 344.722 254.709 366.068 267.506C386.456 279.427 410.297 285.702 436.822 286.195H440.385C468.335 286.25 493.272 280.029 514.619 267.589C536.404 254.791 553.558 237.473 565.725 216.208C578.221 194.505 584.551 169.952 584.551 143.207C584.551 116.462 578.221 91.4706 565.725 70.1786C553.558 48.8866 536.404 31.7873 514.619 19.3464V19.2642V19.2368ZM546.845 143.18C546.845 164.253 542.378 183.626 533.527 200.808C524.676 217.715 512.18 231.335 496.451 241.391C480.777 251.394 461.348 256.655 440.33 256.655C419.312 256.655 400.486 251.531 384.209 241.391C368.48 231.335 355.984 217.661 347.051 200.753C338.255 183.654 333.733 164.28 333.733 143.207C333.733 122.134 338.2 102.98 347.051 86.2093C355.902 68.8907 368.48 54.9975 384.291 44.9406C400.486 34.8016 419.394 29.7595 440.33 29.7595C461.266 29.7595 480.503 34.8838 496.451 45.0228C512.262 55.1619 524.758 68.9729 533.609 86.1545C542.405 102.98 546.927 122.134 546.927 143.235H546.845V143.18Z"></path>
      <path d="M859.537 15.4819C840.712 5.28809 818.543 0.081543 793.524 0.081543C768.505 0.081543 746.61 5.28808 727.374 15.6189C708.082 25.5388 693.312 39.2402 682.241 57.2986C671.664 75.2201 666.293 96.5121 666.293 120.599V279.481H703.396V121.147C703.396 102.541 707.589 86.1812 715.837 72.6168C724.359 58.8058 735.622 48.0639 749.296 40.5829C763.162 33.2664 778.014 29.567 793.524 29.567C809.034 29.567 823.749 33.2664 837.204 40.5829C851.152 47.9817 862.414 58.7236 870.718 72.6716C879.295 86.2086 883.624 102.431 883.624 121.038V279.371H920.782V120.49C920.782 96.4847 915.22 75.1105 904.286 57.189C893.571 39.0484 878.938 25.4292 859.565 15.3723L859.51 15.4545L859.537 15.4819Z"></path>
      <path d="M1055.97 6.7959H1018.32V279.427H1055.97V6.7959Z"></path>
      <path d="M1227.98 50.9967C1244.53 41.3509 1263.28 36.4184 1283.83 36.4184H1312V6.7959H1285.56C1257.19 6.7959 1231.49 12.9615 1209.38 25.0736C1187.26 37.1308 1169.53 53.7369 1156.63 74.3439C1143.86 94.4575 1137.39 117.586 1137.39 143.125C1137.39 168.664 1143.86 191.902 1156.63 212.454C1169.48 232.705 1187.26 249.064 1209.38 261.176C1228.75 271.699 1266.68 279.454 1283.64 279.454H1312V249.832H1283.83C1263.36 249.832 1244.53 245.118 1227.93 235.801C1211.84 226.156 1198.74 213.084 1189.04 196.999C1179.78 180.859 1175.04 162.718 1175.04 143.07C1175.04 123.422 1179.78 105.227 1189.13 89.0866C1198.74 73.0833 1211.87 60.204 1228.01 50.9693V51.0515L1227.98 50.9967Z"></path>
    </svg>
  );
};

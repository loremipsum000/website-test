import { cn } from "@/lib/utils";

interface MainnetMeshBackgroundProps extends React.SVGProps<SVGSVGElement> {}

export const MainnetMeshBackground = ({
  className,
  ...props
}: MainnetMeshBackgroundProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 860"
      fill="none"
      className={cn("w-full h-full", className)}
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        objectFit: "cover",
        inset: 0,
      }}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <rect width="1440" height="860" fill="#1E1E1E" />
      <path
        d="M-18762 -605C-18762 -606.105 -18761.1 -607 -18760 -607H4747C4748.11 -607 4749 -606.105 4749 -605V7465C4749 7466.1 4748.11 7467 4747 7467H-18760C-18761.1 7467 -18762 7466.1 -18762 7465V-605Z"
        fill="#444444"
      />
      <path
        d="M-18760 -606H4747V-608H-18760V-606ZM4748 -605V7465H4750V-605H4748ZM4747 7466H-18760V7468H4747V7466ZM-18761 7465V-605H-18763V7465H-18761ZM-18760 7466C-18760.6 7466 -18761 7465.55 -18761 7465H-18763C-18763 7466.66 -18761.7 7468 -18760 7468V7466ZM4748 7465C4748 7465.55 4747.55 7466 4747 7466V7468C4748.66 7468 4750 7466.66 4750 7465H4748ZM4747 -606C4747.55 -606 4748 -605.552 4748 -605H4750C4750 -606.657 4748.66 -608 4747 -608V-606ZM-18760 -608C-18761.7 -608 -18763 -606.657 -18763 -605H-18761C-18761 -605.552 -18760.6 -606 -18760 -606V-608Z"
        fill="white"
        fill-opacity="0.1"
      />
      <g clip-path="url(#clip0_1_52)">
        <rect
          width="1440"
          height="5932"
          transform="translate(0 -88)"
          fill="#FFF3E6"
        />
        <g clip-path="url(#clip1_1_52)">
          <rect
            width="1440"
            height="146"
            transform="translate(0 814)"
            fill="#141416"
          />
        </g>
        <path
          d="M262.622 151.754C249.77 145.533 233.356 142.382 213.872 142.382H158.436C143.666 142.382 131.856 138.272 123.416 130.352L123.005 129.941C114.756 121.254 110.783 111.472 110.783 100.045C110.783 88.6176 114.893 78.0675 123.005 69.5178C131.171 60.8311 142.378 56.4467 156.189 56.4467H292.6V26.8242H151.12C135.747 26.8242 122.539 30.3866 110.728 37.6483C98.9176 44.5538 89.9841 53.4598 83.4622 64.8045C76.9404 76.1767 73.707 88.2065 73.707 101.689C73.707 117.5 77.0774 130.9 83.7911 141.587C90.998 152.466 100.562 160.605 112.975 166.551C125.882 172.032 141.2 174.827 158.436 174.827H216.749C226.56 174.827 235.301 177.074 242.7 181.541C250.263 185.569 255.881 191.323 259.607 198.64C263.252 205.491 264.951 212.451 264.951 220.617C264.951 228.783 262.95 236.977 258.977 244.43C255.004 251.966 248.893 258.241 240.919 263.174C233.438 267.613 224.285 269.805 213.927 269.805H82.6678V299.373H220.175C236.644 299.373 250.537 295.673 262.676 288.083C275.309 280.41 284.79 270.846 291.723 258.652C298.738 246.129 302.082 233.14 302.082 218.891C302.082 202.339 298.574 188.172 291.778 176.937C285.393 165.866 275.83 157.563 262.649 151.699L262.567 151.754H262.622Z"
          fill="#FFECD4"
        />
        <path
          d="M589.619 39.2368C568.327 26.4945 543.335 20 515.385 20C487.434 20 462.497 26.4945 441.068 39.2916C419.694 51.6777 402.54 68.9962 390.044 90.7541C377.549 112.046 371.219 136.407 371.219 163.098C371.219 189.788 377.549 214.423 390.044 236.044C402.54 257.391 419.722 274.709 441.068 287.506C461.456 299.427 485.297 305.702 511.822 306.195H515.385C543.335 306.25 568.272 300.029 589.619 287.589C611.404 274.791 628.558 257.473 640.725 236.208C653.221 214.505 659.551 189.952 659.551 163.207C659.551 136.462 653.221 111.471 640.725 90.1786C628.558 68.8866 611.404 51.7873 589.619 39.3464V39.2642V39.2368ZM621.845 163.18C621.845 184.253 617.378 203.626 608.527 220.808C599.676 237.715 587.18 251.335 571.451 261.391C555.777 271.394 536.348 276.655 515.33 276.655C494.312 276.655 475.486 271.531 459.209 261.391C443.48 251.335 430.984 237.661 422.051 220.753C413.255 203.654 408.733 184.28 408.733 163.207C408.733 142.134 413.2 122.98 422.051 106.209C430.902 88.8907 443.48 74.9975 459.291 64.9406C475.486 54.8016 494.394 49.7595 515.33 49.7595C536.266 49.7595 555.503 54.8838 571.451 65.0228C587.262 75.1619 599.758 88.9729 608.609 106.154C617.405 122.98 621.927 142.134 621.927 163.235H621.845V163.18Z"
          fill="#FFECD4"
        />
        <path
          d="M934.541 35.4824C915.716 25.2886 893.546 20.082 868.528 20.082C843.509 20.082 821.614 25.2886 802.377 35.6194C783.086 45.5393 768.316 59.2407 757.245 77.2991C746.668 95.2206 741.297 116.513 741.297 140.6V299.481H778.4V141.148C778.4 122.541 782.593 106.182 790.841 92.6173C799.363 78.8063 810.626 68.0644 824.3 60.5834C838.165 53.2669 853.018 49.5675 868.528 49.5675C884.038 49.5675 898.753 53.2669 912.208 60.5834C926.156 67.9822 937.418 78.7241 945.721 92.6721C954.298 106.209 958.628 122.432 958.628 141.038V299.372H995.786V140.49C995.786 116.485 990.224 95.111 979.29 77.1895C968.575 59.0488 953.942 45.4297 934.569 35.3728L934.514 35.455L934.541 35.4824Z"
          fill="#FFECD4"
        />
        <path
          d="M1130.98 26.7949H1093.32V299.426H1130.98V26.7949Z"
          fill="#FFECD4"
        />
        <path
          d="M1302.98 70.9957C1319.54 61.3499 1338.28 56.4174 1358.83 56.4174H1387V26.7949H1360.56C1332.2 26.7949 1306.49 32.9606 1284.38 45.0726C1262.26 57.1299 1244.53 73.736 1231.63 94.3429C1218.86 114.457 1212.39 137.585 1212.39 163.124C1212.39 188.663 1218.86 211.901 1231.63 232.453C1244.48 252.704 1262.26 269.063 1284.38 281.175C1303.75 291.698 1341.68 299.453 1358.64 299.453H1387V269.831H1358.83C1338.36 269.831 1319.54 265.117 1302.93 255.8C1286.84 246.155 1273.75 233.083 1264.04 216.998C1254.78 200.858 1250.04 182.717 1250.04 163.069C1250.04 143.421 1254.78 125.226 1264.13 109.086C1273.75 93.0824 1286.87 80.203 1303.01 70.9683V71.0505L1302.98 70.9957Z"
          fill="#FFECD4"
        />
        <g clip-path="url(#clip2_1_52)">
          <rect width="1440" height="860" fill="url(#paint0_linear_1_52)" />
          <g opacity="0.3" filter="url(#filter0_f_1_52)">
            <circle
              cx="1393.49"
              cy="-56.337"
              r="436.606"
              fill="url(#paint1_linear_1_52)"
            />
            <circle
              cx="1393.49"
              cy="-56.337"
              r="436.606"
              fill="url(#paint2_linear_1_52)"
            />
          </g>
          <g opacity="0.2" filter="url(#filter1_f_1_52)">
            <circle
              cx="-41.6611"
              cy="772.456"
              r="436.606"
              transform="rotate(50.6136 -41.6611 772.456)"
              fill="url(#paint3_linear_1_52)"
            />
            <circle
              cx="-41.6611"
              cy="772.456"
              r="436.606"
              transform="rotate(50.6136 -41.6611 772.456)"
              fill="url(#paint4_linear_1_52)"
            />
          </g>
          <g opacity="0.1" filter="url(#filter2_f_1_52)">
            <circle
              cx="142.697"
              cy="341.255"
              r="436.606"
              transform="rotate(-122.482 142.697 341.255)"
              fill="url(#paint5_linear_1_52)"
            />
            <circle
              cx="142.697"
              cy="341.255"
              r="436.606"
              transform="rotate(-122.482 142.697 341.255)"
              fill="url(#paint6_linear_1_52)"
            />
          </g>
          <g opacity="0.16" filter="url(#filter3_f_1_52)">
            <circle
              cx="589.362"
              cy="797.033"
              r="436.606"
              transform="rotate(-21.456 589.362 797.033)"
              fill="url(#paint7_linear_1_52)"
            />
            <circle
              cx="589.362"
              cy="797.033"
              r="436.606"
              transform="rotate(-21.456 589.362 797.033)"
              fill="url(#paint8_linear_1_52)"
            />
          </g>
          <g opacity="0.3" filter="url(#filter4_f_1_52)">
            <circle
              cx="1346.26"
              cy="806.096"
              r="436.606"
              transform="rotate(-168.892 1346.26 806.096)"
              fill="url(#paint9_linear_1_52)"
            />
            <circle
              cx="1346.26"
              cy="806.096"
              r="436.606"
              transform="rotate(-168.892 1346.26 806.096)"
              fill="url(#paint10_linear_1_52)"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_1_52"
          x="634.751"
          y="-815.079"
          width="1517.48"
          height="1517.48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1_52"
          />
        </filter>
        <filter
          id="filter1_f_1_52"
          x="-800.417"
          y="13.702"
          width="1517.51"
          height="1517.51"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1_52"
          />
        </filter>
        <filter
          id="filter2_f_1_52"
          x="-616.101"
          y="-417.542"
          width="1517.6"
          height="1517.59"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1_52"
          />
        </filter>
        <filter
          id="filter3_f_1_52"
          x="-169.495"
          y="38.1746"
          width="1517.72"
          height="1517.72"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1_52"
          />
        </filter>
        <filter
          id="filter4_f_1_52"
          x="587.438"
          y="47.2723"
          width="1517.65"
          height="1517.65"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_1_52"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1_52"
          x1="720"
          y1="0"
          x2="720"
          y2="860"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#141416" />
          <stop offset="1" stop-color="#030104" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_52"
          x1="1393.49"
          y1="-492.943"
          x2="1393.49"
          y2="380.269"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4433" />
          <stop offset="1" stop-color="#99291F" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_52"
          x1="1554.28"
          y1="380.269"
          x2="1189.53"
          y2="-353.369"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#102D3C" />
          <stop offset="0.161465" stop-color="#214E81" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#ED5409" />
          <stop offset="1" stop-color="#FFCB67" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1_52"
          x1="-41.6611"
          y1="335.85"
          x2="-41.6611"
          y2="1209.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4433" />
          <stop offset="1" stop-color="#99291F" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1_52"
          x1="119.125"
          y1="1209.06"
          x2="-245.626"
          y2="475.424"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#102D3C" />
          <stop offset="0.161465" stop-color="#214E81" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#ED5409" />
          <stop offset="1" stop-color="#FFCB67" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_1_52"
          x1="142.697"
          y1="-95.3517"
          x2="142.697"
          y2="777.861"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4433" />
          <stop offset="1" stop-color="#99291F" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_1_52"
          x1="303.483"
          y1="777.861"
          x2="-61.2683"
          y2="44.2228"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#102D3C" />
          <stop offset="0.161465" stop-color="#214E81" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#ED5409" stop-opacity="0.3" />
          <stop offset="1" stop-color="#FFCB67" stop-opacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_1_52"
          x1="589.362"
          y1="360.427"
          x2="589.362"
          y2="1233.64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4433" />
          <stop offset="1" stop-color="#99291F" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_1_52"
          x1="750.148"
          y1="1233.64"
          x2="385.397"
          y2="500.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#102D3C" />
          <stop offset="0.161465" stop-color="#214E81" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#ED5409" />
          <stop offset="1" stop-color="#FFCB67" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_1_52"
          x1="1346.26"
          y1="369.49"
          x2="1346.26"
          y2="1242.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF4433" />
          <stop offset="1" stop-color="#99291F" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_1_52"
          x1="1507.05"
          y1="1242.7"
          x2="1142.3"
          y2="509.065"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#102D3C" />
          <stop offset="0.161465" stop-color="#214E81" />
          <stop offset="0.363625" stop-color="#506179" />
          <stop offset="0.651499" stop-color="#ED5409" />
          <stop offset="1" stop-color="#FFCB67" />
        </linearGradient>
        <clipPath id="clip0_1_52">
          <rect
            width="1440"
            height="5932"
            fill="white"
            transform="translate(0 -88)"
          />
        </clipPath>
        <clipPath id="clip1_1_52">
          <rect
            width="1440"
            height="146"
            fill="white"
            transform="translate(0 814)"
          />
        </clipPath>
        <clipPath id="clip2_1_52">
          <rect width="1440" height="860" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

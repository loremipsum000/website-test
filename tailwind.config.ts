import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const createMirroredGradient = (colors: string[], angle = 0) => {
  const reversed = colors.slice().reverse();
  return `linear-gradient(${angle}deg, ${colors.join(", ")}, ${reversed.join(", ")})`;
};

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    // strokeWidth: {
    //   DEFAULT: "3px",
    // },
    screens: {
      "2xs": "300px",
      xs: "390px",
      sm: "640px",
      md: "834px",
      lg: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
      },
      screens: {
        xs: "390px",
        sm: "640px",
        md: "834px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      padding: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      fontSize: {
        h1: ["var(--font-size-h1)", "var(--line-height-h1)"],
        h2: ["var(--font-size-h2)", "var(--line-height-h2)"],
        h3: ["var(--font-size-h3)", "var(--line-height-h3)"],
        h4: ["var(--font-size-h4)", "var(--line-height-h4)"],
        h5: ["var(--font-size-h5)", "var(--line-height-h5)"],
        h6: ["var(--font-size-h6)", "var(--line-height-h6)"],
        "body-lg": ["var(--font-size-body-lg)", "var(--line-height-body-lg)"],
        body: ["var(--font-size-body)", "var(--line-height-body)"],
        "body-sm": ["var(--font-size-body-sm)", "var(--line-height-body-sm)"],
        "body-xs": ["var(--font-size-body-xs)", "var(--line-height-body-xs)"],
        caption: ["var(--font-size-caption)", "var(--line-height-caption)"],

        // Desktop sizes
        "d-h1": "8rem", // 128px
        "d-h2": "6rem", // 96px
        "d-h3": "5rem", // 80px
        "d-h4": "4rem", // 64px
        "d-h5": "3rem", // 48px
        "d-h6": "2rem", // 32px
        "d-body-large": "1.5rem", // 24px
        "d-body": "1rem", // 16px
        "d-body-small": "0.875rem", // 14px
        "d-caption": "0.875rem", // 14px
        "d-micro": "0.75rem", // 12px

        // Tablet sizes
        "t-h1": "6rem", // 96px
        "t-h2": "3.375rem", // 54px
        "t-h3": "2.5rem", // 40px
        "t-h4": "1.5rem", // 24px
        "t-h5": "1.25rem", // 20px
        "t-h6": "1rem", // 16px
        "t-body-large": "1.125rem", // 18px
        "t-body": "1rem", // 16px
        "t-body-small": "0.875rem", // 14px
        "t-caption": "0.875rem", // 14px
        "t-micro": "0.75rem", // 12px

        // Mobile sizes
        "m-h1": "3.5rem", // 56px
        "m-h2": "2.5rem", // 40px
        "m-h3": "2rem", // 32px
        "m-h4": "1.5rem", // 24px
        "m-h5": "1.25rem", // 20px
        "m-h6": "1rem", // 16px
        "m-body-large": "1.125rem", // 18px
        "m-body": "1rem", // 16px
        "m-body-small": "0.875rem", // 14px
        "m-caption": "0.875rem", // 14px
        "m-micro": "0.625rem", // 10px

        "g-label": "1.125rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        pecita: ["Pecita", "sans-serif"],
      },
      height: {
        section: "var(--height-section)",
      },
      minHeight: {
        section: "var(--height-section)",
      },
      colors: {
        "hero-1": "hsl(var(--hero-1))",
        "hero-2": "hsl(var(--hero-2))",
        "hero-3": "hsl(var(--hero-3))",
        "shade-light": "hsl(var(--shade-light))",
        "shade-1": "hsl(var(--shade-1))",
        "shade-2": "hsl(var(--shade-2))",
        "shade-3": "hsl(var(--shade-3))",
        "sonic-black": "hsl(var(--sonic-black))",
        "sonic-white": "hsl(var(--sonic-white))",
        link: "hsl(var(--link))",
        button: "hsl(var(--button))",
        "button-foreground": "hsl(var(--button-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "border-spin": {
          "100%": { transform: "rotate(-360deg)" },
        },
        gradient: {
          to: { backgroundPosition: "200%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 4px))" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-spin": "border-spin 4s linear infinite",
        gradient: "gradient 8s linear infinite",
        marquee: "marquee linear infinite",
        shimmer: "shimmer 2s infinite"
      },
      boxShadow: {
        "planet-glow": `
              inset 0 0 50px #FFCB67,
              inset 20px 0 80px #F43,
              inset -20px 0 80px #FFCB67,
              inset 20px 0 300px #F43,
              inset -20px 0 300px #FFCB67,
              0 0 50px #F43,
              10px 0 400px #F43
        `,
      },
      backgroundImage: {
        "planet-glow": "conic-gradient(from 45deg at 50% 50%, #F43, #FFCB67,#214E81, #F43)",
        "planet-glow-foreground":
          "radial-gradient(rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), conic-gradient(from 45deg at 50% 50%, #F43, #FFCB67,#214E81, #F43)",
        "gradient-sonic-horizontal": `linear-gradient(270deg, hsla(212, 59%, 32%, 1) 25%,
hsla(215, 20%, 39%, 1) 50%,
hsla(20, 93%, 48%, 1) 75%,
hsla(39, 100%, 70%, 1) 100%)`,
        "gradient-sonic-vertical": `linear-gradient(0deg, hsla(212, 59%, 32%, 1) 25%,
hsla(215, 20%, 39%, 1) 50%,
hsla(20, 93%, 48%, 1) 75%,
hsla(39, 100%, 70%, 1) 100%)`,
        "gradient-sonic-mirrored": createMirroredGradient(
          ["#214E81", "rgba(80, 97, 121)", "rgba(237, 84, 9)", "rgba(255, 203, 103)"],
          90,
        ),
        "gradient-sonic-subtle": "linear-gradient(92.79deg, #EDAA60 4.62%, #BF5F38 53.19%, #1753B0 101.61%)",
        "gradient-sonic-sun": createMirroredGradient(["#FFCB67", "#FFB44D", "#FF9D33", "#FF8519", "#ED5409"], 90),
        "gradient-sonic-silver": createMirroredGradient(["#E0E0E0", "#C2C2C2", "#A3A3A3", "#858585", "#666666"], 90),
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "gradient-sonic-mirrored": "200% auto",
        "gradient-sonic-sun": "200% auto",
        "gradient-nav-banner": "200% auto",
        "gradient-sonic-silver": "200% auto",
      },
      textShadow: {
        glow: "0 0 10px rgba(255,255,255,0.5)",
      },
    },
  },
  plugins: [
    require("tailwind-clip-path"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      addVariant("theme-light", ["html .theme-light &", ".light &"]);
      addVariant("theme-dark", ["html .theme-dark &", ".dark &"]);
    }),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "16px" },
      });
    }),
    plugin(({ addVariant }) => {
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
} satisfies Config;

export default config;

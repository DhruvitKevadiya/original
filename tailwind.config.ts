import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          950: "#11100c",
          900: "#1a1711",
          850: "#242016",
          800: "#302818",
          700: "#46391f",
        },
        honey: {
          500: "#eeb83b",
          400: "#ffd76e",
          300: "#fff0b2",
        },
        ember: {
          500: "#f27f2e",
          400: "#ffa13f",
          300: "#ffc06b",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0, 0, 0, 0.28)",
        warm: "0 18px 45px rgba(249, 128, 36, 0.18)",
        insetWarm: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -12px 28px rgba(70,31,8,0.28)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

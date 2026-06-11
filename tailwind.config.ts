import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        background: "#0D0D0D",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#F5A623",
          dark: "#D98E16",
          light: "#F7B84B",
        },
        secondary: {
          DEFAULT: "#A0A0A0",
          dark: "#707070",
          light: "#D0D0D0",
        },
        cardBg: "rgba(20, 20, 20, 0.6)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#12141D",
          200: "#1A1C25",
          300: "#23252E",
          400: "#2C2E37",
          500: "#353740",
          600: "#3E4049",
        },
        light: {
          100: "rgba(255, 255, 255, 0.5)",
          200: "rgba(255, 255, 255, 0.7)",
          300: "rgba(255, 255, 255, 0.9)",
          700: "rgba(255, 255, 255, 0.3)",
        },
        primary: {
          DEFAULT: "#E67E22",
          admin: "#F1C40F",
        },
      },
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        pattern: "url('/images/pattern.webp')",
      },
    },
  },
  plugins: [],
};

export default config;
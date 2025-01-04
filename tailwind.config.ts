import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkPrimary: "#37F94E",
        bodyColor:"#070806"
      },
      screens: {
        "mw-12": { max: "1280px" },
        "mw-10": { max: "1024px" },
        "mw-8": { max: "840px" },
        "mw-7": { max: "768px" },
        "mw-6": { max: "640px" },
        "mw-5": { max: "575px" },
        "mw-4": { max: "420px" },
        "mw-3": { max: "360px" },
      },

    },
  },
  plugins: [],
} satisfies Config;

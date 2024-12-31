import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}"
   
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
    },
  },
  plugins: [],
} satisfies Config;

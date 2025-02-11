/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'marble': "url('/assets/dashboard/marble.webp')",
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideInFade: 'slideInFade 0.6s ease-out forwards',
        'spin-slow': 'spin 4s linear infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkPrimary: "#37F94E",
        bodyColor:"#070806",     
      },
      screens: {
        "mw-12": { max: "1280px" },
        "mw-11": { max: "1080px" },
        "mw-10": { max: "1023px" },
        "mw-8": { max: "840px" },
        "mw-7": { max: "768px" },
        "mw-6": { max: "640px" },
        "mw-5": { max: "575px" },
        "mw-9": { max: "450px" },
        "mw-4": { max: "420px" },
        "mw-3": { max: "360px" },
      },
    },
  },
  plugins: []
};

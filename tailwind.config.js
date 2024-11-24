/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // .... other configs
      keyframes: {
        expanding: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "100%" },
        },
        moving: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        loading: "expanding 0.4s 0.7s forwards linear, moving 1s 1s infinite forwards linear",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none',   /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none',           /* Chrome, Safari, and Opera */
          },
        },
      });
    },
  ],
}


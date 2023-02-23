/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        // brandGrey: "#f7f7f7",
        brandGrey: "#FFF",
        "brand-grey": "#f7f7f7",
        brandBlack: "#1d1d1d",
        brandMediumGrey: "#595959",
        brandTeal: "#004743",
        brandYellow: "#ffc038",
      },
      letterSpacing: {
        tight: "-6px",
      },
      animation: {
        "slide-in": "slide-in 300ms",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

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
        rubik: ["Rubik", "sans-serif"],
        nerko: ["nerko one", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        brandGrey: "#f7f7f7",
        brandBlack: "#1d1d1d",
        brandMediumGrey: "#595959",
        brandTeal: "#004743",
        brandYellow: "#ffc038",
      },
    },
  },
  plugins: [],
};

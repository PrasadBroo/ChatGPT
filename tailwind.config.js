/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./src/components/**/*.{html,jsx,tsx}",
    "./index.html",
    "./src/*.{html,tsx,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: { poppins: ["Poppins", "sans-serif", "Roboto"] },
    },
  },
  plugins: [],
};

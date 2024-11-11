/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: "Geist",
      },
      colors: {
        primary: "#FA0101",
        secondary: "#141414"
      }
    },
  },
  plugins: [],
}
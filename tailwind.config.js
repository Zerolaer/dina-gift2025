
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ice: "#e9f3ff",
        deep: "#0a1a2e",
        gold: "#ffe08a",
        silver: "#cfd8e3"
      },
      dropShadow: {
        glow: "0 0 20px rgba(255,255,255,0.9)"
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}

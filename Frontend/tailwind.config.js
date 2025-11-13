/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b6cb0", // A nice shade of blue
        "primary-dark": "#2c5282",
        secondary: "#a0aec0", // A neutral gray
        "secondary-light": "#e2e8f0",
        accent: "#ed64a6", // A vibrant pink
        neutral: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        success: "#48bb78",
        error: "#f56565",
        warning: "#ecc94b",
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
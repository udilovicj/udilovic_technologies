/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a",
        light: "#ffffff",
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
} 
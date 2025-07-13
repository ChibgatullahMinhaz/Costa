/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  future: {
    // This disables use of new color functions like oklch() in Tailwind
    disableColorPalette: true,
  },
};

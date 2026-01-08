// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ['var(--font-space-mono)'],
        roboto: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}
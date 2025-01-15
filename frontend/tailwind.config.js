/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        niramit: ["Niramit", "ui-sans-serif", "system-ui"], // Niramit for sans-serif
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular"], // Roboto Mono for monospace
        neue: ["Bebas Neue"], // Bebas Neue for display
      },
    },
  },
  plugins: [],
};

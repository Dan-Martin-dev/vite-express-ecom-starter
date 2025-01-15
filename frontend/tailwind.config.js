/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        niramit: ["Niramit", "ui-sans-serif", "system-ui"], // Niramit for sans-serif
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular"], // Roboto Mono for monospace
        neue: ["Bebas Neue"], // Bebas Neue for display
        birthstone: ['Birthstone', 'cursive'],
        dhurjati: ['Dhurjati', 'sans-serif'],
        leagueGothic: ['League Gothic', 'sans-serif'],
        libreBodoni: ['"Libre Bodoni"', 'serif'],
        timmana: ['Timmana', 'sans-serif'],
        ysabeau: ['"Ysabeau Office"', 'sans-serif'],
        zenAntique: ['"Zen Antique"', 'serif'],
      },
    },
  },
  plugins: [],
};

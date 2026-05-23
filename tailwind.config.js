/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          deep: '#2C1506',
          warm: '#3D1F0D',
        },
        caramel: '#7B4A1E',
        gold: '#D4A020',
        cream: '#FDF6EC',
        ivory: '#FAF0E0',
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}

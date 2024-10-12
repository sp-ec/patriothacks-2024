/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        neonGreen: '#39FF14',
        neonBlue: '#00BFFF', 
        neonPurple: '#A200FF',
        neonPink: '#FF00FF'
      },
    },
  },
  plugins: [],
}


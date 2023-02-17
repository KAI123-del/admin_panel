/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        nezto: ["nezto", "sans-serif"],
        josefinRegular: ['josefinRegular'],
        gotham: ['gotham'],
      },
      screens: {
        'xs': '358px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        'sd': '820px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',

        '3xl': '1920px',


        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}

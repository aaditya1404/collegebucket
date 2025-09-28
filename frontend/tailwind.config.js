/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        syncopate: ["Syncopate", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#0D0D0D", // main black
          dark: "#1A1A1A",    // dark gray bg
          light: "#2E2E2E",   // surface
        },
        accent: {
          DEFAULT: "#E50914", // main red
          light: "#FF1F3D",   // hover red
          dark: "#B20710",    // darker red
        },
        textcolor: {
          primary: "#FFFFFF", // main text
          secondary: "#B3B3B3", // subtle text
        }
      },
      keyframes: {
        fadeSlideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeSlideDown: 'fadeSlideDown 0.3s ease-out forwards',
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      // require('tailwind-scrollbar'),
    ],
  },
  plugins: [],
}


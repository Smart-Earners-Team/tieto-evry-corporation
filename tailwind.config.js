const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5ed121",
          50: "#99E76E",
          100: "#80E14B",
          200: "#76DE3D",
          300: "#78DC3F",
          400: "#6FDA31",
          500: "#5ed121",
          600: "#52C10C",
          700: "#4FBD08",
          800: "#4CB804",
          900: "#45A704",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

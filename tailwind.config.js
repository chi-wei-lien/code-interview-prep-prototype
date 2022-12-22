/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-theme": "#FFF1BF",
      },
      borderWidth: {
        3: "3px",
      },
      textDecorationThickness: {
        3: "3px",
      },
    },
    fontFamily: {
      main: ["IBM Plex Mono", "mono"],
    },
  },
  plugins: [],
};

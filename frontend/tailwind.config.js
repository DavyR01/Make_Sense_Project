const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "1100px": "1100px",
      xl: "1280px",
      xxl: "1500px",
      "1590px": "1590px",
      "1590-max": { max: "1590px" },
      "xxl-max": { max: "1500px" },
      "xl-max": { max: "1279px" },
      "1101-max": { max: "1101px" },
      "lg-max": { max: "1023px" },
      "md-max": { max: "767px" },
      "sm-max": { max: "639px" },
    },
    extend: {
      colors: {
        "dark-blue": "#0C3944",
        "light-blue": "#186c84",
        "red-pink": "#E36164",
        "flash-yellow": "#FFF30D",
        "light-green": "#82B99E",
        "light-orange": "#F3976B",
        "light-grey": "#f7f7f7",
        "nav-color": "#196C84",
        "dark-bg": "#303134",
        "dark-header": "#1e1e1e",
        "gray-bar": "#98999b",
      },
      boxShadow: {
        1: "10px 10px 20px 0 rgba(50, 0, 50, 0.3)",
      },
    },
  },
  plugins: [],
});

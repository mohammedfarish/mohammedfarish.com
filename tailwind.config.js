/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mf-black": "#363636",
        "mf-grey": "#888888",
        "mf-white": "#f5f5f5",
        "mf-button-bottom-section": "#a9a9a9",
        "mf-button-top-section": "#d3d3d3",
      },
      dropShadow: {
        mf: "2px 2px #888888",
        mf2: "2px 2px 1px #888888",
        mfhover: "1px 1px #888888",
      },
    },
    screens: {
      ...defaultTheme.screens,
      xs: { max: "639px" },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

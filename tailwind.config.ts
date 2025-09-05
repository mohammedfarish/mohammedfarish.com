import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        xs: { max: "925px" },
      },
      fontFamily: {
        brand: ["Roboto Mono", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "fast-pulse": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

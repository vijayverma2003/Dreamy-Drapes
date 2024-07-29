import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pallete: {
          50: "#F1E5D1",
          100: "#FFF2D7",
          200: "#FFE0B5",
          300: "#F8C794",
          400: "#D8AE7E",
          500: "#DBB5B5",
          600: "#C39898",
          700: "#987070",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/theming/themes")["black"],
          info: "#2563eb",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      gap: {
        main: "30px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        "50%": "0 0 50%",
      },
      screens: {
        "xl-lg": [{ min: "1024px" }, { min: "1280px" }],
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        adam: ["var(--font-adam)"],
      },
      colors: {
        primary: "#5BCB55",
        secondary: "#398533",
        dark: "#183A16",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

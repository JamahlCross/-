import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        paper: "#f7f8fb",
        safe: "#188a4a",
        train: "#2563eb",
        caution: "#d89b00",
        danger: "#dc2626"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

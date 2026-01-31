import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0f172a",
        calm: "#eef2ff",
        mint: "#bbf7d0"
      }
    }
  },
  plugins: []
};

export default config;

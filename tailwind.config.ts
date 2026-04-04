import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#050505",
        primary: "#F3EEF2",
        offWhite: "#F3EEF2",
        accent: "#FF4FA8",
        accentSoft: "#FF8DCC",
        muted: "#B9B1B7"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0a0a0a",
        surfaceElevated: "#111111",
        primary: "#F0EBF0",
        offWhite: "#F0EBF0",
        accent: "#FF4FA8",
        accentSoft: "#FF8DCC",
        accentDim: "rgba(255,79,168,0.15)",
        muted: "#888888",
        mutedFaint: "#555555",
        divider: "rgba(255,255,255,0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        editorial: ["var(--font-cormorant)", "Georgia", "serif"]
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "9xl": ["8rem", { lineHeight: "0.9" }]
      }
    }
  },
  plugins: []
};

export default config;

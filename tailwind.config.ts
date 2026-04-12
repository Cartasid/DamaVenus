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
        surface: "#080808",
        surfaceElevated: "#0f0f0f",
        primary: "#F5F0EB",
        offWhite: "#F5F0EB",
        accent: "#FF00FF",
        accentSoft: "#FF66FF",
        accentDim: "rgba(255,0,255,0.15)",
        gold: "#C8A87E",
        goldSoft: "rgba(200,168,126,0.15)",
        muted: "#8A8580",
        mutedFaint: "#5A5550",
        divider: "rgba(255,255,255,0.06)"
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "var(--font-syne)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-bodoni)", "Georgia", "serif"],
        editorial: ["var(--font-cormorant)", "Georgia", "serif"],
        ui: ["var(--font-montserrat)", "var(--font-syne)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        dramatic: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "9xl": ["8rem", { lineHeight: "0.9" }]
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1.2s ease forwards",
        "slide-in": "slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 40px -10px rgba(255,79,168,0.15)" },
          "50%": { boxShadow: "0 0 60px -5px rgba(255,79,168,0.3)" }
        }
      }
    }
  },
  plugins: []
};

export default config;

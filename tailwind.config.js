/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",   // <-- enables .dark class strategy
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "Syne", "sans-serif"],
        body:    ["Instrument Sans", "DM Sans", "sans-serif"],
      },
      colors: {
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        night: {
          900: "#07070f",
          800: "#0d0d1a",
          700: "#13132a",
          600: "#1a1a35",
          500: "#222240",
        },
      },
      boxShadow: {
        "3d":      "0 24px 64px -8px rgba(139,92,246,0.4), 0 6px 24px rgba(0,0,0,0.3)",
        "3d-hover":"0 32px 80px -8px rgba(139,92,246,0.55), 0 10px 32px rgba(0,0,0,0.4)",
        "glow":    "0 0 30px rgba(139,92,246,0.35)",
        "card":    "0 2px 20px rgba(0,0,0,0.1)",
      },
      animation: {
        "float":     "float 7s ease-in-out infinite",
        "slide-up":  "slideUp 0.4s ease-out",
        "fade-in":   "fadeIn 0.3s ease-out",
        "glow-pulse":"glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        slideUp:   { "0%": { opacity:0, transform:"translateY(20px)" }, "100%": { opacity:1, transform:"translateY(0)" } },
        fadeIn:    { "0%": { opacity:0 },  "100%": { opacity:1 } },
        glowPulse: { "0%,100%": { boxShadow:"0 0 20px rgba(139,92,246,0.3)" }, "50%": { boxShadow:"0 0 50px rgba(139,92,246,0.7)" } },
      },
    },
  },
  plugins: [],
};


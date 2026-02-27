/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          50: "rgba(255,255,255,0.06)",
          100: "rgba(255,255,255,0.1)",
          200: "rgba(255,255,255,0.2)",
          300: "rgba(255,255,255,0.3)",
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.25)",
        glow: "0 0 20px rgba(120, 180, 255, 0.45)",
      },
      backgroundImage: {
        "glass-sheen":
          "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.45), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)",
        "glass-edge":
          "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.05))",
        "hero-overlay":
          "linear-gradient(180deg, rgba(6,10,18,0.2), rgba(6,10,18,0.8))",
        aurora:
          "radial-gradient(50% 50% at 20% 20%, rgba(120, 190, 255, 0.4), rgba(120, 190, 255, 0) 60%), radial-gradient(40% 40% at 80% 10%, rgba(255, 158, 202, 0.35), rgba(255, 158, 202, 0) 60%), radial-gradient(45% 45% at 70% 80%, rgba(140, 255, 214, 0.28), rgba(140, 255, 214, 0) 65%)",
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

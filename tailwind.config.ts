import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f4f4f4",
        ink: "#2f2f2f",
        muted: "#626262",
        wine: "#7f3333",
        accent: "#f3d44d",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-grenette)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

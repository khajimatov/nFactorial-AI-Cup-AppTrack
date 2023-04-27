import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideup: "slide-up 0.1s",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(12%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

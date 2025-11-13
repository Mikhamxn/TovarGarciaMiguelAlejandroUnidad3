import formsPlugin from "@tailwindcss/forms";

const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        surface: withOpacity("--color-surface"),
        muted: withOpacity("--color-muted"),
        contrast: withOpacity("--color-contrast")
      },
      boxShadow: {
        glow: "0 20px 45px -25px rgb(var(--color-primary) / 0.75)",
        card: "0 18px 30px -20px rgb(15 23 42 / 0.2)"
      },
      fontFamily: {
        display: ["'Nunito', 'Segoe UI', sans-serif"],
        body: ["'Inter', 'Roboto', 'Helvetica Neue', sans-serif"]
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: [formsPlugin]
};

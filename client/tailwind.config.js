module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        shake: {
          "10%,90%": {
            transform: "translateX(-1px)",
          },

          "20%,80%": {
            transform: "translateX(2px)",
          },

          "30%,50%,70%": {
            transform: "translateX(-4px)",
          },

          "40%,60%": {
            transform: "translateX(4px)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDelay: {
          "0%, 50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-10vh)" },
          "100%": { opacity: "1" },
        },
        fadeFromRight: {
          "0%": { opacity: "0", transform: "translateX(10vh)" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10vh)" },
          "100%": { opacity: "1" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-10vh)" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shake: "shake 750ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        fadeIn: "fadeIn 1s ease-in",
        fadeDown: "fadeDown 1s ease-in",
        fadeInDelay: "fadeInDelay 2s ease-in",
        fadeUp: "fadeUp 1s ease-in",
        fadeFromLeft: "fadeFromLeft 1s ease-in",
        fadeFromRight: "fadeFromRight 1s ease-in",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"],
      backgroundColor: ["active"],
      transform: ["hover", "focus"],
      scale: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
}

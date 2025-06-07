/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 3s infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "0.4",
          },
        },
      },
    },
  },
  plugins: [],
};

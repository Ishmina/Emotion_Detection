/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // ← make sure this line is here for Vite
    ],
    theme: {
      extend: {
        keyframes: {
          float: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(-200px)', opacity: '0' },
          },
        },
        animation: {
          float: 'float 3s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }
  
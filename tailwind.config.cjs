/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};

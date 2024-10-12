/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: [`./views/**/*.html`], // all .html files
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
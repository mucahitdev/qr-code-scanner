// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/store/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
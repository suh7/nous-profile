/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "#c552ec",
      },
    },
  },
  plugins: [],
};

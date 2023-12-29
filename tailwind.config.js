/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/partial/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#555",
          light: "#888",
          dark: "#282c34",
        },
        blue: "#61dafb",
      },
    },
  },
  plugins: [],
};

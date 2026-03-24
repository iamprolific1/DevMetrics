/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode support
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117", // Dark background
        surface: "#161B22", // Slightly lighter sections
        primary: "#58A6FF", // Electric blue
        secondary: "#A855F7", // Neon purple
        text: "#E6EDF3", // Soft white text
        border: "#30363D", // Subtle borders
      },
    },
  },
  plugins: [],
};

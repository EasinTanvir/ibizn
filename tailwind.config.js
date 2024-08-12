/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        title: ["62px", "62px"],
        subtitle: "20px",
      },
      fontFamily: {
        outfit: ["Outfit"],
        roboto: ["Roboto"],
      },
      colors: {
        primary: "#0080ff",
        secondary: "#2f2f30",
        hover: "#00afff",
        light: "#f1f2f2",
        gray: "#b2b2b2",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/aspect-ratio")],
};

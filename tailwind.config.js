/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'green-lighter': '#dff1e7',
        'green-medium': '#0c7d69',
        'red': '#d73c3c',
        'grey-medium': '#87a3a6',
        'gray-darker': '#2b4246'
      }
    },
  },
  plugins: [],
}
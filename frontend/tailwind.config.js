/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'navbar': "url('../assets/svg/NavBar.svg')",
      }
    },
  },
  plugins: [],
}


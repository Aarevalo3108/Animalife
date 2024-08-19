/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'navbar': "url('./public/svg/NavBar.svg')"
      },
      fontFamily: {
        'Itim': ['"Itim"', '"sans-serif"']
      }
    },
  },
  plugins: [],
}


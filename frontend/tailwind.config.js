/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}","./index.html"],
  theme: {
    extend: {
      fontFamily: {
        'Itim': ['"Itim"', '"sans-serif"']
      },
      colors: {
        n1: '#f2e0c2',
        n2: '#e4b972',
        n3: '#a38449',
        n4: '#708c5a',
        n5: '#433526',
        n6: '#fcf8f0',
      }
    },
  },
  plugins: [],
}


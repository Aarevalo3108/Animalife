/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blanchedalmond: {
          "100": "#f3e2c6",
          "200": "#f2e0c2",
          "300": "rgba(242, 224, 194, 0.3)",
        },
        darkslategray: {
          "100": "#433527",
          "200": "#073518",
        },
        burlywood: "#a28349",
        white: "#fff",
        gray: {
          "100": "#312816",
          "200": "#1d170c",
          "300": "#18130f",
          "400": "rgba(29, 23, 12, 0.6)",
        },
        floralwhite: {
          "100": "#fcf7ef",
          "200": "#fbf6ee",
        },
        black: "#000",
        peru: "rgba(152, 107, 33, 0.2)",
        "amarillo-1": "#e4b972",
        linen: {
          "100": "#f4efe6",
          "200": "#f4ebdc",
        },
        forestgreen: "#16a34a",
        seagreen: "#019863",
        antiquewhite: {
          "100": "#f0e6d4",
          "200": "#e9dfcd",
        },
        tan: "rgba(217, 199, 168, 0.3)",
        gainsboro: "#e5e7eb",
        dimgray: "#695c4d",
        lightgray: "#dbd6cc",
        darkgray: "#9ca3af",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
        itim: "Itim",
        rubik: "Rubik",
        inherit: "inherit",
        lora: "Lora",
      },
      borderRadius: {
        "31xl": "50px",
        sm: "14px",
        xl: "20px",
        "7xl": "26px",
        "9980xl": "9999px",
      },
    },
    fontSize: {
      base: "16px",
      "6xl": "25px",
      xl: "20px",
      "5xl": "24px",
      lgi: "19px",
      xs: "12px",
      sm: "14px",
      mini: "15px",
      "3xs": "10px",
      "11xl": "30px",
      lg: "18px",
      "17xl": "36px",
      "3xl": "22px",
      "10xl": "29px",
      "13xl": "32px",
      "7xl": "26px",
      "21xl": "40px",
      "41xl": "60px",
      "29xl": "48px",
      inherit: "inherit",
    },
    screens: {
      mq2000: {
        raw: "screen and (max-width: 2000px)",
      },
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },}


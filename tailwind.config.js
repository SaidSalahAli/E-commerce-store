/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height:{
        header:"560px",
        rate: "400px",
      },
      fontSize:{
        h1:"2.6rem",
      },
      screens:{
        xs:"475px"
      },
      colors:{
        main: '#fbfbfd',
        subMain: '#f20000',
        dry: '#4a4e69',
        star: '#ffb000',
        text: '#eeee',
        border: '#4d5563',
        dryGray: '#c0c0c0',

      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor:"#068073",
        headingColor:"#181A1E",
        textColor:"#4E545F",  

      },
      fontFamily:{
        body:['Sedan']
      }
    },
  },
  plugins: [],
}
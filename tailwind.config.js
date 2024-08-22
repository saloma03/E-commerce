/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line

  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'banner1': "url('./src/assets/main slider/banner-1.png')",
      //   'banner2': "url('./src/assets/main slider/banner-2.png')",
      //   'banner3': "url('./src/assets/main slider/banner-3.png')",
      // }

    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}


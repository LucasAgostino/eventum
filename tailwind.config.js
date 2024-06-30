/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#020059',
        'violeta':'#473ED7',
        'violoscuro': '#322C99'
      },
    },
  },
  plugins: [],
};
 
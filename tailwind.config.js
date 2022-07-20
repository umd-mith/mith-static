const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    colors: {
      mithblue: '#005296',
      mithgray: '#43454B',
      mithgreen: '#AEBB20',
      mithyellow: '#FEE63E',
      umdyellow: '#FCD116',
      umdred: '#CE1126',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
  },
};
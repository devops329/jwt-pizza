const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['index.html', './src/**/*.{html,js,tsx}', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      animation: {
        wobble: 'wobble .5s ease-in-out',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
      colors: {
        jwt: {
          brown: '#6F5537',
          blue: '#538FD8',
          cream: '#F7F2EA',
          red: '#C92D1F',
        },
        dominos: {
          blue: '#006491',
          navy: '#00587C',
          midnight: '#03364E',
          link: '#0078AE',
          sky: '#E2F5F9',
          red: '#E31837',
          darkred: '#9D2235',
          blush: '#F6DADE',
          green: '#5FA137',
          darkgreen: '#176117',
          gray: {
            50: '#F5F5F5',
            100: '#EDEDED',
            200: '#DBDBDB',
            400: '#ADADAD',
            500: '#7F7F7F',
            700: '#53565A',
            900: '#333333',
          },
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('preline/plugin')],
};

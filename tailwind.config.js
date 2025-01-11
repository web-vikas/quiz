/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E27640',
        secondary: '#557D94',
        'text-secondary': '#3A566E',
        gradientStart: '#FE9965',
        gradientEnd: '#FF9C38',
        black: '#14141F',
        'text-color': '#333F49',
        'text-color-light': '#81898F',
        border: '#cccccc',
        disabled: '#D75EIF',
        'body-bg': '#F3F3F3',
        light: '#FFDBC9',
        white: '#FFFFFF',
        success: '#48D6B5',
        danger: '#F36363',
        info: '#4150F6',
        warning: '#FFC039',
        link: '#D75EIF',
        authGradientStart: '#FEBB77',
        authGradientEnd: '#2B2B2B',
        aiBackground: '#EFF3ED',
        borderGray: '#EBEAED',
        grayParagraph: '#344054',
        grayTitle: '#475467',
        primaryCard: '#fff5eb'
      },
      boxShadow: {
        buttonShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
};

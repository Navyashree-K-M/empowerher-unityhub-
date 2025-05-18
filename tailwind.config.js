/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6FFFC',
          100: '#B3FFF8',
          200: '#80FFF4',
          300: '#4DFFF0',
          400: '#1AFFEC',
          500: '#00E6D4',
          600: '#00B8AA',
          700: '#008A80',
          800: '#005C55',
          900: '#002E2B',
        },
        secondary: {
          50: '#F2F7FA',
          100: '#E5EFF5',
          200: '#CCDFE9',
          300: '#B2CFDE',
          400: '#99BFD3',
          500: '#7FAFC8',
          600: '#668CBE',
          700: '#4C6A94',
          800: '#33476A',
          900: '#192340',
        },
        danger: {
          500: '#EF4444',
          600: '#DC2626',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
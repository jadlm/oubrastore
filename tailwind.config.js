/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#D4A017', light: '#F5D060', dark: '#B8860B', 50: '#FFF9E6', 100: '#FFF0BF' },
        dark: { DEFAULT: '#0A0A0A', 50: '#1A1A2E', 100: '#16213E', 200: '#1C1C1C', 300: '#2D2D2D' },
        'dark-DEFAULT': '#0A0A0A',

        surface: { DEFAULT: '#FFFFFF', muted: '#F8F9FA', border: '#E5E7EB', dark: '#F3F4F6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 30px rgba(0,0,0,0.08)',
        card: '0 2px 16px rgba(0,0,0,0.06)',
        glow: '0 0 20px rgba(212,160,23,0.3)',
      },
      borderRadius: { xl2: '1rem' },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};

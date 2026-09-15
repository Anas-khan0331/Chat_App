/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        charcoal: '#141414',
        gold: '#D4AF37',
        'gold-light': '#F8E7B8',
        'gold-deep': '#A68629',
        champagne: '#F7E7CE',
        ivory: '#F8F9FA',
        velvet: '#2A0B10',
        burgundy: '#4A0E12',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        vibes: ['Great Vibes', 'cursive'],
        amiri: ['Amiri', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        lux: '0.35em',
        widerlux: '0.5em',
      },
      boxShadow: {
        gold: '0 0 40px rgba(212, 175, 55, 0.18)',
        'gold-lg': '0 24px 80px rgba(212, 175, 55, 0.16)',
      },
    },
  },
  plugins: [],
}

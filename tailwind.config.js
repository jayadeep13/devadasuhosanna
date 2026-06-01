/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo colors — exact extractions
        crimson: {
          DEFAULT: '#CC1A1A',
          dark: '#9B0E0E',
          light: '#E83535',
          glow: '#FF2222',
        },
        gold: {
          DEFAULT: '#FFD700',
          warm: '#FFC107',
          deep: '#E6A800',
          pale: '#FFF3A0',
          muted: '#B8960C',
        },
        void: {
          DEFAULT: '#000000',
          soft: '#050508',
          mid: '#0A0A12',
          light: '#111120',
        },
        globe: {
          blue: '#1A4B8C',
          ocean: '#0D2B5E',
          light: '#2E6DB4',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'Trajan Pro', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Palatino', 'serif'],
        body: ['"Cormorant Garamond"', 'Palatino Linotype', 'serif'],
        sans: ['"Manrope"', '"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'crimson-gradient': 'linear-gradient(135deg, #9B0E0E, #CC1A1A, #E83535)',
        'gold-gradient': 'linear-gradient(135deg, #B8960C, #FFD700, #FFF3A0, #FFD700, #B8960C)',
        'void-gradient': 'radial-gradient(ellipse at center, #0A0A12 0%, #000000 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, #1A0505 0%, #000000 60%)',
        'globe-gradient': 'radial-gradient(circle, #2E6DB4, #1A4B8C, #0D2B5E)',
      },
      animation: {
        'rotate-slow': 'rotateSlow 30s linear infinite',
        'pulse-crimson': 'pulseCrimson 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer-gold': 'shimmerGold 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'draw-line': 'drawLine 1.5s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'text-reveal': 'textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        rotateSlow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        pulseCrimson: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(204, 26, 26, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(204, 26, 26, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmerGold: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        drawLine: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(255, 215, 0, 0.9))' },
        },
        textReveal: {
          from: { opacity: '0', letterSpacing: '0.5em', transform: 'translateY(20px)' },
          to: { opacity: '1', letterSpacing: 'normal', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'gold': '0 0 40px rgba(255, 215, 0, 0.3)',
        'gold-lg': '0 0 80px rgba(255, 215, 0, 0.5)',
        'crimson': '0 0 40px rgba(204, 26, 26, 0.4)',
        'crimson-lg': '0 0 80px rgba(204, 26, 26, 0.6)',
        'void': '0 25px 80px rgba(0, 0, 0, 0.8)',
        'card': '0 8px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

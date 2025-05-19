/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        background: {
          dark: '#0F1121',
          light: '#171A2B',
        },
        accent: {
          primary: '#4F46E5',   // Main neon blue/purple
          secondary: '#06B6D4', // Cyan for secondary accents
          tertiary: '#D946EF',  // Neon purple for hover states
          subtle: '#1E293B',    // Subtle background accent
        },
        text: {
          primary: '#F8FAFC',  // White/light gray text
          secondary: '#94A3B8', // Muted text
          accent: '#38BDF8',    // Accent text (links, etc.)
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 5px rgba(79, 70, 229, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(79, 70, 229, 0.8)' },
        },
      },
      animation: {
        blink: 'blink 3s infinite',
        float: 'float 5s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
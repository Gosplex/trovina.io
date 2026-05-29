/**
 * Tailwind configuration — Trovina.io design system.
 * Semantic colors map to CSS variables declared in src/index.css, so a single
 * token set drives both light and dark mode (toggled via the `dark` class on
 * <html>). The `brand` scale is the existing Trovina purple (#A855F7 = 500).
 */

/** rgb(var(--token) / <alpha-value>) keeps opacity utilities (e.g. bg-surface/60) working. */
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Semantic, theme-aware tokens
        background: withVar('--background'),
        surface: withVar('--surface'),
        'surface-2': withVar('--surface-2'),
        border: withVar('--border'),
        foreground: withVar('--foreground'),
        muted: withVar('--muted'),
        subtle: withVar('--subtle'),
        primary: {
          DEFAULT: withVar('--primary'),
          foreground: withVar('--primary-foreground'),
        },
        ring: withVar('--ring'),
        // Static brand purple scale (identical in both modes)
        brand: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
          950: '#3B0764',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderColor: { DEFAULT: withVar('--border') },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,15,18,0.04), 0 8px 24px -12px rgba(15,15,18,0.12)',
        card: '0 1px 3px rgba(15,15,18,0.05), 0 12px 32px -16px rgba(15,15,18,0.18)',
        lift: '0 8px 40px -12px rgba(124,58,237,0.28)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #6B21A8, #A855F7, #C084FC)',
        'grid-light':
          'linear-gradient(to right, rgba(15,15,18,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,15,18,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'border-flow': 'border-flow 6s linear infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

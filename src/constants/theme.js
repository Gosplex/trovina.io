/**
 * Trovina.io — Design Tokens
 * --------------------------
 * Non-color design primitives: typography, spacing rhythm, radii, shadows,
 * motion and breakpoints. Color tokens live in `./colors.js`. These are the
 * documented, centralized values that the Tailwind config and components build
 * on — change them here and the system follows.
 */

export const typography = {
  fontFamily: {
    sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },
  // Fluid display sizes are handled with Tailwind's responsive prefixes in markup.
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  tracking: { tight: '-0.02em', normal: '0', wide: '0.08em' },
};

/** 8px-based spacing rhythm used for section padding and stack gaps. */
export const spacing = {
  sectionY: { sm: '4rem', md: '6rem', lg: '8rem' }, // py-16 / py-24 / py-32
  containerX: '1.5rem', // px-6
  maxWidth: '80rem', // max-w-7xl content width
};

export const radii = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
};

/** Soft, premium elevation. Color-neutral so it reads on both themes. */
export const shadows = {
  soft: '0 1px 2px rgba(15,15,18,0.04), 0 8px 24px -12px rgba(15,15,18,0.12)',
  card: '0 1px 3px rgba(15,15,18,0.05), 0 12px 32px -16px rgba(15,15,18,0.18)',
  lift: '0 8px 40px -12px rgba(124,58,237,0.28)', // brand-tinted hover lift
};

export const motion = {
  duration: { fast: 0.2, base: 0.45, slow: 0.7 },
  ease: [0.22, 1, 0.36, 1], // expo-out — smooth, premium reveal
  viewport: { once: true, amount: 0.25 },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export default { typography, spacing, radii, shadows, motion, breakpoints };

/**
 * Trovina.io — Centralized Color System
 * --------------------------------------
 * Single source of truth for the brand palette.
 *
 * The brand is anchored on the existing Trovina purple (#A855F7), expressed as a
 * full, accessible shade scale. Semantic tokens (background, surface, foreground,
 * border, etc.) are implemented as CSS custom properties in `src/index.css` so a
 * single token set powers BOTH light and dark mode. Tailwind utilities
 * (bg-background, text-foreground, border-border, bg-brand-500, …) reference
 * those variables — never hardcode hex values in components.
 *
 * RGB-triplet strings (e.g. "168 85 247") are consumed by Tailwind via
 * `rgb(var(--token) / <alpha-value>)`, which keeps opacity utilities working.
 */

/** Primary brand scale — the existing Trovina purple, as a 50→950 ramp. */
export const brand = {
  50: '#FAF5FF',
  100: '#F3E8FF',
  200: '#E9D5FF',
  300: '#D8B4FE',
  400: '#C084FC', // existing logo gradient "to"
  500: '#A855F7', // PRIMARY — existing logo gradient "via"
  600: '#9333EA',
  700: '#7E22CE',
  800: '#6B21A8', // existing logo gradient "from"
  900: '#581C87',
  950: '#3B0764',
};

/** The signature brand gradient (preserved from the original logo treatment). */
export const brandGradient = {
  from: brand[800], // #6B21A8
  via: brand[500], //  #A855F7
  to: brand[400], //   #C084FC
  css: `linear-gradient(90deg, ${brand[800]}, ${brand[500]}, ${brand[400]})`,
};

/** Functional / status colors (non-brand). */
export const status = {
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

/**
 * Semantic tokens as RGB triplets, per mode.
 * These mirror the CSS variables declared in src/index.css and exist here so the
 * values can be referenced from JS (charts, canvas, docs) without drifting.
 */
export const semanticTokens = {
  light: {
    background: '255 255 255', // #FFFFFF page base
    surface: '250 250 251', //    #FAFAFB cards / sections
    'surface-2': '244 244 246', // #F4F4F6 raised / alt surfaces
    border: '230 230 236', //     #E6E6EC hairlines / dividers
    foreground: '15 15 18', //    #0F0F12 primary text
    muted: '90 90 102', //        #5A5A66 secondary text
    subtle: '138 138 150', //     #8A8A96 meta / placeholders
    primary: '147 51 234', //     brand-600 — solid actions on light
    'primary-foreground': '255 255 255',
    ring: '168 85 247', //        brand-500 focus ring
  },
  dark: {
    background: '10 10 12', //    #0A0A0C page base
    surface: '20 20 24', //       #141418 cards / sections
    'surface-2': '28 28 34', //   #1C1C22 raised / alt surfaces
    border: '39 39 46', //        #27272E hairlines / dividers
    foreground: '247 247 249', // #F7F7F9 primary text
    muted: '161 161 170', //      #A1A1AA secondary text
    subtle: '113 113 122', //     #71717A meta / placeholders
    primary: '168 85 247', //     brand-500 — solid actions on dark
    'primary-foreground': '255 255 255',
    ring: '168 85 247', //        brand-500 focus ring
  },
};

export default { brand, brandGradient, status, semanticTokens };

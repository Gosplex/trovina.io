/**
 * Shared framer-motion variants — tasteful, premium reveals.
 * Centralized so every section animates with the same rhythm and easing.
 * Respects reduced-motion automatically via framer-motion's reducedMotion config
 * where used, and the CSS guard in index.css.
 */

const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Parent container that staggers its children's reveals. */
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Standard in-view trigger used across sections. */
export const inView = { once: true, amount: 0.2, margin: '-80px' };

export { EASE };

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Unified button. Renders as a <button>, react-router <Link> (via `to`), or
 * <a> (via `href`) while sharing the same token-driven styling and hover motion.
 *
 * variant: 'primary' | 'secondary' | 'ghost'
 * size:    'md' | 'lg'
 */
const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const MotionLink = motion(Link);

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `${VARIANTS[variant] || VARIANTS.primary} ${size === 'lg' ? 'btn-lg' : ''} ${className}`;
  const motionProps = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}

export default Button;

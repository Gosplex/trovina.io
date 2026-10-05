import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Unified button. Renders as a <button>, react-router <Link> (via `to`), or
 * <a> (via `href`) with shared token-driven styling.
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'light'
 * size:    'md' | 'lg'
 */
const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  light: 'btn-light',
};

export function Button({ children, variant = 'primary', size = 'md', to, href, className = '', ...props }) {
  const classes = `${VARIANTS[variant] || VARIANTS.primary} ${size === 'lg' ? 'btn-lg' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;

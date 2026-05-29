import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fadeUp, inView } from '../../lib/motion';

/**
 * Layout primitives for consistent vertical rhythm + max-width across the site.
 *
 * <Section>   — full-bleed band with standard padding (variant controls surface)
 * <Container> — centered max-w-7xl content wrapper
 * <Eyebrow>   — small pill label above headings
 * <SectionHeading> — title + optional eyebrow/description, with reveal animation
 */

const sectionVariants = {
  default: 'bg-background',
  surface: 'bg-surface',
  muted: 'bg-surface-2',
};

export function Section({ id, children, className = '', variant = 'default', size = 'md', bordered = false }) {
  const pad = size === 'lg' ? 'py-20 md:py-32' : size === 'sm' ? 'py-12 md:py-16' : 'py-16 md:py-24';
  return (
    <section
      id={id}
      className={`relative ${pad} ${sectionVariants[variant] || ''} ${
        bordered ? 'border-y border-border' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, icon: Icon, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      {Icon ? <Icon className="h-4 w-4 text-brand-500" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = 'center',
  className = '',
  as: Heading = 'h2',
}) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}
    >
      {eyebrow ? <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow> : null}
      {React.createElement(
        Heading,
        { className: 'text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl' },
        title,
      )}
      {description ? <p className="text-balance text-lg leading-relaxed text-muted">{description}</p> : null}
    </motion.div>
  );
}

export default Section;

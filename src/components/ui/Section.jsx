import React from 'react';

/**
 * Layout primitives for consistent vertical rhythm + max-width across the site.
 *
 * <Section>        full-bleed band with standard padding (variant controls surface)
 * <Container>      centered max-w-7xl content wrapper
 * <SectionHeading> title + optional label/description. Left-aligned by default;
 *                  `layout="split"` puts the description in a right-hand column.
 */

const sectionVariants = {
  default: 'bg-background',
  surface: 'bg-surface',
  muted: 'bg-surface-2',
};

export function Section({ id, children, className = '', variant = 'default', size = 'md', bordered = false }) {
  const pad = size === 'lg' ? 'py-24 md:py-36' : size === 'sm' ? 'py-12 md:py-16' : 'py-20 md:py-28';
  return (
    <section
      id={id}
      className={`relative ${pad} ${sectionVariants[variant] || ''} ${bordered ? 'border-y border-border' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = '' }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  layout = 'stack',
  className = '',
  as: Heading = 'h2',
  children,
}) {
  if (layout === 'split') {
    return (
      <div className={`grid gap-6 md:grid-cols-12 md:items-end md:gap-12 ${className}`}>
        <div className="md:col-span-7">
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          {React.createElement(Heading, { className: 'heading-lg text-balance text-foreground' }, title)}
        </div>
        {(description || children) && (
          <div className="md:col-span-5">
            {description ? <p className="text-pretty text-lg leading-relaxed text-muted">{description}</p> : null}
            {children}
          </div>
        )}
      </div>
    );
  }

  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {React.createElement(Heading, { className: 'heading-lg text-balance text-foreground' }, title)}
      {description ? <p className="text-pretty text-lg leading-relaxed text-muted">{description}</p> : null}
      {children}
    </div>
  );
}

export default Section;

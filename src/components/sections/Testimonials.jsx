import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { testimonials } from '../../constants/siteContent';

function Avatar({ person, size }) {
  if (person.avatar) {
    return (
      <img
        src={person.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="shrink-0 rounded-full bg-brand-100"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800"
    >
      {person.initials}
    </span>
  );
}

/** Client words: one large quote, the rest in a quiet grid. */
export default function Testimonials({ data = testimonials, variant = 'default', id = 'testimonials' }) {
  const [lead, ...rest] = data;
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading title="What clients say" />

        <figure className="mt-12 max-w-4xl">
          <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[2rem] md:leading-[1.3]">
            “{lead.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Avatar person={lead} size={56} />
            <span className="text-muted">
              <span className="block font-medium text-foreground">{lead.name}</span>
              {lead.role}
            </span>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
          {rest.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <blockquote className="flex-1 leading-relaxed text-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <Avatar person={t} size={44} />
                <span className="text-muted">
                  <span className="block font-medium text-foreground">{t.name}</span>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

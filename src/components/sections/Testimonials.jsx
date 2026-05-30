import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { testimonials } from '../../constants/siteContent';

/** Agency-grade testimonials with initials avatars, result chips, and ratings. */
export default function Testimonials({ data = testimonials, variant = 'default', id = 'testimonials' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Client Results"
          eyebrowIcon={Star}
          title="Outcomes Our Clients Talk About"
          description="We measure success by what we ship and the growth it drives. Here's what working with Trovina looks like."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {data.map((t, i) => (
            <motion.figure key={i} variants={fadeUp} className="card card-hover flex flex-col p-8">
              <Quote className="h-8 w-8 text-brand-500/40" aria-hidden="true" />
              <div className="mt-4 flex items-center gap-1 text-warning" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {t.initials}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-foreground">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
                {t.result ? (
                  <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    {t.result}
                  </span>
                ) : null}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { team } from '../../constants/siteContent';

/**
 * "Meet the Team" — reusable cards that fall back to initials avatars when no
 * photo is provided, ready for future dynamic data.
 */
export default function Team({ data = team, variant = 'surface', id = 'team' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Our People"
          eyebrowIcon={Users}
          title="Meet the Team Behind Your Product"
          description="A senior, multidisciplinary team of designers, engineers, and specialists who treat your product like our own."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.map((member) => (
            <motion.div key={member.role} variants={fadeUp} className="card card-hover p-6 text-center">
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-2xl">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-2xl font-bold text-white">
                    {member.initials}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

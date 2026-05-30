import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { guarantees } from '../../constants/siteContent';

/**
 * Guarantee — risk-reversal band. Spells out the commitments that de-risk a
 * premium engagement (fixed price, weekly demos, IP ownership, support).
 */
export default function Guarantee({ data = guarantees, variant = 'surface', id = 'guarantee' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Our Commitment"
          eyebrowIcon={ShieldCheck}
          title="A Low-Risk Way to Build Something Serious"
          description="Hiring an agency is a big decision. These commitments are baked into every Trovina engagement — in writing."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp} className="card card-hover p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

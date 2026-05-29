import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Section, Container } from '../ui/Section';
import AnimatedCounter from '../ui/AnimatedCounter';
import { stagger, fadeUp, inView } from '../../lib/motion';

/**
 * Animated stats band. Accepts `stats` as [{ value | number, label }].
 * Reused on the Home page and service detail pages — numbers count up on scroll.
 */
export default function StatsBand({ stats = [], variant = 'surface', className = '' }) {
  if (!stats.length) return null;
  return (
    <Section size="sm" variant={variant} bordered className={className}>
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <div className="bg-brand-gradient bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                <AnimatedCounter value={stat.value ?? stat.number} />
              </div>
              <div className="mt-2 text-sm text-muted md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

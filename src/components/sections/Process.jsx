import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { processSteps } from '../../constants/siteContent';

/**
 * Agency workflow: Discovery → Strategy → Design → Development → Launch → Scale.
 * Numbered cards on a subtle connecting rail.
 */
export default function Process({ data = processSteps, variant = 'default', id = 'process' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          eyebrowIcon={Compass}
          title="A Proven Path From Idea to Scale"
          description="A transparent, repeatable process that keeps you in the loop at every stage — from first conversation to long-term growth."
        />
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li key={step.title} variants={fadeUp} className="group relative card card-hover p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-5xl font-bold leading-none text-border transition-colors group-hover:text-brand-500/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </Section>
  );
}

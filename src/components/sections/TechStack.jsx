import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { techStack } from '../../constants/siteContent';

/**
 * "Technologies We Use" — grouped stack presented as clean category cards with
 * pill chips. Logo-free by design for reliability and theme consistency.
 */
export default function TechStack({ data = techStack, variant = 'surface', id = 'technologies' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Our Stack"
          eyebrowIcon={Layers}
          title="Technologies We Build With"
          description="A modern, battle-tested toolchain across frontend, backend, mobile, cloud, AI, and DevOps — chosen to keep your product fast, secure, and scalable."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div key={group.category} variants={fadeUp} className="card card-hover p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{group.category}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-brand-500/40 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

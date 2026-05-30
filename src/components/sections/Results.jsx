import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { results as defaultResults } from '../../constants/siteContent';

/**
 * Results — representative, anonymized engagement outcomes.
 * Deliberately industry-tagged rather than tied to named companies, so the
 * proof is honest until real, attributable case studies replace it.
 */
export default function Results({ data = defaultResults, variant = 'default', id = 'results' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Results"
          eyebrowIcon={TrendingUp}
          title="Outcomes We Engineer For"
          description="A look at representative engagements across the industries we serve. Details are anonymized to respect client confidentiality."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {data.map((item) => (
            <motion.article key={item.headline} variants={fadeUp} className="card card-hover flex flex-col p-7">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
                  {item.industry}
                </span>
                {item.stage && (
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {item.stage}
                  </span>
                )}
              </div>

              <h3 className="mt-5 flex items-start gap-1 text-lg font-semibold leading-snug text-foreground">
                {item.headline}
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.detail}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
                {item.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="bg-brand-gradient bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

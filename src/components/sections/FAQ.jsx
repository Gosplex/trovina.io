import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { fadeUp, inView } from '../../lib/motion';
import { faqs as defaultFaqs } from '../../constants/siteContent';

/**
 * Reusable FAQ accordion. Mirrors the accordion treatment already used on the
 * service detail pages, and emits FAQPage JSON-LD for SEO when `withSchema`.
 */
function FaqRow({ q, a, isOpen, onToggle }) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-surface transition-colors ${isOpen ? 'border-brand-500/40' : 'border-border'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-surface-2"
      >
        <h3 className="text-base font-semibold text-foreground md:text-lg">{q}</h3>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5 shrink-0 text-brand-500" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 leading-relaxed text-muted">{a}</p>
      </motion.div>
    </div>
  );
}

export default function FAQ({
  data = defaultFaqs,
  variant = 'default',
  id = 'faq',
  title = 'Questions, Answered',
  description = 'Everything you need to know before starting a project. Still unsure? Book a call and we will walk through it.',
  withSchema = true,
}) {
  const [open, setOpen] = useState(0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading eyebrow="FAQ" eyebrowIcon={HelpCircle} title={title} description={description} />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mx-auto mt-12 grid max-w-3xl gap-4"
        >
          {data.map((f, i) => (
            <FaqRow key={f.q} q={f.q} a={f.a} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </motion.div>
        {withSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        )}
      </Container>
    </Section>
  );
}

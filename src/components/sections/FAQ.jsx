import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { faqs as defaultFaqs } from '../../constants/siteContent';

function FaqRow({ id, q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className="flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span className="text-lg font-medium text-foreground">{q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 shrink-0 text-muted"
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" />
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-prose pb-6 leading-relaxed text-muted">{a}</p>
      </motion.div>
    </div>
  );
}

/**
 * FAQ accordion. JSON-LD for these questions is emitted by the page's <Seo>
 * component (see lib/schema.js) so it lands in <head>.
 */
export default function FAQ({
  data = defaultFaqs,
  variant = 'default',
  id = 'faq',
  title = 'Questions people ask us',
  description = 'Anything else? Send us a message and we will reply within one working day.',
}) {
  const [open, setOpen] = useState(0);

  return (
    <Section id={id} variant={variant}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading title={title} description={description} />
          </div>
          <div className="border-t border-border lg:col-span-8">
            {data.map((f, i) => (
              <FaqRow
                key={f.q}
                id={`${id}-${i}`}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

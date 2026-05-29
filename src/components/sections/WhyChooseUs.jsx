import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { whyChooseUs } from '../../constants/siteContent';

/** Enterprise credibility grid: speed, security, quality, communication, scale, support. */
export default function WhyChooseUs({ data = whyChooseUs, variant = 'surface', id = 'why-us' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Why Trovina"
          eyebrowIcon={ShieldCheck}
          title="Built Like a Partner, Not a Vendor"
          description="The reasons startups and growing businesses trust us to design, build, and scale their most important digital products."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp} className="card card-hover p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

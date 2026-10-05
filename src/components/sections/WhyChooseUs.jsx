import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { whyChooseUs } from '../../constants/siteContent';

/** Working principles, a two-column list, no icon tiles. */
export default function WhyChooseUs({ data = whyChooseUs, variant = 'default', id = 'why-us' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading layout="split" title="How we work with you" />
        <dl className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {data.map((item) => (
            <div key={item.title} className="border-t border-border py-7">
              <dt className="text-lg font-medium text-foreground">{item.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

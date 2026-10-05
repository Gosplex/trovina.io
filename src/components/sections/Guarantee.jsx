import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { guarantees } from '../../constants/siteContent';

/** What every engagement includes. (Also summarised inside Pricing.) */
export default function Guarantee({ data = guarantees, variant = 'default', id = 'guarantee' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading title="Included in every project" />
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <dt className="font-medium text-foreground">{item.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

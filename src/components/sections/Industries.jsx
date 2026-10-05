import React from 'react';
import { Building2, GraduationCap, ShoppingCart, HeartPulse, Truck, Landmark, Fuel, UtensilsCrossed } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { industries as defaultIndustries } from '../../constants/siteContent';

const ICONS = { Building2, GraduationCap, ShoppingCart, HeartPulse, Truck, Landmark, Fuel, UtensilsCrossed };

/** Industries we serve: a ruled grid, each cell listing what we typically build there. */
export default function Industries({ data = defaultIndustries, variant = 'default', id = 'industries' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          layout="split"
          title="Industries we serve"
          description="We have built for businesses like yours before, so we already know the workflows, the paperwork and what your customers expect."
        />
        <ul className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => {
            const Icon = ICONS[item.icon] || Building2;
            return (
              <li
                key={item.name}
                className="group border-b border-r border-border p-7 transition-colors hover:bg-surface-2 md:p-8"
              >
                <Icon
                  className="h-6 w-6 text-brand-600 transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-brand-400"
                  aria-hidden="true"
                />
                <h3 className="mt-8 text-lg font-medium tracking-tight text-foreground">{item.name}</h3>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {item.builds.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

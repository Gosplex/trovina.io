import React from 'react';
import { Container } from '../ui/Section';

/** Plain stats row with hairline dividers. Accepts [{ value | number, label }]. */
export default function StatsBand({ stats = [], className = '' }) {
  if (!stats.length) return null;
  return (
    <div className={`border-y border-border ${className}`}>
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'flex flex-col py-8 md:py-10',
                i % 2 === 1 ? 'border-l border-border pl-6' : '',
                i > 0 ? 'md:border-l md:border-border md:pl-8' : '',
                i > 1 ? 'border-t border-border md:border-t-0' : '',
              ].join(' ')}
            >
              <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight tabular-nums text-foreground md:text-4xl">
                {stat.value ?? stat.number}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

import React from 'react';
import { Check } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { pricingTiers, retainer } from '../../constants/pricing';
import { guarantees } from '../../constants/siteContent';
import { useCurrency, CurrencyToggle } from '../../context/CurrencyProvider';

/**
 * Pricing, three fixed-price starting points with a NGN / USD toggle.
 * The featured tier is set on the deep brand purple; the other two stay quiet.
 */
export default function Pricing({ data = pricingTiers, onSelect, variant = 'default', id = 'pricing' }) {
  const { format } = useCurrency();

  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          layout="split"
          title="Clear prices, agreed before we start"
          description="Every project gets a written scope and a fixed quote. These are typical starting points. Your quote depends on what you need."
        >
          <CurrencyToggle className="mt-6" />
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {data.map((tier) => {
            const featured = tier.featured;
            return (
              <article
                key={tier.id}
                className={`flex flex-col rounded-3xl p-8 lg:p-9 ${
                  featured
                    ? 'bg-brand-gradient text-white'
                    : 'border border-border bg-surface'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className={`text-xl font-semibold ${featured ? 'text-white' : 'text-foreground'}`}>{tier.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100">
                      Most chosen
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-muted'}`}>
                  {tier.summary}
                </p>

                <p className="mt-8">
                  <span className={`block text-sm ${featured ? 'text-white/70' : 'text-subtle'}`}>From</span>
                  <span
                    className={`block text-4xl font-semibold tracking-tight tabular-nums lg:text-[2.75rem] ${
                      featured ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {format(tier.price)}
                  </span>
                  <span className={`mt-1 block text-sm ${featured ? 'text-white/70' : 'text-subtle'}`}>
                    Typical timeline: {tier.timeline}
                  </span>
                </p>

                <ul className={`mt-8 flex-1 space-y-3 border-t pt-8 ${featured ? 'border-white/15' : 'border-border'}`}>
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check
                        aria-hidden="true"
                        className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-white' : 'text-brand-600 dark:text-brand-400'}`}
                      />
                      <span className={featured ? 'text-white/90' : 'text-foreground'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onSelect}
                  className={`mt-10 w-full ${featured ? 'btn-light' : 'btn-secondary'}`}
                >
                  {tier.cta}
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-12">
          <p className="text-sm leading-relaxed text-muted md:col-span-4">
            Need ongoing help? Monthly care plans for updates, SEO and design start from{' '}
            <span className="font-medium text-foreground tabular-nums">{format(retainer)}</span> a month.{' '}
            <button type="button" onClick={onSelect} className="link">
              Ask about a care plan
            </button>
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 md:col-span-8 lg:grid-cols-4">
            {guarantees.map((g) => (
              <li key={g.title}>
                <p className="text-sm font-medium text-foreground">{g.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{g.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

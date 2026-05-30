import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Check, Tag, ArrowRight } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { stagger, fadeUp, inView } from '../../lib/motion';
import { pricingTiers } from '../../constants/siteContent';

/**
 * Pricing — value-led engagement tiers with "starting at" anchors.
 * Reuses the site's card / brand-gradient / btn tokens so it reads as the same
 * brand. The popular tier is lifted with the existing gradient-border treatment.
 */
export default function Pricing({ data = pricingTiers, onSelect, variant = 'default', id = 'pricing' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          eyebrowIcon={Tag}
          title="Transparent Pricing, Built Around Outcomes"
          description="Every engagement is fixed-scope and fixed-price — you approve the number before we start. Choose the model that fits your stage."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {data.map((tier) => {
            const Icon = tier.icon;
            const card = (
              <div
                className={`flex h-full flex-col rounded-2xl border bg-surface p-8 ${
                  tier.popular ? 'border-transparent shadow-lift' : 'border-border shadow-soft'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      tier.popular
                        ? 'bg-brand-gradient text-white'
                        : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  {tier.popular && (
                    <span className="rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">{tier.name}</h3>

                <div className="mt-3 flex items-baseline gap-2">
                  {tier.priceNote === 'starting' && (
                    <span className="text-sm font-medium text-subtle">from</span>
                  )}
                  <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                  {tier.priceNote === 'tailored' && (
                    <span className="text-sm font-medium text-subtle">scope</span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{tier.summary}</p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onSelect}
                  className={`mt-8 w-full ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );

            return (
              <motion.div key={tier.name} variants={fadeUp} className="h-full">
                {tier.popular ? (
                  <div className="gradient-border h-full">
                    <div className="h-full rounded-[calc(1.5rem-1px)] bg-surface">{card}</div>
                  </div>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-10 text-center text-sm text-muted"
        >
          Prefer a dedicated team or monthly retainer? We offer ongoing engagements too —{' '}
          <button type="button" onClick={onSelect} className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            tell us what you need
          </button>
          .
        </motion.p>
      </Container>
    </Section>
  );
}

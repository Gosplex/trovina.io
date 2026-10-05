import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { processSteps } from '../../constants/siteContent';
import { photos, img, srcSet } from '../../constants/images';

/** How a project runs, a real sequence, shown beside a studio photo. */
export default function Process({ data = processSteps, variant = 'default', id = 'process', photo = photos.groupLaptop }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                title="How a project runs"
                description="Six steps, the same every time. You always know what is happening this week and what comes next."
              />
              <div className="mt-10 hidden overflow-hidden rounded-3xl lg:block">
                <img
                  src={img(photo.id, 960, 1100)}
                  srcSet={srcSet(photo.id, [480, 720, 960], 1.15)}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={photo.alt}
                  width="960"
                  height="1100"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {data.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr]">
                <span className="text-sm font-medium tabular-nums text-brand-600 dark:text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

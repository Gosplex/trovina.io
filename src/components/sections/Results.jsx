import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { results as defaultResults } from '../../constants/siteContent';
import { img } from '../../constants/images';

/** Photo that has loaded reliably; used if a project photo fails. */
const FALLBACK_ID = 'photo-1739301674006-75fe9653368f';

/** Swap a failed image for the fallback (only once, to avoid loops). */
const onImgError = (w, h) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = img(FALLBACK_ID, w, h);
};

/**
 * Selected work: one large feature and two smaller stories.
 */
function Tags({ tags }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Features">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Results({ data = defaultResults, variant = 'default', id = 'work' }) {
  const [lead, ...rest] = data;
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          layout="split"
          title="Recent work"
          description="A few of the products we have designed and built, from SaaS platforms to field apps. Here are three we are proud of."
        />

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          {/* Lead story */}
          <article className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl bg-surface-2">
              <img
                src={img(lead.photo.id, 1400, 1000)}
                onError={onImgError(1400, 1000)}
                alt={lead.photo.alt}
                width="1400"
                height="1000"
                loading="lazy"
                decoding="async"
                className="aspect-[7/5] w-full object-cover"
              />
            </div>
            <p className="mt-6 text-sm text-muted">{lead.industry}</p>
            <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {lead.headline}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{lead.detail}</p>
            <Tags tags={lead.tags} />
          </article>

          {/* Supporting stories */}
          <div className="flex flex-col gap-14 lg:col-span-5">
            {rest.map((item) => (
              <article key={item.headline}>
                <div className="overflow-hidden rounded-3xl bg-surface-2">
                  <img
                    src={img(item.photo.id, 960, 600)}
                    onError={onImgError(960, 600)}
                    alt={item.photo.alt}
                    width="960"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[8/5] w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-sm text-muted">{item.industry}</p>
                <h3 className="mt-2 text-balance text-xl font-semibold tracking-tight text-foreground">{item.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
                <Tags tags={item.tags} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
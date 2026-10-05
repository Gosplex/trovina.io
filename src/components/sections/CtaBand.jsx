import React from 'react';
import { company } from '../../constants/company';
import { Container } from '../ui/Section';

/** Closing call to action on the deep brand purple. */
export default function CtaBand({
  title = 'Have a project in mind?',
  description = 'Tell us what you want to build. We will reply within one working day with next steps and a rough budget.',
  onPrimary,
  primaryLabel = 'Start a project',
}) {
  return (
    <section className="bg-brand-gradient text-white">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="display-lg text-balance">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onPrimary} className="btn-light btn-lg">
              {primaryLabel}
            </button>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello Trovina, I would like to discuss a project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg border border-white/40 text-white hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <dl className="grid gap-6 text-sm lg:col-span-4 lg:col-start-9">
          <div className="border-t border-white/15 pt-4">
            <dt className="text-white/60">Email</dt>
            <dd className="mt-1 text-base">
              <a href={`mailto:${company.email}`} className="hover:underline">
                {company.email}
              </a>
            </dd>
          </div>
          <div className="border-t border-white/15 pt-4">
            <dt className="text-white/60">Phone</dt>
            <dd className="mt-1 text-base">
              <a href={company.phoneHref} className="hover:underline">
                {company.phone}
              </a>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

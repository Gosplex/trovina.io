import React from 'react';
import { Link } from 'react-router-dom';
import { company } from '../constants/company';
import { services } from '../constants/siteContent';

const COMPANY_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { to: '/privacy-policy', label: 'Privacy' },
  { to: '/terms-of-service', label: 'Terms' },
  { to: '/cookie-policy', label: 'Cookies' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

const SOCIALS = [
  { href: company.socials.linkedin, label: 'LinkedIn' },
  { href: company.socials.facebook, label: 'Facebook' },
  { href: company.socials.youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content={company.brand} />
      <meta itemProp="url" content={company.url} />
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Trovina.io home">
              <img src="/logo-mark.png" alt="" width="34" height="34" loading="lazy" className="h-[34px] w-[34px] object-contain" />
              <span className="text-lg font-semibold tracking-tight text-foreground">Trovina</span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              We design and build websites, apps and automation for businesses that want to grow online.
            </p>

            <address className="mt-8 space-y-2 text-sm not-italic text-muted">
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{company.address.line1}</span>,{' '}
                <span itemProp="addressLocality">{company.address.city}</span>,{' '}
                <span itemProp="addressRegion">{company.address.state}</span>,{' '}
                <span itemProp="addressCountry">{company.address.countryName}</span>
              </p>
              <p>
                <a href={company.phoneHref} className="link" itemProp="telephone">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="link" itemProp="email">
                  {company.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-sm font-medium text-foreground">Services</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="transition-colors hover:text-foreground">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="text-sm font-medium text-foreground">Company</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {COMPANY_LINKS.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="transition-colors hover:text-foreground">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social" className="lg:col-span-2">
            <h2 className="text-sm font-medium text-foreground">Follow</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground" itemProp="sameAs">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

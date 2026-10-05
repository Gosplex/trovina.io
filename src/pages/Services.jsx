import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Seo from '../components/Seo';
import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Process from '../components/sections/Process';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import CtaBand from '../components/sections/CtaBand';
import Industries from '../components/sections/Industries';
import { Container } from '../components/ui/Section';
import { services, faqs } from '../constants/siteContent';
import { servicePricing, pricingTiers } from '../constants/pricing';
import { photos, img } from '../constants/images';
import { useCurrency } from '../context/CurrencyProvider';
import { organizationSchema, breadcrumbSchema, faqSchema, offerCatalogSchema } from '../lib/schema';
import { company } from '../constants/company';

/** Imagery per service: people photos where the work is collaborative, product shots elsewhere. */
const SERVICE_IMAGES = {
  'web-app-website-development': { src: img(photos.pairLaptops.id, 1200, 900), alt: photos.pairLaptops.alt },
  'mobile-app-development': {
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=75&w=1200&h=900',
    alt: 'Smartphone showing a mobile app interface',
  },
  'ai-automation-workflow-systems': { src: img(photos.pairWorking.id, 1200, 900), alt: photos.pairWorking.alt },
  'cloud-infrastructure-devops': {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=75&w=1200&h=900',
    alt: 'Abstract view of global network connections representing cloud infrastructure',
  },
  'seo-growth-optimization': {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=1200&h=900',
    alt: 'Analytics dashboard with traffic and conversion charts',
  },
  'branding-visual-identity': { src: img(photos.designer.id, 1200, 900), alt: photos.designer.alt },
  'graphics-creative-design': {
    src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=75&w=1200&h=900',
    alt: 'Graphic design workspace with colour swatches and layouts',
  },
  'video-editing-motion-content': {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=75&w=1200&h=900',
    alt: 'Video editing timeline on a computer screen',
  },
};

export default function Services() {
  const [showForm, setShowForm] = useState(false);
  const { format } = useCurrency();

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trovina services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${company.url}/services/${s.slug}`,
      name: s.title,
    })),
  };

  return (
    <>
      <Seo
        title="Services | Websites, Apps, AI Automation & SEO | Trovina"
        description="Website and web app development, mobile apps, AI and WhatsApp automation, cloud, SEO, branding and video, with fixed quotes and clear starting prices."
        path="/services"
        image="/og-services.jpg"
        jsonLd={[
          organizationSchema,
          itemList,
          offerCatalogSchema(pricingTiers),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar onOpenForm={() => setShowForm(true)} />

        <main id="main">
          <section className="pb-16 pt-28 md:pb-20 md:pt-36">
            <Container>
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <h1 className="display-xl text-balance lg:col-span-8">Everything you need to launch and grow online.</h1>
                <p className="lede lg:col-span-4 lg:pb-3">
                  Strategy, design, engineering and growth from one team. Pick a single service or bring us
                  the whole project.
                </p>
              </div>
            </Container>
          </section>

          <section className="pb-20 md:pb-28">
            <Container>
              <ul className="space-y-20 md:space-y-28">
                {services.map((service, idx) => {
                  const image = SERVICE_IMAGES[service.slug];
                  const price = servicePricing[service.slug];
                  const reversed = idx % 2 === 1;
                  return (
                    <li key={service.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
                      <Link
                        to={`/services/${service.slug}`}
                        state={{ from: 'services' }}
                        tabIndex={-1}
                        aria-hidden="true"
                        className={`block overflow-hidden rounded-3xl bg-surface-2 lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          width="1200"
                          height="900"
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </Link>
                      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                        <h2 className="heading-lg">{service.title}</h2>
                        <p className="mt-4 text-lg leading-relaxed text-muted">{service.desc}</p>
                        {price && (
                          <p className="mt-6 text-sm text-muted">
                            From{' '}
                            <span className="text-base font-medium tabular-nums text-foreground">{format(price)}</span>
                            {price.unit !== 'project' && <> per {price.unit}</>}
                          </p>
                        )}
                        <Link
                          to={`/services/${service.slug}`}
                          state={{ from: 'services' }}
                          className="btn-secondary mt-6"
                        >
                          About {service.title.toLowerCase()}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>

          <Industries variant="surface" />
          <Process photo={photos.groupMeeting} />
          <Pricing variant="surface" onSelect={() => setShowForm(true)} />
          <FAQ />
          <CtaBand
            title="Not sure which service you need?"
            description="Book a free 30-minute call. We will map your goals to the right scope and send a fixed quote."
            primaryLabel="Book a free call"
            onPrimary={() => setShowForm(true)}
          />
        </main>

        <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
        <Footer />
      </div>
    </>
  );
}

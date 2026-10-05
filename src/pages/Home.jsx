import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Seo from '../components/Seo';
import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Section, Container, SectionHeading } from '../components/ui/Section';
import StatsBand from '../components/sections/StatsBand';
import TechStack from '../components/sections/TechStack';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import Results from '../components/sections/Results';
import FAQ from '../components/sections/FAQ';
import CtaBand from '../components/sections/CtaBand';
import Industries from '../components/sections/Industries';
import { services, faqs } from '../constants/siteContent';
import { pricingTiers } from '../constants/pricing';
import { photos, img, srcSet } from '../constants/images';
import { organizationSchema, websiteSchema, faqSchema, offerCatalogSchema } from '../lib/schema';
import { EASE } from '../lib/motion';

const stats = [
  { value: '500+', label: 'Products shipped' },
  { value: '98%', label: 'Clients who return' },
  { value: '4.9/5', label: 'Average client rating' },
  { value: '24/7', label: 'Monitoring on live projects' },
];

/** Next calendar month, e.g. "November 2026". */
const bookingMonth = () => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

/** Single orchestrated page-load sequence for the hero only. */
const heroParent = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const heroChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);

  return (
    <>
      <Seo
        title="Trovina | Website, App & AI Development Studio"
        description="Trovina designs and builds websites, web apps, mobile apps and AI automation for growing businesses. Fixed quotes, weekly demos and support after launch."
        path="/"
        image="/og-home.jpg"
        jsonLd={[organizationSchema, websiteSchema, offerCatalogSchema(pricingTiers), faqSchema(faqs)]}
      />

      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar onOpenForm={openForm} />

        <main id="main">
          {/* ===================== HERO ===================== */}
          <section className="pb-16 pt-28 md:pb-20 md:pt-36">
            <Container>
              <motion.div variants={heroParent} initial="hidden" animate="visible">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
                  <motion.h1 variants={heroChild} className="display-xl text-balance lg:col-span-8">
                    We design and build software that helps businesses grow.
                  </motion.h1>
                  <motion.div variants={heroChild} className="lg:col-span-4 lg:pb-3">
                    <p className="text-lg leading-relaxed text-muted">
                      Websites, web apps, mobile apps and AI automation, planned with you, built by a senior
                      team, and supported long after launch.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <button type="button" onClick={openForm} className="btn-primary btn-lg">
                        Start a project
                      </button>
                      <Link to="/#pricing" className="btn-secondary btn-lg">
                        See pricing
                      </Link>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={heroChild} className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-5">
                  <div className="overflow-hidden rounded-3xl bg-surface-2 md:col-span-8">
                    <img
                      src={img(photos.teamTable.id, 1600, 1000)}
                      srcSet={srcSet(photos.teamTable.id, [640, 960, 1280, 1600], 0.625)}
                      sizes="(min-width: 768px) 66vw, 100vw"
                      alt={photos.teamTable.alt}
                      width="1600"
                      height="1000"
                      fetchpriority="high"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1 md:gap-5">
                    <div className="overflow-hidden rounded-3xl bg-surface-2">
                      <img
                        src={img(photos.designer.id, 800, 640)}
                        srcSet={srcSet(photos.designer.id, [400, 600, 800], 0.8)}
                        sizes="(min-width: 768px) 33vw, 50vw"
                        alt={photos.designer.alt}
                        width="800"
                        height="640"
                        decoding="async"
                        className="aspect-square h-full w-full object-cover md:aspect-[5/4]"
                      />
                    </div>
                    <div className="flex flex-col justify-between rounded-3xl bg-brand-gradient p-6 text-white md:p-8">
                      <p className="flex items-center gap-2 text-sm text-white/75">
                        <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                        Availability
                      </p>
                      <p className="mt-6 text-xl font-medium leading-snug tracking-tight md:text-2xl">
                        Now booking new projects for {bookingMonth()}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Container>
          </section>

          <StatsBand stats={stats} />

          {/* ===================== SERVICES ===================== */}
          <Section id="services">
            <Container>
              <SectionHeading
                layout="split"
                title="What we do"
                description="One team for design, engineering and growth, so you are not stitching freelancers together."
              />

              <ul className="mt-14 border-t border-border">
                {services.map((service) => (
                  <li key={service.slug} className="border-b border-border">
                    <Link
                      to={`/services/${service.slug}`}
                      state={{ from: 'home' }}
                      className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
                    >
                      <h3 className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-brand-600 md:col-span-5 md:text-[1.75rem] dark:group-hover:text-brand-400">
                        {service.title}
                      </h3>
                      <p className="leading-relaxed text-muted md:col-span-6">{service.desc}</p>
                      <span className="hidden justify-self-end text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground md:col-span-1 md:block">
                        <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>

          {/* ===================== INDUSTRIES ===================== */}
          <Industries variant="surface" />

          {/* ===================== WORK ===================== */}
          <Results />

          {/* ===================== PROCESS ===================== */}
          <Process />

          {/* ===================== PRICING ===================== */}
          <Pricing variant="surface" onSelect={openForm} />

          {/* ===================== TESTIMONIALS ===================== */}
          <Testimonials />

          {/* ===================== STACK ===================== */}
          <TechStack variant="surface" />

          {/* ===================== FAQ ===================== */}
          <FAQ />

          <CtaBand onPrimary={openForm} />
        </main>

        <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
        <Footer />
      </div>
    </>
  );
}

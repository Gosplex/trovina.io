import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

import Seo from '../components/Seo';
import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/sections/Team';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import StatsBand from '../components/sections/StatsBand';
import CtaBand from '../components/sections/CtaBand';
import { Section, Container, SectionHeading } from '../components/ui/Section';
import { photos, img, srcSet } from '../constants/images';
import { organizationSchema, breadcrumbSchema } from '../lib/schema';
import { company } from '../constants/company';

const values = [
  {
    title: 'Do it properly',
    desc: 'Clean code, careful design and honest testing. We would rather ship a week later than ship something fragile.',
  },
  {
    title: 'Keep learning',
    desc: 'We try new tools on our own time so clients get the useful ones and skip the hype.',
  },
  {
    title: 'Be a good partner',
    desc: 'We say what we think, explain trade-offs in plain language and treat your budget like our own.',
  },
];

const stats = [
  { value: '500+', label: 'Products shipped' },
  { value: '98%', label: 'Clients who return' },
  { value: '10+', label: 'Years of senior experience' },
  { value: '24/7', label: 'Monitoring on live projects' },
];

export default function AboutUs() {
  const [showForm, setShowForm] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
      <Seo
        title="About Trovina | The Team Behind Your Product"
        description="Trovina is a small senior team of designers and engineers building websites, apps and AI automation. Meet the people, our story and how we work."
        path="/about"
        image="/og-about.jpg"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: `${company.url}/about`,
            name: 'About Trovina',
            mainEntity: { '@id': `${company.url}/#organization` },
          },
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar onOpenForm={() => setShowForm(true)} />

        <main id="main">
          {/* Hero */}
          <section className="pb-16 pt-28 md:pb-20 md:pt-36">
            <Container>
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <h1 className="display-xl text-balance lg:col-span-8">
                  A small team that builds like it’s our own product.
                </h1>
                <p className="lede lg:col-span-4 lg:pb-3">
                  Designers and engineers working together on websites, apps and automation for businesses
                  that care about the details.
                </p>
              </div>
              <div className="mt-12 overflow-hidden rounded-3xl bg-surface-2 md:mt-16">
                <img
                  src={img(photos.groupMeeting.id, 1920, 900)}
                  srcSet={srcSet(photos.groupMeeting.id, [640, 960, 1280, 1920], 0.47)}
                  sizes="100vw"
                  alt={photos.groupMeeting.alt}
                  width="1920"
                  height="900"
                  fetchpriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover md:aspect-[21/9]"
                />
              </div>
            </Container>
          </section>

          <StatsBand stats={stats} />

          {/* Story */}
          <Section>
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <h2 className="heading-lg">Why we started</h2>
                </div>
                <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
                  <p>
                    Trovina started from a simple frustration: too many businesses pay agency prices and get
                    junior work, slow timelines and surprise invoices. We wanted to build the studio we would
                    hire ourselves: senior people, fixed prices and a working demo every week.
                  </p>
                  <p>
                    Today we work with founders and teams in fintech, healthcare, retail, logistics and
                    energy, across several continents. Most of them stay with us long after their first
                    launch, and many come back for the next product.
                  </p>
                  <p className="text-foreground">
                    Our aim is simple: to be the product partner you would recommend to a friend.
                  </p>
                </div>
              </div>

              <div className="mt-16 grid gap-4 md:grid-cols-2 md:gap-5">
                {[photos.teamHandshake, photos.pairWorking].map((p) => (
                  <div key={p.id} className="overflow-hidden rounded-3xl bg-surface-2">
                    <img
                      src={img(p.id, 1200, 900)}
                      srcSet={srcSet(p.id, [600, 900, 1200], 0.75)}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      alt={p.alt}
                      width="1200"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* Values */}
          <Section variant="surface">
            <Container>
              <SectionHeading title="What we value" />
              <dl className="mt-12 grid gap-10 md:grid-cols-3">
                {values.map((v) => (
                  <div key={v.title} className="border-t border-border pt-6">
                    <dt className="text-xl font-medium text-foreground">{v.title}</dt>
                    <dd className="mt-3 leading-relaxed text-muted">{v.desc}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </Section>

          <Team />

          <WhyChooseUs variant="surface" />

          {/* Video */}
          <Section>
            <Container>
              <SectionHeading
                layout="split"
                title="See how we work"
                description="A short look at how we plan, design and ship with our clients."
              />
              <div className="relative mt-12 aspect-video overflow-hidden rounded-3xl bg-surface-2">
                {!isVideoPlaying ? (
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="group absolute inset-0 h-full w-full"
                    aria-label="Play the Trovina video"
                  >
                    <img
                      src="/video-thumbnail.jpg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
                    <span className="absolute left-6 bottom-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-sm font-medium text-brand-950 md:left-8 md:bottom-8">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
                        <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
                      </span>
                      Watch the video
                    </span>
                  </button>
                ) : (
                  <>
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/Eiik7yjxDBk?autoplay=1"
                      title="How Trovina works"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(false)}
                      aria-label="Close video"
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </Container>
          </Section>

          <CtaBand
            title="Let’s build something good together"
            onPrimary={() => setShowForm(true)}
          />
        </main>

        <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
        <Footer />
      </div>
    </>
  );
}

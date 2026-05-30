import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    ArrowRight, CheckCircle, Play, X, Smartphone, Activity,
    Globe, Bot, Cloud, Search, Palette, PenTool, Video, Sparkles,
} from 'lucide-react';

import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Section, Container, SectionHeading } from '../components/ui/Section';
import Button from '../components/ui/Button';
import StatsBand from '../components/sections/StatsBand';
import TechStack from '../components/sections/TechStack';
import Process from '../components/sections/Process';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import Results from '../components/sections/Results';
import Guarantee from '../components/sections/Guarantee';
import FAQ from '../components/sections/FAQ';
import { industries, faqs } from '../constants/siteContent';
import { company } from '../constants/company';
import { stagger, fadeUp, inView } from '../lib/motion';

export default function Home() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Core engineering services lead; supporting creative services follow.
    const services = [
        {
            icon: Globe,
            title: 'Web App & Website Development',
            desc: 'High-performance web apps and sites in React and Next.js — engineered for speed, SEO, and conversion, so your software actually moves revenue.',
        },
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            desc: 'Native and cross-platform iOS/Android apps your customers keep on their home screen — built for performance, retention, and scale.',
        },
        {
            icon: Bot,
            title: 'AI Automation & Workflow Systems',
            desc: 'AI agents and automation that cut manual work, eliminate errors, and let lean teams operate like ones several times their size.',
            popular: true,
        },
        {
            icon: Cloud,
            title: 'Cloud Infrastructure & DevOps',
            desc: 'Secure, cost-efficient cloud on AWS, Azure, and GCP with CI/CD and monitoring — so you scale on demand without firefighting.',
        },
        {
            icon: Search,
            title: 'SEO & Growth Optimization',
            desc: 'Technical SEO and CRO that compound — turning your site into a predictable channel for qualified, high-intent traffic.',
        },
        {
            icon: Palette,
            title: 'Branding & Visual Identity',
            desc: 'Strategic brand systems that make an early-stage company look established and earn trust before the first conversation.',
        },
        {
            icon: PenTool,
            title: 'Graphics & Creative Design',
            desc: 'On-brand creative for product, ads, and marketing — designed to communicate value clearly and convert attention into action.',
        },
        {
            icon: Video,
            title: 'Video Editing & Motion Content',
            desc: 'Polished video and motion for launches, demos, and campaigns — optimized for watch time, engagement, and pipeline.',
        },
    ];

    const stats = [
        { number: '500+', label: 'Products Shipped' },
        { number: '98%', label: 'Client Retention' },
        { number: '4.9/5', label: 'Average Client Rating' },
        { number: '24/7', label: 'Support & Monitoring' },
    ];

    const slugify = (title) =>
        title.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        name: company.legalName,
        alternateName: company.brand,
        url: company.url,
        logo: `${company.url}/logo.png`,
        email: company.email,
        telephone: company.phone,
        description:
            'Trovina is a US-based software, AI, and cloud product studio that designs, builds, and scales custom web and mobile applications for startups and enterprises.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.line1,
            addressLocality: company.address.city,
            addressRegion: company.address.state,
            postalCode: company.address.zip,
            addressCountry: company.address.country,
        },
        areaServed: { '@type': 'Country', name: 'United States' },
        sameAs: [company.socials.linkedin, company.socials.facebook, company.socials.youtube],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    return (
        <>
            <Helmet>
                <title>Trovina.io | US Software, AI & Cloud Development Agency</title>
                <meta
                    name="description"
                    content="Trovina is a US-based software, AI, and cloud product studio. We design, build, and scale custom web apps, mobile apps, and AI automation for startups and enterprises. Fixed-scope pricing from $7,500."
                />
                <meta
                    name="keywords"
                    content="custom software development company, software development agency usa, saas development agency, ai automation agency, web app development, mobile app development company, cloud devops services"
                />
                <link rel="canonical" href="https://trovina.io/" />
                <meta property="og:title" content="Trovina.io | US Software, AI & Cloud Development Agency" />
                <meta property="og:description" content="A US-based product studio building custom software, AI automation, and cloud systems for startups and enterprises. Outcome-driven, fixed-scope engagements." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-home.jpg" />
                <meta property="og:url" content="https://trovina.io/" />
                <meta property="og:site_name" content="Trovina.io" />
                <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* ===================== HERO ===================== */}
                <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
                    {/* Ambient brand glow + grid */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
                        <div className="absolute -top-28 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/15" />
                        <div className="absolute top-16 right-1/4 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-700/20" />
                        <div className="absolute top-24 left-1/4 h-64 w-64 rounded-full bg-brand-600/10 blur-3xl" />
                    </div>

                    <Container>
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center"
                        >
                            <motion.div variants={fadeUp}>
                                <span className="eyebrow">
                                    <Activity className="h-4 w-4 animate-pulse text-brand-500" />
                                    US-Based Software, AI & Cloud Studio
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className="text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                            >
                                We Build Custom Software That{' '}
                                <span className="text-gradient">Compounds Your Growth</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl"
                            >
                                Trovina is a US-based product studio. We design, build, and scale high-performance
                                web apps, mobile apps, and AI automation — engineered for speed, security, and
                                measurable business results.
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
                            >
                                <Button size="lg" onClick={() => setShowForm(true)} className="w-full sm:w-auto">
                                    Book a Free Strategy Call <ArrowRight className="h-5 w-5" />
                                </Button>
                                <Button variant="secondary" size="lg" onClick={scrollToPricing} className="w-full sm:w-auto">
                                    View Pricing
                                </Button>
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-subtle"
                            >
                                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Fixed-scope, fixed-price</span>
                                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> 500+ products shipped</span>
                                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> You own 100% of the IP</span>
                            </motion.div>
                        </motion.div>
                    </Container>
                </section>

                {/* ===================== STATS (animated) ===================== */}
                <StatsBand stats={stats} />

                {/* ===================== SERVICES ===================== */}
                <Section id="services">
                    <Container>
                        <SectionHeading
                            eyebrow="What We Do"
                            eyebrowIcon={Sparkles}
                            title="Full-Stack Product Engineering, Under One Roof"
                            description="From first prototype to enterprise scale, we cover the entire product surface — so you ship faster with one accountable partner instead of stitching vendors together."
                        />
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={inView}
                            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                        >
                            {services.map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div key={idx} variants={fadeUp}>
                                        <NavLink
                                            to={`/services/${slugify(service.title)}`}
                                            state={{ from: 'home' }}
                                            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 ease-premium hover:-translate-y-1 ${
                                                service.popular
                                                    ? 'border-brand-500/50 bg-surface shadow-lift'
                                                    : 'border-border bg-surface shadow-soft hover:border-brand-500/40 hover:shadow-card'
                                            }`}
                                        >
                                            {service.popular && (
                                                <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                                    Most Popular
                                                </span>
                                            )}
                                            <span
                                                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                                                    service.popular
                                                        ? 'bg-brand-gradient text-white'
                                                        : 'bg-brand-500/10 text-brand-600 group-hover:bg-brand-gradient group-hover:text-white dark:text-brand-400'
                                                }`}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </span>
                                            <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                                            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.desc}</p>
                                            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform group-hover:gap-2 dark:text-brand-400">
                                                Learn more <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </NavLink>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </Container>
                </Section>

                {/* ===================== WHY CHOOSE US ===================== */}
                <WhyChooseUs variant="surface" />

                {/* ===================== RESULTS ===================== */}
                <Results variant="default" />

                {/* ===================== PROCESS ===================== */}
                <Process variant="surface" />

                {/* ===================== TECHNOLOGIES ===================== */}
                <TechStack variant="default" />

                {/* ===================== INDUSTRIES ===================== */}
                <Section variant="surface">
                    <Container>
                        <SectionHeading
                            eyebrow="Industries"
                            eyebrowIcon={Globe}
                            title="Industries We Build For"
                            description="Deep experience across the sectors where software is the business — so we speak your domain from day one."
                        />
                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {industries.map((industry, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={inView}
                                    className="card card-hover p-7"
                                >
                                    <h3 className="text-lg font-semibold text-foreground">{industry.name}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">{industry.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </Section>

                {/* ===================== PRICING ===================== */}
                <Pricing variant="default" onSelect={() => setShowForm(true)} />

                {/* ===================== TESTIMONIALS ===================== */}
                <Testimonials variant="surface" />

                {/* ===================== GUARANTEE ===================== */}
                <Guarantee variant="default" />

                {/* ===================== VIDEO ===================== */}
                <Section id="video-section" variant="surface">
                    <Container>
                        <SectionHeading
                            eyebrow="Who We Are"
                            eyebrowIcon={Play}
                            title="See How We Work"
                            description="A quick look at how we partner with teams to ship software that performs."
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={inView}
                            className="mx-auto mt-12 max-w-5xl"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-card">
                                {!isVideoPlaying ? (
                                    <button onClick={() => setIsVideoPlaying(true)} className="group relative h-full w-full focus:outline-none">
                                        <img src="/video-thumbnail.png" alt="Trovina demo video" className="absolute inset-0 h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-foreground/40 transition-colors group-hover:bg-foreground/30" />
                                        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
                                            <motion.div className="hidden md:block" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                                <Smartphone className="h-20 w-20 text-white/90" />
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl md:h-24 md:w-24">
                                                <Play className="ml-1 h-8 w-8 text-brand-600 md:h-10 md:w-10" />
                                            </motion.div>
                                            <p className="hidden text-2xl font-semibold text-white md:block">Watch Video</p>
                                        </div>
                                    </button>
                                ) : (
                                    <>
                                        <iframe
                                            className="absolute inset-0 h-full w-full"
                                            src="https://www.youtube.com/embed/Eiik7yjxDBk?si=VknfOzJxwZkDTYhy"
                                            title="Trovina explainer video"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                        />
                                        <button
                                            onClick={() => setIsVideoPlaying(false)}
                                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/70 text-white transition-colors hover:bg-white hover:text-foreground"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </Container>
                </Section>

                {/* ===================== FAQ ===================== */}
                <FAQ variant="default" withSchema={false} />

                {/* ===================== CTA ===================== */}
                <Section variant="surface">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={inView}
                            className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-brand-gradient px-8 py-16 text-center shadow-lift md:px-12"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                            <div className="relative">
                                <h2 className="text-balance text-3xl font-bold text-white md:text-5xl">
                                    Let's Scope Your Project — Free
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                                    Book a 30-minute strategy call. We'll pressure-test your idea, map the fastest path
                                    to results, and send you a fixed-scope plan and price — no obligation.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setShowForm(true)}
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-xl transition-all hover:bg-white/90"
                                >
                                    Book a Free Strategy Call <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </Container>
                </Section>

                <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
                <Footer />
            </div>
        </>
    );
}

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    Zap, ArrowRight, CheckCircle, Play, X, Smartphone, Activity,
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
import { stagger, fadeUp, inView } from '../lib/motion';

export default function Home() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const scrollToVideo = () => {
        document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const services = [
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            desc: 'Custom iOS and Android apps built with Flutter, React Native, and native frameworks, optimized for performance, security, and seamless user experience.',
        },
        {
            icon: Globe,
            title: 'Web App & Website Development',
            desc: 'High-performance websites and scalable web applications using React, Next.js, and modern UX frameworks, engineered for speed, stability, and conversion.',
        },
        {
            icon: Bot,
            title: 'AI Automation & Workflow Systems',
            desc: 'AI-powered automation using machine learning, LLMs, and workflow engines, designed to reduce manual work, eliminate errors, and accelerate operations.',
            popular: true,
        },
        {
            icon: Cloud,
            title: 'Cloud Infrastructure & DevOps',
            desc: 'Secure and scalable cloud systems on AWS, Azure, and GCP, including DevOps, CI/CD automation, monitoring, and long-term infrastructure support.',
        },
        {
            icon: Search,
            title: 'SEO & Growth Optimization',
            desc: 'Data-driven SEO strategies, technical optimization, and content systems designed to increase organic visibility, qualified traffic, and long-term search performance.',
        },
        {
            icon: Palette,
            title: 'Branding & Visual Identity',
            desc: 'Strategic branding, logo systems, and visual identity design that establish credibility, consistency, and a strong market presence across digital platforms.',
        },
        {
            icon: PenTool,
            title: 'Graphics & Creative Design',
            desc: 'Professional graphic design for websites, social media, ads, and marketing materials, crafted to communicate clearly, convert effectively, and reinforce brand identity.',
        },
        {
            icon: Video,
            title: 'Video Editing & Motion Content',
            desc: 'High-quality video editing for ads, reels, product demos, and corporate content, optimized for engagement, storytelling, and platform-specific performance.',
        },
    ];

    const industries = [
        { name: 'E-Commerce & Retail', desc: 'Online stores, delivery apps, marketplace platforms, product tracking, and digital payment systems for growing retail brands' },
        { name: 'Healthcare', desc: 'Telemedicine platforms, patient record systems, appointment scheduling apps, and health tracking solutions' },
        { name: 'FinTech', desc: 'Mobile banking apps, digital payment systems, loan management platforms, and secure transaction technology' },
        { name: 'Education', desc: 'Online learning systems, course platforms, student portals, and virtual classroom apps' },
        { name: 'Logistics & Supply Chain', desc: 'Live delivery tracking, fleet systems, route optimization, and warehouse control platforms' },
        { name: 'Startups & SaaS', desc: 'MVP development, SaaS platforms, subscription systems, and AI powered web or mobile applications' },
    ];

    const stats = [
        { number: '500+', label: 'Digital Products Built' },
        { number: '98%', label: 'Client Success Rating' },
        { number: '50+', label: 'Global Clients in 50+ Countries' },
        { number: '24/7', label: 'Support & Maintenance' },
    ];

    const slugify = (title) =>
        title.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return (
        <>
            <Helmet>
                <title>Trovina.io | Mobile App, Website, AI and Cloud Development Studio</title>
                <meta
                    name="description"
                    content="Build mobile apps, websites, AI automation and cloud infrastructure with Trovina.io. Modern, scalable solutions for global businesses."
                />
                <meta
                    name="keywords"
                    content="mobile app development, website development, AI automation, cloud architecture, software development africa"
                />
                <meta property="og:title" content="Trovina.io | Build Your Digital Future" />
                <meta property="og:description" content="Mobile apps, websites, AI automation, and cloud solutions built for growth. Start your project with expert support." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-home.jpg" />
                <meta property="og:url" content="https://trovina.io/" />
                <meta property="og:site_name" content="Trovina.io" />
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* ===================== HERO ===================== */}
                <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                    {/* Ambient brand glow + grid */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
                        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/15" />
                        <div className="absolute -top-10 right-1/4 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-700/20" />
                    </div>

                    <Container>
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                className="space-y-7 text-center lg:text-left"
                            >
                                <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
                                    <span className="eyebrow">
                                        <Activity className="h-4 w-4 animate-pulse text-brand-500" />
                                        Mobile • Web • AI • Cloud
                                    </span>
                                </motion.div>

                                <motion.h1
                                    variants={fadeUp}
                                    className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
                                >
                                    Build Powerful Digital{' '}
                                    <span className="text-gradient">Products That Scale</span>
                                </motion.h1>

                                <motion.p
                                    variants={fadeUp}
                                    className="mx-auto max-w-xl text-lg leading-relaxed text-muted md:text-xl lg:mx-0"
                                >
                                    We design and develop world-class mobile apps, web platforms, AI automation
                                    systems, and cloud-powered infrastructure — built for speed, security, and
                                    business growth.
                                </motion.p>

                                <motion.div
                                    variants={fadeUp}
                                    className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                                >
                                    <Button size="lg" onClick={() => setShowForm(true)} className="w-full sm:w-auto">
                                        Start Your Project <ArrowRight className="h-5 w-5" />
                                    </Button>
                                    <Button variant="secondary" size="lg" onClick={scrollToVideo} className="w-full sm:w-auto">
                                        See How We Work
                                    </Button>
                                </motion.div>

                                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-subtle lg:justify-start">
                                    <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Trusted in 50+ countries</span>
                                    <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> 500+ products shipped</span>
                                </motion.div>
                            </motion.div>

                            {/* Code/terminal card */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="mx-auto w-full max-w-md lg:mx-0"
                            >
                                <div className="card overflow-hidden p-0 shadow-card">
                                    <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-5 py-3.5">
                                        <span className="h-3 w-3 rounded-full bg-danger/80" />
                                        <span className="h-3 w-3 rounded-full bg-warning/80" />
                                        <span className="h-3 w-3 rounded-full bg-success/80" />
                                        <span className="ml-3 font-mono text-xs text-subtle">trovina.build.ts</span>
                                    </div>
                                    <div className="space-y-3 p-6 font-mono text-xs sm:text-sm">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-brand-600 dark:text-brand-400">const</span>
                                            <span className="text-foreground">solution</span>
                                            <span className="text-subtle">=</span>
                                            <span className="text-warning">await</span>
                                            <span className="text-gradient font-semibold">Trovina.build</span>
                                            <span className="text-subtle">()</span>
                                        </div>
                                        <div className="space-y-2 border-l-2 border-border pl-4">
                                            <div className="text-subtle">// Mobile • Web • AI • Cloud</div>
                                            {[
                                                { icon: CheckCircle, text: 'Mobile app deployed successfully', cls: 'text-success' },
                                                { icon: CheckCircle, text: 'Web platform launched', cls: 'text-success' },
                                                { icon: Zap, text: 'AI workflow active...', cls: 'text-warning' },
                                            ].map((line, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -16 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.8 + i * 0.2 }}
                                                    className={`flex items-center gap-2 ${line.cls}`}
                                                >
                                                    <line.icon className="h-4 w-4" />
                                                    <span>{line.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
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
                            title="End-to-End Digital Product Development"
                            description="We build mobile apps, web platforms, AI systems, and cloud infrastructure designed for speed, scalability, and long-term growth."
                        />
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={inView}
                            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
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

                {/* ===================== PROCESS ===================== */}
                <Process variant="default" />

                {/* ===================== TECHNOLOGIES ===================== */}
                <TechStack variant="surface" />

                {/* ===================== INDUSTRIES ===================== */}
                <Section>
                    <Container>
                        <SectionHeading
                            eyebrow="Industries"
                            eyebrowIcon={Globe}
                            title="Industries We Empower"
                            description="We build tailored digital solutions for fast growing industries across Africa and beyond."
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

                {/* ===================== TESTIMONIALS ===================== */}
                <Testimonials variant="surface" />

                {/* ===================== VIDEO ===================== */}
                <Section id="video-section">
                    <Container>
                        <SectionHeading
                            eyebrow="Who We Are"
                            eyebrowIcon={Play}
                            title="See Who We Are"
                            description="Watch how we deliver powerful digital solutions for our clients."
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
                                    Build the Digital Future of Your Business
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                                    Start your project with expert mobile apps, websites, AI automation, and cloud
                                    solutions. Turn your idea into a real product and grow faster.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setShowForm(true)}
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-xl transition-all hover:bg-white/90"
                                >
                                    Book a Free Strategy Session <ArrowRight className="h-5 w-5" />
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

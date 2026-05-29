import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Activity, ArrowRight, Target, Eye, Sparkles, Lightbulb, Handshake } from 'lucide-react';

import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/sections/Team';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import StatsBand from '../components/sections/StatsBand';
import { Section, Container, SectionHeading } from '../components/ui/Section';
import { stagger, fadeUp, inView } from '../lib/motion';

export default function AboutUs() {
    const [showForm, setShowForm] = useState(false);

    const values = [
        { icon: Sparkles, title: 'Excellence', desc: 'We focus on clean code, strong design, and consistent results. Every project is built to be reliable, secure, and high performing.' },
        { icon: Lightbulb, title: 'Innovation', desc: 'We explore new technologies in mobile, web, AI, and cloud to bring our clients the best solutions for future growth.' },
        { icon: Handshake, title: 'Partnership', desc: 'We work closely with every client, understand their goals, and build technology that supports long term success.' },
    ];

    const stats = [
        { number: '500+', label: 'Digital Products Built' },
        { number: '98%', label: 'Client Success Rating' },
        { number: '50+', label: 'Countries Served' },
        { number: '24/7', label: 'Support & Maintenance' },
    ];

    return (
        <>
            <Helmet>
                <title>About Trovina.io | Modern Digital Studio</title>
                <meta
                    name="description"
                    content="Learn about Trovina — a mobile, web, AI and cloud software studio building scalable digital products for global clients."
                />
                <meta
                    name="keywords"
                    content="about trovina, software studio, app development company, technology company africa"
                />
                <meta property="og:title" content="About Trovina.io" />
                <meta property="og:description" content="Learn about our mission, values, and vision. Trovina builds modern digital products that power business growth." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-about.jpg" />
                <meta property="og:url" content="https://trovina.io/about" />
                <meta property="og:site_name" content="Trovina.io" />
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero */}
                <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
                        <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
                    </div>
                    <Container className="max-w-4xl text-center">
                        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
                            <motion.span variants={fadeUp} className="eyebrow">
                                <Activity className="h-4 w-4 animate-pulse text-brand-500" />
                                About Trovina Web Studio
                            </motion.span>
                            <motion.h1 variants={fadeUp} className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                                We Create Digital Experiences That <span className="text-gradient">Move Businesses Forward</span>
                            </motion.h1>
                            <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                                Trovina creates mobile apps, websites, AI automation, and cloud systems that help
                                businesses grow faster, operate smarter, and connect with customers around the world.
                            </motion.p>
                        </motion.div>
                    </Container>
                </section>

                {/* Stats */}
                <StatsBand stats={stats} />

                {/* Mission & Vision */}
                <Section>
                    <Container>
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={inView}
                            className="grid gap-6 md:grid-cols-2"
                        >
                            <motion.div variants={fadeUp} className="card p-8 md:p-10">
                                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                                    <Target className="h-6 w-6" />
                                </span>
                                <h2 className="text-2xl font-bold md:text-3xl">Our Mission</h2>
                                <p className="mt-4 text-lg leading-relaxed text-muted">
                                    Our mission is to help businesses build digital products that deliver real results.
                                    We focus on quality, scalability, and long term success by creating technology that
                                    solves real problems and supports measurable growth.
                                </p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="card p-8 md:p-10">
                                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                                    <Eye className="h-6 w-6" />
                                </span>
                                <h2 className="text-2xl font-bold md:text-3xl">Our Vision</h2>
                                <p className="mt-4 text-lg leading-relaxed text-muted">
                                    Our vision is to become a global leader in mobile, web, AI, and cloud development by
                                    delivering technology that inspires innovation, improves lives, and helps businesses
                                    grow in every market.
                                </p>
                            </motion.div>
                        </motion.div>
                    </Container>
                </Section>

                {/* Our Story + image */}
                <Section variant="surface">
                    <Container>
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView}>
                                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
                                <p className="mt-6 text-lg leading-relaxed text-muted">
                                    Trovina was created to help businesses bring their ideas to life through technology.
                                    Our approach is simple. We listen, we plan carefully, and we build digital products
                                    that are fast, secure, and easy to use.
                                </p>
                                <p className="mt-4 text-lg leading-relaxed text-muted">
                                    We focus on strong communication, modern development tools, and long term
                                    partnerships that support our clients as they scale and evolve.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={inView}
                                className="overflow-hidden rounded-3xl border border-border shadow-card"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=686&fit=crop&q=80"
                                    alt="Trovina diverse team collaborating in modern office"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </Container>
                </Section>

                {/* Values */}
                <Section>
                    <Container>
                        <SectionHeading eyebrow="What Drives Us" eyebrowIcon={Sparkles} title="Our Values" />
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={inView}
                            className="mt-14 grid gap-6 md:grid-cols-3"
                        >
                            {values.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div key={value.title} variants={fadeUp} className="card card-hover p-8">
                                        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                                            <Icon className="h-6 w-6" />
                                        </span>
                                        <h3 className="text-xl font-bold">{value.title}</h3>
                                        <p className="mt-3 leading-relaxed text-muted">{value.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </Container>
                </Section>

                {/* Team */}
                <Team variant="surface" />

                {/* Why choose us */}
                <WhyChooseUs variant="default" />

                {/* CTA */}
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
                                    Let’s Build Something Great Together
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                                    Start a project with expert support in mobile app development, website design, AI
                                    automation, or cloud systems. Let’s turn your idea into a working product.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setShowForm(true)}
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-xl transition-all hover:bg-white/90"
                                >
                                    Get in Touch <ArrowRight className="h-5 w-5" />
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

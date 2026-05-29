import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Smartphone, Globe, Bot, Cloud, Search, Palette, PenTool, Video } from 'lucide-react';

import ProjectFormModal from '../components/ProjectFormModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Process from '../components/sections/Process';
import { Section, Container } from '../components/ui/Section';
import Button from '../components/ui/Button';
import { fadeUp, inView } from '../lib/motion';

export default function Services() {
    const [showForm, setShowForm] = useState(false);

    const services = [
        {
            slug: 'mobile-app-development',
            title: 'Mobile App Development',
            icon: Smartphone,
            desc: 'We develop secure and high performance mobile applications for iOS and Android. Our team builds MVPs and enterprise apps using React Native, Flutter, Swift, and Kotlin. Every project is fast, stable, and designed to deliver a great user experience.',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'web-app-website-development',
            title: 'Website Development',
            icon: Globe,
            desc: 'We build modern websites and web applications using React, Next.js, Tailwind CSS, and Laravel. All websites are designed for strong SEO performance, fast loading speed, mobile accessibility, and a clean user experience.',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'ai-automation-workflow-systems',
            title: 'AI Automation',
            icon: Bot,
            desc: 'We create AI powered automation for business operations using machine learning, LLMs, and computer vision. Our solutions help reduce manual work, lower costs, and improve speed and decision making.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'cloud-infrastructure-devops',
            title: 'Cloud Infrastructure',
            icon: Cloud,
            desc: 'We design and manage secure cloud infrastructure on AWS, Google Cloud, and Azure. Our services include DevOps support, CI and CD pipelines, Docker and Kubernetes setup, monitoring, backups, and cloud cost management.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'seo-growth-optimization',
            title: 'SEO & Growth Optimization',
            icon: Search,
            desc: 'We deliver data-driven SEO strategies, technical optimization, keyword research, content systems, and link building to increase organic traffic, improve Google rankings, and drive sustainable revenue growth.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'branding-visual-identity',
            title: 'Branding & Visual Identity',
            icon: Palette,
            desc: 'We create strategic brand identities including logos, color palettes, typography, guidelines, and visual assets that build recognition, trust, and emotional connection with your audience.',
            image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'graphics-creative-design',
            title: 'Graphics & Creative Design',
            icon: PenTool,
            desc: 'Professional graphic design for social media posts, flyers, ads, infographics, banners, and marketing materials that grab attention, communicate clearly, and strengthen your brand.',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80',
        },
        {
            slug: 'video-editing-motion-content',
            title: 'Video Editing & Motion Content',
            icon: Video,
            desc: 'High-quality video editing, motion graphics, color grading, and animation for social media reels, YouTube, ads, and corporate videos that boost engagement and conversions.',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Trovina Services | Mobile App, Website, AI and Cloud Development</title>
                <meta
                    name="description"
                    content="Explore our services: mobile app development, website development, AI automation, cloud infrastructure and DevOps."
                />
                <meta
                    name="keywords"
                    content="software services, app development, website apps, AI development, cloud devops"
                />
                <meta property="og:title" content="Trovina Services | Digital Development Studio" />
                <meta property="og:description" content="Mobile app development, website development, AI automation, cloud infrastructure, branding and more." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-services.jpg" />
                <meta property="og:url" content="https://trovina.io/services" />
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
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
                            <span className="eyebrow">
                                <Activity className="h-4 w-4 animate-pulse text-brand-500" />
                                Our Services
                            </span>
                            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                                Digital Services Designed for <span className="text-gradient">Business Growth</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                                From planning to launch to long term support, we deliver scalable digital solutions that
                                help businesses grow, stay competitive, and reach more customers.
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* Services showcase */}
                <Section>
                    <Container>
                        <div className="space-y-24 md:space-y-32">
                            {services.map((service, idx) => {
                                const Icon = service.icon;
                                const reversed = idx % 2 === 1;
                                return (
                                    <motion.div
                                        key={service.slug}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={inView}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                                    >
                                        <div className={`overflow-hidden rounded-3xl border border-border shadow-card ${reversed ? 'lg:order-2' : ''}`}>
                                            <img src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover" />
                                        </div>
                                        <div className={`space-y-6 ${reversed ? 'lg:order-1' : ''}`}>
                                            <div className="flex items-center gap-4">
                                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                                                    <Icon className="h-7 w-7" />
                                                </span>
                                                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h2>
                                            </div>
                                            <p className="text-lg leading-relaxed text-muted">{service.desc}</p>
                                            <Button to={`/services/${service.slug}`} state={{ from: 'services' }}>
                                                Learn More <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </Container>
                </Section>

                {/* Process */}
                <Process variant="surface" />

                {/* CTA */}
                <Section>
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
                                    Start Your Project With Expert Support
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                                    Share your goals with us and we will help you plan the right mobile app, website, AI
                                    automation, or cloud solution for your business.
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

import React from 'react';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProjectFormModal from '../components/ProjectFormModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { Activity, Menu, X, ArrowRight, Smartphone, Globe, Bot, Cloud } from 'lucide-react';

export default function Services() {
    const [showForm, setShowForm] = useState(false)


    const services = [
        {
            slug: "mobile-app-development",
            title: "Mobile App Development",
            icon: <Smartphone className="w-8 h-8" />,
            desc: "We develop secure and high performance mobile applications for iOS and Android. Our team builds MVPs and enterprise apps using React Native, Flutter, Swift, and Kotlin. Every project is fast, stable, and designed to deliver a great user experience.",
            image: "https://miro.medium.com/v2/resize:fit:1113/1*1rVH0LMy0Mm3bVllTc_O0A.png"
        },
        {
            slug: "web-app-website-development",
            title: "Website Development",
            icon: <Globe className="w-8 h-8" />,
            desc: "We build modern websites and web applications using React, Next.js, Tailwind CSS, and Laravel. All websites are designed for strong SEO performance, fast loading speed, mobile accessibility, and a clean user experience.",
            image: "https://cdn-images-1.medium.com/max/1000/1*djOWBfUNhFUPeDHchV9cEQ.jpeg"
        },
        {
            slug: "ai-automation-workflow-systems",
            title: "AI Automation",
            icon: <Bot className="w-8 h-8" />,
            desc: "We create AI powered automation for business operations using machine learning, LLMs, and computer vision. Our solutions help reduce manual work, lower costs, and improve speed and decision making.",
            image: "https://thumbs.dreamstime.com/b/abstract-neural-network-glowing-connections-black-background-concept-technology-science-ai-dark-generated-423447586.jpg"
        },
        {
            slug: "cloud-infrastructure-devops",
            title: "Cloud Infrastructure",
            icon: <Cloud className="w-8 h-8" />,
            desc: "We design and manage secure cloud infrastructure on AWS, Google Cloud, and Azure. Our services include DevOps support, CI and CD pipelines, Docker and Kubernetes setup, monitoring, backups, and cloud cost management.",
            image: "https://thumbs.dreamstime.com/b/futuristic-server-room-lit-neon-lights-dark-data-center-sleek-design-glowing-reflective-floor-technology-cybersecurity-385666166.jpg"
        }
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
            </Helmet>

            <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] overflow-hidden font-poppins">

                {/* Background animation */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
                    />
                </div>

                {/* Navigation */}
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-20 md:py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm"
                        >
                            <Activity className="w-4 h-4 text-white animate-pulse" />
                            <span>Our Services</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl font-bold mt-8 leading-tight"
                        >
                            Digital Services Designed for<br />Business Growth
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            From planning to launch to long term support, we deliver scalable digital solutions that help businesses grow, stay competitive, and reach more customers.
                        </motion.p>
                    </div>
                </section>

                {/* Services Display */}
                <section className="relative z-10 px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={`grid lg:grid-cols-2 gap-12 items-center mb-32 last:mb-0 ${idx % 2 === 1 ? 'lg:grid-cols-2 lg:[&>div:nth-child(1)]:order-2' : ''}`}
                            >
                                {/* Image */}
                                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold">{service.title}</h2>
                                    </div>

                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        {service.desc}
                                    </p>

                                    <Link
                                        to={`/services/${service.slug}`}
                                        state={{ from: "services" }}
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-black bg-white hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold mt-4 shadow-lg transition-all"
                                        >
                                            Learn More <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative z-10 px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="relative bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-black rounded-3xl p-12 shadow-2xl border-2 border-gray-800">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                Start Your Project With Expert Support
                            </h2>

                            <p className="text-xl mb-8 text-gray-300">
                                Share your goals with us and we will help you plan the right mobile app, website, AI automation, or cloud solution for your business.
                            </p>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-lg shadow-xl transition-all"
                            >
                                Book a Free Strategy Session
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </section>

                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

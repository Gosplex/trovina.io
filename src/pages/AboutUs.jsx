import React from 'react';
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'

import { Activity, Menu, X, ArrowRight } from 'lucide-react';

import ProjectFormModal from '../components/ProjectFormModal'
import Navbar from '../components/Navbar'

export default function AboutUs() {
    const [showForm, setShowForm] = useState(false)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

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
            <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] overflow-hidden font-poppins">
                {/* Animated background */}
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
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm">
                            <Activity className="w-4 h-4 text-white animate-pulse" />
                            <span>About Trovina Web Studio</span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
                            We Create Digital Experiences That Move Businesses Forward
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
                            Trovina creates mobile apps, websites, AI automation, and cloud systems that help businesses grow faster, operate smarter, and connect with customers around the world.
                        </motion.p>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="relative z-10 px-6 py-20 bg-[#0f0f0f]/50">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-8">
                            Our Mission
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                            className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            Our mission is to help businesses build digital products that deliver real results. We focus on quality, scalability, and long term success by creating technology that solves real problems and supports measurable growth.
                        </motion.p>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="relative z-10 px-6 py-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-8">
                            Our Vision
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                            className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            Our vision is to become a global leader in mobile, web, AI, and cloud development by delivering technology that inspires innovation, improves lives, and helps businesses grow in every market.
                        </motion.p>
                    </div>
                </section>

                {/* Our Story + Team Image */}
                <section className="relative z-10 px-6 py-20 bg-[#0f0f0f]/50">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                Trovina was created to help businesses bring their ideas to life through technology. Our approach is simple. We listen, we plan carefully, and we build digital products that are fast, secure, and easy to use.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                We focus on strong communication, modern development tools, and long term partnerships that support our clients as they scale and evolve.
                            </p>
                        </motion.div>

                        {/* Professional Team Image */}
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                            <img
                                src="https://bconsult.io/wp-content/uploads/2025/02/DALL%C2%B7E-2025-02-27-11.39.06-A-black-and-white-landscape-image-of-a-diverse-multi-racial-multi-age-professional-business-team-in-an-office.-They-are-collaborating-happily-worki-1024x585.webp"
                                alt="Trovina diverse team collaborating in modern office"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Values */}
                <section className="relative z-10 px-6 py-20 bg-[#0f0f0f]/50">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold">Our Values</h2>
                        </motion.div>

                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="grid md:grid-cols-3 gap-8">
                            <motion.div variants={itemVariants} className="p-8 bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-2xl border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Excellence</h3>
                                <p className="text-gray-400">We focus on clean code, strong design, and consistent results. Every project is built to be reliable, secure, and high performing.</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-2xl border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                                <p className="text-gray-400">We explore new technologies in mobile, web, AI, and cloud to bring our clients the best solutions for future growth.</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="p-8 bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-2xl border border-gray-800">
                                <h3 className="text-2xl font-bold mb-4">Partnership</h3>
                                <p className="text-gray-400">We work closely with every client, understand their goals, and build technology that supports long term success.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative z-10 px-6 py-20">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center">
                        <div className="relative bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-black rounded-3xl p-12 shadow-2xl border-2 border-gray-800">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Let’s Build Something Great Together</h2>
                            <p className="text-xl mb-8 text-gray-300">
                                Start a project with expert support in mobile app development, website design, AI automation, or cloud systems. Let’s turn your idea into a working product.
                            </p>
                            <motion.button onClick={() => setShowForm(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-lg shadow-xl">
                                Get in Touch <ArrowRight className="inline ml-2 w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </section>

                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />

                {/* Footer */}
                <footer className="relative z-10 px-6 py-12 border-t border-gray-800 bg-[#0f0f0f]/80">
                    <div className="max-w-7xl mx-auto text-center text-gray-400">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="relative">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-full" />
                                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
                            </div>
                            <span className="text-xl font-bold text-white">Trovina.io</span>
                        </div>
                        <p>© 2025 Trovina Web Studio. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
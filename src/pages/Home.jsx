import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle, Play, X, Smartphone, Layers, Activity, Menu, Globe, Bot, Cloud } from 'lucide-react';
import ProjectFormModal from '../components/ProjectFormModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



export default function Home() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false)


    const scrollToVideo = () => {
        document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" });
    };

    const services = [
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: "Mobile App Development",
            desc: "Custom iOS and Android apps built with Flutter, React Native, and native frameworks, optimized for performance, security, and seamless user experience."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Web App & Website Development",
            desc: "High-performance websites and scalable web applications using React, Next.js, and modern UX frameworks, engineered for speed, stability, and conversion."
        },
        {
            icon: <Bot className="w-6 h-6" />,
            title: "AI Automation & Workflow Systems",
            desc: "AI-powered automation using machine learning, LLMs, and workflow engines, designed to reduce manual work, eliminate errors, and accelerate operations.",
            popular: true
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: "Cloud Infrastructure & DevOps",
            desc: "Secure and scalable cloud systems on AWS, Azure, and GCP, including DevOps, CI/CD automation, monitoring, and long-term infrastructure support."
        }
    ];

    const industries = [
        { name: "E-Commerce & Retail", desc: "Online stores, delivery apps, marketplace platforms, product tracking, and digital payment systems for growing retail brands" },
        { name: "Healthcare", desc: "Telemedicine platforms, patient record systems, appointment scheduling apps, and health tracking solutions" },
        { name: "FinTech", desc: "Mobile banking apps, digital payment systems, loan management platforms, and secure transaction technology" },
        { name: "Education", desc: "Online learning systems, course platforms, student portals, and virtual classroom apps" },
        { name: "Logistics & Supply Chain", desc: "Live delivery tracking, fleet systems, route optimization, and warehouse control platforms" },
        { name: "Startups & SaaS", desc: "MVP development, SaaS platforms, subscription systems, and AI powered web or mobile applications" }
    ];

    const stats = [
        { number: "500+", label: "Digital Products Built" },
        { number: "98%", label: "Client Success Rating" },
        { number: "50+", label: "Global Clients in 50+ Countries" },
        { number: "24/7", label: "Support & Maintenance" }
    ];

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
                <title>Trovina.io | Mobile App, Website, AI and Cloud Development Studio</title>
                <meta
                    name="description"
                    content="Build mobile apps, websites, AI automation and cloud infrastructure with Trovina.io. Modern, scalable solutions for global businesses."
                />
                <meta
                    name="keywords"
                    content="mobile app development, website development, AI automation, cloud architecture, software development africa"
                />
                <meta property="og:title" content="Trovina.io | Digital Development Studio" />
                <meta
                    property="og:description"
                    content="We build modern, scalable mobile apps, websites, AI systems and cloud platforms."
                />
                <meta property="og:title" content="Trovina.io | Build Your Digital Future" />
                <meta property="og:description" content="Mobile apps, websites, AI automation, and cloud solutions built for growth. Start your project with expert support." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-home.jpg" />
                <meta property="og:url" content="https://trovina.io/" />
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
                <section className="relative z-10 px-6 py-16 md:py-28">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6 text-center lg:text-left"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm mx-auto lg:mx-0"
                                >
                                    <Activity className="w-4 h-4 text-white animate-pulse" />
                                    <span>Mobile • Web • AI • Cloud</span>
                                </motion.div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                        Build Powerful Digital
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="block text-white"
                                    >
                                        Products That Scale
                                    </motion.span>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
                                >
                                    We design and develop world-class mobile apps, web platforms, AI automation systems, and cloud-powered infrastructure — built for speed, security, and business growth.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowForm(true)}
                                        className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        Start Your Project <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold w-full sm:w-auto"
                                        onClick={scrollToVideo}
                                    >
                                        See How We Work
                                    </motion.button>
                                </motion.div>
                            </motion.div>

                            {/* Code block */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                whileHover={{ scale: 1.03 }}
                                className="w-full md:w-4/5 mx-auto lg:mx-0"
                            >
                                <div className="relative bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 rounded-full bg-red-500" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="mt-10 space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-white">const</span>
                                            <span className="text-blue-400">solution</span>
                                            <span className="text-gray-400">=</span>
                                            <span className="text-yellow-400">await</span>
                                            <span className="text-purple-400">Trovina.build</span>
                                            <span className="text-gray-400">()</span>
                                        </div>
                                        <div className="pl-3 sm:pl-4 border-l-2 border-gray-700 space-y-2">
                                            <div className="text-gray-400">// Mobile • Web • AI • Cloud</div>
                                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400">Mobile app deployed successfully</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400">Web platform launched</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }} className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                                                <span className="text-yellow-400">AI workflow active...</span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="relative z-10 px-6 py-16 border-y border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-sm">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3, margin: "-100px" }}
                        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Services */}
                {/* Services */}
                <section className="relative z-10 px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                End-to-End Digital Product Development
                            </h2>
                            <p className="text-xl text-gray-400">
                                We build mobile apps, web platforms, AI systems, and cloud infrastructure designed for speed, scalability, and long-term growth.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {services.map((service, idx) => {
                                const slug = service.title
                                    .toLowerCase()
                                    .replace(/ & /g, '-')
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .replace(/^-+|-+$/g, '');

                                return (
                                    <NavLink
                                        key={idx}
                                        to={`/services/${slug}`}
                                        state={{ from: "home" }}
                                        className="block"
                                    >
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05, y: -8 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className={`relative group p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden h-full
                                ${service.popular
                                                    ? 'bg-gradient-to-br from-purple-900/20 via-gray-900 to-[#0f0f0f] border-purple-500/50 shadow-2xl shadow-purple-500/20'
                                                    : 'bg-gradient-to-br from-gray-900 to-[#0f0f0f] border-gray-800 hover:border-white/50'
                                                }`}
                                        >
                                            {/* Animated glow for popular */}
                                            {service.popular && (
                                                <div className="absolute inset-0 opacity-30 pointer-events-none">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-transparent to-pink-600 blur-3xl animate-pulse" />
                                                </div>
                                            )}

                                            {/* Badge */}
                                            {service.popular && (
                                                <motion.span
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                                    className="absolute top-4 right-4 z-10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full shadow-lg shadow-yellow-500/50 ring-4 ring-yellow-400/30"
                                                >
                                                    ✨ Most Popular
                                                </motion.span>
                                            )}

                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.2 }}
                                                transition={{ duration: 0.6 }}
                                                className={`relative z-10 w-16 h-16 mb-8 rounded-2xl flex items-center justify-center transition-all duration-500
                                    ${service.popular
                                                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/60'
                                                        : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                                                    }`}
                                            >
                                                <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl scale-150 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                                                {service.icon}
                                            </motion.div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h3 className="text-2xl font-bold mb-4 text-white">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                                                    {service.desc}
                                                </p>
                                            </div>

                                            {/* Bottom accent */}
                                            {service.popular && (
                                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-70" />
                                            )}
                                        </motion.div>
                                    </NavLink>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Video Section */}
                <section id="video-section" className="relative z-10 px-6 py-20 bg-[#0f0f0f]/30 border-t border-gray-800">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                See Trovina in Action
                            </h2>
                            <p className="text-xl text-gray-400">
                                Watch how we deliver powerful digital solutions for our clients
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-3xl overflow-hidden border-2 border-gray-800 shadow-2xl">
                                {!isVideoPlaying ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-gray-900 to-black">
                                        <div className="text-center space-y-6">
                                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                                <Smartphone className="w-32 h-32 text-white" />
                                            </motion.div>
                                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsVideoPlaying(true)}>
                                                <div className="relative w-24 h-24 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-2xl">
                                                    <Play className="w-10 h-10 text-black ml-1" />
                                                </div>
                                            </motion.button>
                                            <p className="text-2xl font-semibold text-white">Watch Demo Video</p>
                                            <p className="text-gray-400">3:15 minutes</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                            allow="autoplay"
                                            allowFullScreen
                                        ></iframe>
                                        <button
                                            onClick={() => setIsVideoPlaying(false)}
                                            className="absolute top-4 right-4 w-10 h-10 bg-gray-900/90 hover:bg-white hover:text-black rounded-full flex items-center justify-center"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="relative z-10 px-6 py-20 bg-[#0f0f0f]/30 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                Industries We Empower
                            </h2>
                            <p className="text-xl text-gray-400">We build tailored digital solutions for fast growing industries across Africa and beyond.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industries.map((industry, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="p-8 bg-gradient-to-br from-gray-900/50 to-[#0f0f0f]/50 border border-gray-800 rounded-2xl hover:border-white/50 transition-all duration-500"
                                >
                                    <h3 className="text-xl font-bold mb-3 text-white">{industry.name}</h3>
                                    <p className="text-gray-400 text-sm">{industry.desc}</p>
                                </motion.div>
                            ))}
                        </div>
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Build the Digital Future of Your Business</h2>
                            <p className="text-xl mb-8 text-gray-300">
                                Start your project with expert mobile apps, websites, AI automation, and cloud solutions. Turn your idea into a real product and grow faster.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowForm(true)}
                                className="px-10 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-lg shadow-xl"
                            >
                                Book a Free Strategy Session
                            </motion.button>
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
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'

import { Activity, Menu, X, Mail, Phone, Send, MapPin } from 'lucide-react';

export default function ContactUs() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Helmet>
                <title>Contact Trovina.io | Start Your Project</title>
                <meta
                    name="description"
                    content="Get in touch with Trovina to start your mobile app, website, AI or cloud development project today."
                />
                <meta
                    name="keywords"
                    content="contact trovina, hire developers, app development quote, website quote, AI quote"
                />
                <meta property="og:title" content="Contact Trovina.io" />
                <meta property="og:description" content="Have a project idea? Get in touch with us to start building mobile apps, websites, AI systems, or cloud infrastructure." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-contact.jpg" />
                <meta property="og:url" content="https://trovina.io/contact" />
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
                <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-[#0f0f0f]/80 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        {/* Logo */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                            <div className="relative">
                                <img src="/logo.png" alt="Trovina Web Studio Logo" className="w-12 h-12 object-contain rounded-full" />
                                <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none"></div>
                            </div>
                            <span className="text-2xl font-bold text-white hidden sm:block">Trovina.io</span>
                        </motion.div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300 hover:text-white transition-colors font-medium"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/services"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300 hover:text-white transition-colors font-medium"
                                }
                            >
                                Services
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300 hover:text-white transition-colors font-medium"
                                }
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-white pb-1" : "text-gray-300 hover:text-white transition-colors font-medium"
                                }
                            >
                                Contact Us
                            </NavLink>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all shadow-lg"
                            >
                                Request Quote
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button whileTap={{ scale: 0.9 }} className="md:hidden text-white" onClick={() => setOpen(!open)}>
                            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {open && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-6 flex flex-col gap-4 pb-4">
                            <NavLink
                                to="/"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold text-center py-2" : "text-gray-300 hover:text-white font-medium text-center py-2"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/services"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold text-center py-2" : "text-gray-300 hover:text-white font-medium text-center py-2"
                                }
                            >
                                Services
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold text-center py-2" : "text-gray-300 hover:text-white font-medium text-center py-2"
                                }
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold text-center py-2" : "text-gray-300 hover:text-white font-medium text-center py-2"
                                }
                            >
                                Contact Us
                            </NavLink>
                            <button
                                onClick={() => setOpen(false)}
                                className="mx-auto px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold shadow-lg w-3/4"
                            >
                                Request Quote
                            </button>
                        </motion.div>
                    )}
                </nav>

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-20 md:py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm">
                            <Activity className="w-4 h-4 text-white animate-pulse" />
                            <span>Get in Touch</span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
                            Let's Build<br />Something Great
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
                            Whether you are ready to start a project or want expert guidance, our team is here to support your goals.
                        </motion.p>
                    </div>
                </section>

                {/* Contact Form + Info */}
                <section className="relative z-10 px-6 py-20">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
                        {/* Form */}
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-4xl font-bold mb-8">Tell Us About Your Project</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Interested In</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition appearance-none"
                                        style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }} // Matches input height exactly
                                    >
                                        <option>Mobile App Development</option>
                                        <option>Website Development</option>
                                        <option>AI Automation</option>
                                        <option>Cloud Infrastructure</option>
                                        <option>Multiple Services</option>
                                        <option>Just Exploring</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        rows="6"
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition resize-none"
                                        placeholder="Describe your idea, question, or project goals...."
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="w-full px-8 py-4 bg-white text-black rounded-lg font-semibold shadow-xl hover:bg-gray-200 transition flex items-center justify-center gap-3"
                                >
                                    Send Message <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold mb-8">How to Reach Us</h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <a href="mailto:hello@trovina.io" className="text-2xl hover:text-white transition font-medium">hello@trovina.io</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Phone</p>
                                        <p className="text-2xl font-medium">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Location</p>
                                        <p className="text-2xl font-medium">Remote First Team<br /><span className="text-lg text-gray-300">Working With Clients Across Africa, Europe, Asia, and North America</span></p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

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
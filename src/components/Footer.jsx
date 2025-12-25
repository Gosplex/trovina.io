'use client';

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 px-6 py-12 border-t border-gray-800 bg-[#0f0f0f]/80">
            <div className="max-w-7xl mx-auto text-center text-gray-400">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-4"
                >
                    <div className="relative w-8 h-8">
                        <img
                            src="/logo.png"
                            alt="Trovina Logo"
                            className="w-full h-full object-contain rounded-full"
                        />
                        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
                    </div>

                    <span className="text-xl font-bold text-white">Trovina.io</span>
                </motion.div>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <a
                        href="https://facebook.com/trovina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-colors"
                    >
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com/company/trovina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm mb-4">
                    <a href="/privacy-policy" className="hover:text-white transition-colors">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="hover:text-white transition-colors">
                        Terms of Service
                    </a>
                    <a href="/cookie-policy" className="hover:text-white transition-colors">
                        Cookie Policy
                    </a>
                    <a href="/disclaimer" className="hover:text-white transition-colors">
                        Disclaimer
                    </a>
                </div>

                <p className="mb-2">hello@trovina.io</p>
                <p>© {currentYear} Trovina.io. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
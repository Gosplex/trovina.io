import React from "react";
import { Link } from "react-router-dom";
import { Globe, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-[#0b0b0b] border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-14">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Trovina.io
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            We design and build scalable mobile apps, web platforms,
                            AI automation systems, and cloud infrastructure for
                            startups and growing businesses worldwide.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Services
                        </h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/services/mobile-app-development" className="hover:text-white">Mobile App Development</Link></li>
                            <li><Link to="/services/web-app-website-development" className="hover:text-white">Web & SaaS Development</Link></li>
                            <li><Link to="/services/ai-automation-workflow-systems" className="hover:text-white">AI Automation Systems</Link></li>
                            <li><Link to="/services/cloud-infrastructure-devops" className="hover:text-white">Cloud & DevOps</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Contact
                        </h4>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            {/* Email */}
                            <li>
                                <a
                                    href="mailto:hello@trovina.io"
                                    className="flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>hello@trovina.io</span>
                                </a>
                            </li>

                            {/* Phone */}
                            <li>
                                <a
                                    href="tel:+234XXXXXXXXXX"
                                    className="flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>+234 XXXXXXXXXX</span>
                                </a>
                            </li>

                            {/* Social icons */}
                            <li className="flex items-center gap-4 pt-2">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com/trovinaio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="Trovina.io on Facebook"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.692V11.01h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com/company/trovinaio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="Trovina.io on LinkedIn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zM7.2 19H4.1V9.4h3.1V19zM5.65 8.1C4.7 8.1 4 7.4 4 6.5s.7-1.6 1.65-1.6S7.3 5.6 7.3 6.5 6.6 8.1 5.65 8.1zM20 19h-3.1v-4.9c0-1.2 0-2.7-1.65-2.7s-1.9 1.3-1.9 2.6V19H10.2V9.4h3v1.3h.05c.42-.8 1.45-1.65 2.98-1.65 3.18 0 3.77 2.1 3.77 4.8V19z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} <span className="text-gray-300">Trovina Technologies Limited</span>.
                        All rights reserved.
                    </p>
                    <p className="mt-2">
                        <span className="text-gray-400">
                            Trovina.io is a brand operated by Trovina Technologies Limited.
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const SERVICE_LINKS = [
    { to: "/services/mobile-app-development", label: "Mobile App Development" },
    { to: "/services/web-app-website-development", label: "Web & SaaS Development" },
    { to: "/services/ai-automation-workflow-systems", label: "AI Automation Systems" },
    { to: "/services/cloud-infrastructure-devops", label: "Cloud & DevOps" },
    { to: "/services/seo-growth-optimization", label: "SEO & Growth Optimization" },
    { to: "/services/branding-visual-identity", label: "Branding & Visual Identity" },
    { to: "/services/graphics-creative-design", label: "Graphics & Creative Design" },
    { to: "/services/video-editing-motion-content", label: "Video Editing & Motion Content" },
];

const COMPANY_LINKS = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-border bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
                {/* Top section */}
                <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <img src="/logo.png" alt="Trovina.io logo" className="h-10 w-10 rounded-full object-contain" />
                            <h3 className="text-2xl font-bold text-gradient">Trovina.io</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">
                            We design and build scalable mobile apps, web platforms,
                            AI automation systems, and cloud infrastructure for
                            startups and growing businesses worldwide.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-foreground">Services</h4>
                        <ul className="space-y-3 text-sm text-muted">
                            {SERVICE_LINKS.map((s) => (
                                <li key={s.to}>
                                    <Link to={s.to} className="transition-colors hover:text-foreground">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm text-muted">
                            {COMPANY_LINKS.map((c) => (
                                <li key={c.to}>
                                    <Link to={c.to} className="transition-colors hover:text-foreground">
                                        {c.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-foreground">Contact</h4>
                        <ul className="space-y-3 text-sm text-muted">
                            <li>
                                <a
                                    href="mailto:hello@trovina.io"
                                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>hello@trovina.io</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+2349037248511"
                                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                                >
                                    <Phone className="h-4 w-4" />
                                    <span>+234 903 724 8511</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                                >
                                    <Phone className="h-4 w-4" />
                                    <span>+91 98765 43210</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+919812345678"
                                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                                >
                                    <Phone className="h-4 w-4" />
                                    <span>+91 98123 45678</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 pt-2">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com/trovinaio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Trovina.io on Facebook"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.692V11.01h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                                    </svg>
                                </a>
                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com/company/trovinaio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Trovina.io on LinkedIn"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zM7.2 19H4.1V9.4h3.1V19zM5.65 8.1C4.7 8.1 4 7.4 4 6.5s.7-1.6 1.65-1.6S7.3 5.6 7.3 6.5 6.6 8.1 5.65 8.1zM20 19h-3.1v-4.9c0-1.2 0-2.7-1.65-2.7s-1.9 1.3-1.9 2.6V19H10.2V9.4h3v1.3h.05c.42-.8 1.45-1.65 2.98-1.65 3.18 0 3.77 2.1 3.77 4.8V19z" />
                                    </svg>
                                </a>
                                {/* YouTube */}
                                <a
                                    href="https://youtube.com/@trovinaio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Trovina.io on YouTube"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        <path d="M23.498 6.186a3.01 3.01 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.378.556a3.01 3.01 0 0 0-2.12 2.13A31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 3.01 3.01 0 0 0 2.12 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.378-.556a3.01 3.01 0 0 0 2.12-2.13A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-border pt-6 text-center text-sm text-subtle">
                    <p>
                        © {new Date().getFullYear()} <span className="font-medium text-muted">Trovina Technologies Limited</span>.
                        All rights reserved.
                    </p>
                    <p className="mt-2 text-muted">
                        Trovina.io is a brand operated by Trovina Technologies Limited.
                    </p>
                </div>
            </div>
        </footer>
    );
}

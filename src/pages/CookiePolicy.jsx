import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cookie, Settings, Info, Globe } from 'lucide-react';
import ProjectFormModal from '../components/ProjectFormModal'

export default function CookiePolicy() {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <Helmet>
                <title>Cookie Policy | Trovina.io</title>
                <meta name="description" content="Learn about how Trovina.io uses cookies and similar technologies on our website." />
            </Helmet>

            <div className="min-h-screen bg-background text-foreground font-sans">
                {/* Navigation */}
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-full text-sm mb-8">
                            <Cookie className="w-5 h-5 text-foreground" />
                            <span>Cookie Policy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Cookie Policy
                        </h1>
                        <p className="text-xl text-muted">
                            Last updated: December 25, 2025
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="relative z-10 px-6 py-16">
                    <div className="max-w-4xl mx-auto space-y-12 text-muted">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <Info className="w-7 h-7 text-foreground" />
                                1. What Are Cookies?
                            </h2>
                            <p>
                                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide a better browsing experience.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <Settings className="w-7 h-7 text-foreground" />
                                2. How We Use Cookies
                            </h2>
                            <p>
                                We use cookies on Trovina.io for the following purposes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>To ensure the proper functioning of our website</li>
                                <li>To remember your preferences and settings</li>
                                <li>To analyze how visitors use our website and improve its performance</li>
                                <li>To provide personalized content and measure the effectiveness of our marketing</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <Globe className="w-7 h-7 text-foreground" />
                                3. Types of Cookies We Use
                            </h2>
                            <p>
                                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a fixed period or until you delete them).
                            </p>
                            <p className="mt-4">
                                Third-party services (such as Google Analytics) may also set cookies on our website to help us understand visitor behavior and improve user experience.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                4. Managing Cookies
                            </h2>
                            <p>
                                You can control and manage cookies in your browser settings. Most browsers allow you to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>View what cookies are stored and delete them individually</li>
                                <li>Block third-party cookies</li>
                                <li>Block cookies from specific websites</li>
                                <li>Delete all cookies when you close your browser</li>
                            </ul>
                            <p className="mt-4">
                                Please note that disabling cookies may affect the functionality of this website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                5. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Cookie Policy, please contact us at:
                            </p>
                            <p className="text-foreground font-semibold">
                                hello@trovina.io
                            </p>
                        </div>

                        <div className="pt-8 border-t border-border">
                            <p className="text-sm text-subtle">
                                We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />
            </div>
        </>
    );
}
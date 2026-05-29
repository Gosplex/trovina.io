import React from 'react';
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Scale, Handshake, AlertCircle } from 'lucide-react';
import ProjectFormModal from '../components/ProjectFormModal'

export default function TermsOfService() {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <Helmet>
                <title>Terms of Service | Trovina.io</title>
                <meta name="description" content="Read the Terms of Service for using Trovina.io website and services." />
            </Helmet>

            <div className="min-h-screen bg-background text-foreground font-sans">
                {/* Navigation */}
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-full text-sm mb-8">
                            <FileText className="w-5 h-5 text-foreground" />
                            <span>Terms of Service</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Terms of Service
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
                                <Scale className="w-7 h-7 text-foreground" />
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using the Trovina.io website and any services provided by Trovina ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <Handshake className="w-7 h-7 text-foreground" />
                                2. Services
                            </h2>
                            <p>
                                Trovina provides mobile app development, web development, AI automation, cloud infrastructure, and related consulting services. All project-specific terms, scope, timelines, and pricing will be outlined in separate written agreements or proposals.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <AlertCircle className="w-7 h-7 text-foreground" />
                                3. Intellectual Property
                            </h2>
                            <p>
                                Unless otherwise stated in a project agreement:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>You retain ownership of any content, materials, or intellectual property you provide to us.</li>
                                <li>We retain ownership of any pre-existing tools, frameworks, or code developed by Trovina prior to the project.</li>
                                <li>Upon full payment, we grant you a license to use or transfer ownership of the final deliverables as specified in the project agreement.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                4. Payment Terms
                            </h2>
                            <p>
                                All fees and payment schedules will be outlined in individual project proposals. Payments are non-refundable except as explicitly stated in a signed agreement.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                5. Limitation of Liability
                            </h2>
                            <p>
                                To the fullest extent permitted by law, Trovina shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our website or services.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                6. Changes to Terms
                            </h2>
                            <p>
                                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the updated terms.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                7. Contact Us
                            </h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <p className="text-foreground font-semibold">
                                hello@trovina.io
                            </p>
                        </div>

                        <div className="pt-8 border-t border-border">
                            <p className="text-sm text-subtle">
                                These Terms of Service were last updated on December 25, 2025.
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
import React from 'react';
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import ProjectFormModal from '../components/ProjectFormModal'

export default function PrivacyPolicy() {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <Helmet>
                <title>Privacy Policy | Trovina.io</title>
                <meta name="description" content="Learn how Trovina.io collects, uses, and protects your personal information." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] font-poppins">
                {/* Navigation */}
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-full text-sm mb-8">
                            <Shield className="w-5 h-5 text-white" />
                            <span>Privacy Policy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Your Privacy Matters to Us
                        </h1>
                        <p className="text-xl text-gray-400">
                            Last updated: December 25, 2025
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="relative z-10 px-6 py-16">
                    <div className="max-w-4xl mx-auto space-y-12 text-gray-300">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Lock className="w-7 h-7 text-white" />
                                1. Information We Collect
                            </h2>
                            <p>We collect information you provide directly to us, such as when you:</p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>Fill out contact or project inquiry forms</li>
                                <li>Request a consultation or quote</li>
                                <li>Communicate with us via email or chat</li>
                                <li>Subscribe to our newsletter</li>
                            </ul>
                            <p className="mt-4">
                                This may include your name, email address, phone number, company name, project details, and any other information you choose to provide.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Eye className="w-7 h-7 text-white" />
                                2. How We Use Your Information
                            </h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>Respond to your inquiries and provide project consultations</li>
                                <li>Communicate with you about your project or potential collaboration</li>
                                <li>Improve our services and website experience</li>
                                <li>Send you relevant updates and marketing communications (only with your consent)</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <FileText className="w-7 h-7 text-white" />
                                3. Data Protection & Security
                            </h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                4. Your Rights
                            </h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-6">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of any inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications at any time</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                5. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <p className="text-white font-semibold">
                                hello@trovina.io
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <p className="text-sm text-gray-500">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
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
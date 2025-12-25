import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, FileText, Shield, Info } from 'lucide-react';

export default function Disclaimer() {
    return (
        <>
            <Helmet>
                <title>Disclaimer | Trovina.io</title>
                <meta name="description" content="Read the official disclaimer for Trovina.io website and services." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] font-poppins">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <section className="relative z-10 px-6 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-full text-sm mb-8">
                            <AlertTriangle className="w-5 h-5 text-white" />
                            <span>Disclaimer</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Disclaimer
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
                                <Info className="w-7 h-7 text-white" />
                                1. General Information
                            </h2>
                            <p>
                                The information provided on Trovina.io is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <FileText className="w-7 h-7 text-white" />
                                2. No Professional Advice
                            </h2>
                            <p>
                                The content on this website does not constitute professional, financial, legal, or technical advice. Any reliance you place on such information is strictly at your own risk. We recommend consulting with qualified professionals for advice specific to your situation.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Shield className="w-7 h-7 text-white" />
                                3. Limitation of Liability
                            </h2>
                            <p>
                                In no event will Trovina, its founders, employees, or agents be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                4. External Links
                            </h2>
                            <p>
                                This website may contain links to external websites that are not provided or maintained by Trovina. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                            </p>
                        </div>

                        <div className="space-4">
                            <h2 className="text-2xl font-bold text-white">
                                5. Changes
                            </h2>
                            <p>
                                We reserve the right to modify or update this disclaimer at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">
                                6. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Disclaimer, please contact us at:
                            </p>
                            <p className="text-white font-semibold">
                                hello@trovina.io
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <p className="text-sm text-gray-500">
                                This Disclaimer was last updated on December 25, 2025.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
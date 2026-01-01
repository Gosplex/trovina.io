import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Clock, Smartphone, MessageSquare, Globe, Zap, ArrowRight, Facebook, Linkedin } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast';
import Footer from '../components/Footer'
import SocialProofPopup from "../components/SocialProofPopup";


export default function LandingPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [country, setCountry] = useState('ng')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        businessName: '',
        fullName: '',
        email: '',
        phone: '',
        businessType: '',
        hasWebsite: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const timeOnPageRef = useRef(0);
    const scrollTriggeredRef = useRef(false);
    const timerIntervalRef = useRef(null);
    const hasButtonOpenedRef = useRef(false);

    // COUNTDOWN TIMER - Fixed 48 hours that persists across page loads
    useEffect(() => {
        let targetTime = localStorage.getItem('offerEndTime');

        if (!targetTime) {
            targetTime = new Date().getTime() + (48 * 60 * 60 * 1000);
            localStorage.setItem('offerEndTime', targetTime);
        } else {
            targetTime = parseInt(targetTime);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    hours: Math.floor(distance / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    // AUTO TRIGGER LOGIC - Only if button hasn't been used this session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('popupDismissed') === 'true'
        const buttonUsed = sessionStorage.getItem('buttonOpenedPopup') === 'true'

        if (dismissed || buttonUsed) return

        // Timer trigger (60s)
        timerIntervalRef.current = setInterval(() => {
            timeOnPageRef.current += 1

            if (timeOnPageRef.current >= 60) {
                setShowPopup(true)
                clearInterval(timerIntervalRef.current)
            }
        }, 1000)

        // Scroll trigger (50%)
        const handleScroll = () => {
            if (scrollTriggeredRef.current) return

            const scrollPercent =
                (window.scrollY /
                    (document.documentElement.scrollHeight - window.innerHeight)) *
                100

            if (scrollPercent >= 50) {
                setShowPopup(true)
                scrollTriggeredRef.current = true
                clearInterval(timerIntervalRef.current)
                window.removeEventListener('scroll', handleScroll)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // GET THE COUNTRY FROM THE IP
    useEffect(() => {
        const detectCountry = async () => {
            try {
                const res = await fetch(
                    `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`
                )
                const data = await res.json()
                if (data?.country) {
                    setCountry(data.country.toLowerCase())
                }
            } catch (err) {
                console.log('Country detection failed:', err)
            }
        }

        detectCountry()
    }, [])


    const openPopupFromButton = () => {
        setShowPopup(true);
        hasButtonOpenedRef.current = true;
        sessionStorage.setItem('buttonOpenedPopup', 'true'); // Mark that button was used this session
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (
            !formData.businessName ||
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.businessType ||
            !formData.hasWebsite ||
            isSubmitting
        ) {
            toast.warning('Please fill in all fields')
            return
        }

        setIsSubmitting(true)

        try {
            const payload = {
                businessName: formData.businessName,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                businessType: formData.businessType,
                hasWebsite: formData.hasWebsite,
                country,
                source: 'Free Website Promo',
                createdAt: new Date().toISOString(),
            }

            await addDoc(collection(db, 'free_website_promo'), payload)

            setFormSubmitted(true)

            // WhatsApp redirect (after thank you)
            setTimeout(() => {
                const message = encodeURIComponent(
                    `Hello Trovina 👋\n\nI just applied for the *Free Website Offer*.\n\nBusiness Name: ${formData.businessName}\nName: ${formData.fullName}\nEmail: ${formData.email}`
                )

                window.location.href = `https://wa.me/234XXXXXXXXXX?text=${message}`
            }, 2000)

        } catch (err) {
            console.error('Submission failed:', err)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }


    const closePopup = () => {
        setShowPopup(false)
        sessionStorage.setItem('popupDismissed', 'true')

        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
        }
    }


    return (
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

            {/* SECTION 1: HERO */}
            <section className="relative z-10 px-6 py-16 md:py-24">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-12"
                    >
                        <div className="relative w-10 h-10">
                            <img
                                src="/logo.png"
                                alt="Trovina Logo"
                                className="w-full h-full object-contain rounded-full"
                            />
                            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
                        </div>

                        <span className="text-2xl font-bold text-white">Trovina.io</span>
                    </motion.div>


                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="block text-white">Get Your Business Online</span>
                        <span className="block text-gray-300">In 7 Days or Less</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                    >
                        We build and launch your professional website for <span className="text-white font-semibold">FREE</span>. You only pay for your domain name and hosting.
                    </motion.p>

                    {/* COUNTDOWN TIMER */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-10"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 text-gray-400">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-wide">Limited Time Offer Ends In</span>
                        </div>
                        <div className="flex justify-center gap-4 md:gap-6">
                            <div className="bg-gradient-to-br from-gray-900 to-[#0f0f0f] border-2 border-gray-800 rounded-xl p-4 md:p-6 min-w-[100px] md:min-w-[120px]">
                                <div className="text-4xl md:text-6xl font-bold text-white mb-1">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Hours</div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-900 to-[#0f0f0f] border-2 border-gray-800 rounded-xl p-4 md:p-6 min-w-[100px] md:min-w-[120px]">
                                <div className="text-4xl md:text-6xl font-bold text-white mb-1">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Minutes</div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-900 to-[#0f0f0f] border-2 border-gray-800 rounded-xl p-4 md:p-6 min-w-[100px] md:min-w-[120px]">
                                <div className="text-4xl md:text-6xl font-bold text-white mb-1">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Seconds</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Supporting bullet points */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10"
                    >
                        {[
                            { icon: <Smartphone className="w-5 h-5" />, text: "Mobile-friendly website" },
                            { icon: <Globe className="w-5 h-5" />, text: "Contact form included" },
                            { icon: <MessageSquare className="w-5 h-5" />, text: "WhatsApp click-to-chat" },
                            { icon: <Zap className="w-5 h-5" />, text: "Google Business Profile setup" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-left bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <div className="text-white">{item.icon}</div>
                                <span className="text-gray-300">{item.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button - Now opens popup */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openPopupFromButton}
                        className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-lg shadow-xl inline-flex items-center gap-2"
                    >
                        Get My Free Website
                    </motion.button>
                </div>
            </section>

            {/* SECTION 2: PROBLEM */}
            <section className="relative z-10 px-6 py-16 border-t border-gray-800">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Every Day Without a Website Is Lost Revenue
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Nigerian customers search for businesses online before they buy. If they can't find you, they'll find your competitor instead. Without a professional web presence, you're invisible to thousands of potential customers actively looking for what you offer.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 3: SOLUTION */}
            <section className="relative z-10 px-6 py-16 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                We Handle Everything. You Focus on Your Business.
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Trovina.io builds and launches professional business websites in 7 days or less. No technical skills needed. No hidden fees. Just a clean, mobile-friendly website that helps you attract and convert customers.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                We've built websites for over 500 businesses across Nigeria and beyond. Let us do the same for you.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {[
                                "Professional website design",
                                "Mobile-responsive layout",
                                "Contact form integration",
                                "WhatsApp click-to-chat button",
                                "Google Business Profile setup",
                                "Basic SEO optimization",
                                "7-day launch guarantee"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: OFFER BREAKDOWN */}
            <section className="relative z-10 px-6 py-16 border-t border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-black border-2 border-gray-800 rounded-2xl p-8 md:p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
                            Here's What You Pay (And Don't Pay)
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                <div className="text-green-400 font-bold text-sm mb-2 uppercase tracking-wide">Included FREE</div>
                                <div className="text-2xl font-bold text-white mb-4">Website Setup & Design</div>
                                <div className="text-gray-400 line-through text-xl mb-2">₦250,000</div>
                                <div className="text-3xl font-bold text-white mb-4">₦0</div>
                                <div className="text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700">
                                    + Google Business Profile Setup
                                </div>
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                <div className="text-gray-400 font-bold text-sm mb-2 uppercase tracking-wide">You Only Pay</div>
                                <div className="text-2xl font-bold text-white mb-4">Domain + Hosting</div>
                                <div className="text-3xl font-bold text-white mb-2">₦90,000</div>
                                <div className="text-sm text-gray-400">(One-time setup fee)</div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                            <p className="text-yellow-400 font-semibold text-lg">
                                ⚠️ Only 8 slots available this month
                            </p>
                            <p className="text-gray-300 mt-2">
                                We limit our monthly intake to ensure quality delivery for every client.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5: WHO THIS IS FOR */}
            <section className="relative z-10 px-6 py-16 border-t border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            This Offer Is Perfect For
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {[
                            "Small businesses without a website",
                            "Businesses with outdated or broken websites",
                            "Service providers who need an online presence",
                            "Retailers ready to attract online customers",
                            "Entrepreneurs launching a new business",
                            "Professionals who want to be found on Google"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                                <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-lg text-gray-200">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 6: TRUST BLOCK */}
            <section className="relative z-10 px-6 py-16 border-t border-gray-800">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Trusted by Nigerian Businesses
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        Trovina.io has delivered over 500 digital products for businesses across Nigeria and 50+ countries worldwide. We understand what Nigerian SMEs need to succeed online, and we deliver results without excuses.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-gray-400">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-gray-400">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">7 Days</div>
                            <div className="text-gray-400">Average Launch Time</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 7: FOOTER */}
            <Footer />

            {/* POPUP FORM */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closePopup}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-gray-900 to-[#0f0f0f] border-2 border-gray-800 rounded-2xl p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto relative"
                        >
                            <button
                                onClick={closePopup}
                                className="absolute top-4 right-4 w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {!formSubmitted ? (
                                <>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
                                        See If Your Business Qualifies for a Free Website
                                    </h3>
                                    <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                                        Answer a few quick questions and we’ll confirm within 24 hours if your business qualifies for this free website offer.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Business Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                                placeholder="Enter your business name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                                placeholder="+234 800 000 0000"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Business Type *
                                            </label>
                                            <select
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                            >
                                                <option value="">Select your business type</option>
                                                <option value="retail">Retail / E-commerce</option>
                                                <option value="services">Professional Services</option>
                                                <option value="restaurant">Restaurant / Food</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="education">Education</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Do you currently have a website? *
                                            </label>
                                            <select
                                                name="hasWebsite"
                                                value={formData.hasWebsite}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                                            >
                                                <option value="">Select an option</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center">
                                        <motion.button
                                            disabled={isSubmitting}
                                            onClick={handleSubmit}
                                            className={`px-12 py-4 rounded-lg font-bold text-lg shadow-xl transition-colors ${isSubmitting
                                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                : 'bg-white text-black hover:bg-gray-200'
                                                }`}
                                        >
                                            {isSubmitting ? 'Submitting…' : 'Claim My Free Website'}
                                        </motion.button>


                                        <p className="text-center text-sm text-gray-400 mt-4">
                                            We will contact you within 24 hours
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle className="w-12 h-12 text-white" />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                                    <p className="text-lg text-gray-300 max-w-md mx-auto">
                                        We've received your information and will contact you within 24 hours.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <SocialProofPopup pause={showPopup} />


        </div>
    );
}
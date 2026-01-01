import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ThankYouRedirect from './ThankYouRedirect'
import { BUSINESS_TYPES } from "../constants/businessTypes";


export default function ProjectFormModal({ open, onClose }) {
    const { executeRecaptcha } = useGoogleReCaptcha()

    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('ng')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)

    const [form, setForm] = useState({
        name: '',
        businessName: '',        // ← NEW FIELD
        email: '',
        businessEmail: '',
        businessType: '',
        customBusinessType: '',
        service: '',
        description: '',
    })

    // Detect country from IP
    useEffect(() => {
        if (!open) return

        const detectCountry = async () => {
            try {
                const res = await fetch(
                    `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`
                )
                const data = await res.json()
                if (data?.country) setCountry(data.country.toLowerCase())
            } catch (err) {
                console.log('IP detection failed:', err)
            }
        }

        detectCountry()
    }, [open])

    if (!open) return null

    const updateForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!executeRecaptcha || isSubmitting) return

        setIsSubmitting(true)

        try {
            const token = await executeRecaptcha('project_form_submit')

            const payload = {
                fullName: form.name,
                emailAddress: form.email,
                phoneNumber: phone,
                businessName: form.businessName,
                businessEmail: form.businessEmail || null,
                businessType:
                    form.businessType === "Other"
                        ? form.customBusinessType
                        : form.businessType,
                interestedService: form.service,
                projectDescription: form.description,
                hasAWebsite: null,
                websiteUrl: null,
                country,
                leadStatus: "new",
                source: "project-form",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                recaptchaToken: token,
            }

            await addDoc(collection(db, "leads"), payload)

            setForm({
                name: '',
                businessName: '',
                email: '',
                businessEmail: '',
                businessType: '',
                customBusinessType: '',
                service: '',
                description: '',
            });
            setPhone('')
            setShowThankYou(true)

        } catch (err) {
            console.error('Submit failed:', err)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-black border border-gray-800 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[95vh]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white transition"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Start Your Project
                            </h2>
                            <p className="text-gray-400">
                                Tell us about your idea and we’ll get back within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name + Business Name */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={updateForm}
                                    placeholder="Full Name *"
                                    className="input"
                                    required
                                />
                                <input
                                    name="businessName"
                                    value={form.businessName}
                                    onChange={updateForm}
                                    placeholder="Business Name *"
                                    className="input"
                                    required
                                />
                            </div>

                            {/* Email + Business Email */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={updateForm}
                                    placeholder="Personal Email *"
                                    className="input"
                                    required
                                />
                                <input
                                    name="businessEmail"
                                    type="email"
                                    value={form.businessEmail}
                                    onChange={updateForm}
                                    placeholder="Business Email (optional)"
                                    className="input"
                                />
                            </div>

                            {/* Business Type */}
                            <select
                                name="businessType"
                                value={form.businessType}
                                onChange={updateForm}
                                className="input"
                                required
                            >
                                <option value="">Select Business Type *</option>
                                {BUSINESS_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            {/* Custom Business Type (only if Other) */}
                            {form.businessType === "Other" && (
                                <input
                                    name="customBusinessType"
                                    value={form.customBusinessType}
                                    onChange={updateForm}
                                    placeholder="Enter your business type *"
                                    className="input"
                                    required
                                />
                            )}

                            {/* Phone */}
                            <div className="flex items-center h-[56px] bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                                <PhoneInput
                                    country={country}
                                    value={phone}
                                    onChange={setPhone}
                                    inputClassName="!bg-transparent !border-none !text-white !h-full !pl-4 !pr-3 !outline-none"
                                    countrySelectorStyleProps={{
                                        buttonClassName: '!bg-transparent !border-none !px-4 !h-full !text-white',
                                        dropdownStyleProps: { className: '!bg-gray-900 !border-gray-700' },
                                    }}
                                    className="w-full"
                                />
                            </div>

                            {/* Service */}
                            <select
                                name="service"
                                value={form.service}
                                onChange={updateForm}
                                className="input"
                                required
                            >
                                <option value="">Select a Service *</option>
                                <option>Mobile App Development</option>
                                <option>Web App / Website</option>
                                <option>AI Automation & Workflow</option>
                                <option>Cloud Infrastructure & DevOps</option>
                                <option>Other</option>
                            </select>

                            {/* Description */}
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={updateForm}
                                rows="5"
                                placeholder="Describe your project in detail... *"
                                className="input resize-none"
                                required
                            />

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                type="submit"
                                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isSubmitting
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-gray-100 shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-6 h-6 border-3 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                        Submitting…
                                    </>
                                ) : (
                                    'Book a Call With Us'
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Thank You Redirect */}
            <ThankYouRedirect
                key={showThankYou ? 'open' : 'closed'}
                open={showThankYou}
                onClose={() => {
                    setShowThankYou(false)
                    onClose()
                }}
                redirectUrl="https://calendly.com/YOUR_CALENDLY_LINK" // ← Replace with your real Calendly link
            />
        </>
    )
}
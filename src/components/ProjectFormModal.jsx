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
    const [country, setCountry] = useState('us')
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
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 32 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 32 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface p-8 shadow-card"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-3xl font-bold text-foreground">
                                Start Your Project
                            </h2>
                            <p className="text-muted">
                                Tell us about your idea and we’ll get back within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name + Business Name */}
                            <div className="grid gap-4 md:grid-cols-2">
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
                            <div className="grid gap-4 md:grid-cols-2">
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

                            {/* Phone + Service — kept on one row to avoid scrolling */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Phone */}
                                <div className="flex h-[52px] items-center overflow-hidden rounded-xl border border-border bg-surface focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
                                    <PhoneInput
                                        country={country}
                                        value={phone}
                                        onChange={setPhone}
                                        inputClassName="!h-full !w-full !border-none !bg-transparent !pl-4 !pr-3 !text-foreground !outline-none"
                                        countrySelectorStyleProps={{
                                            buttonClassName: '!h-full !border-none !bg-transparent !px-4 !text-foreground',
                                            dropdownStyleProps: { className: '!bg-surface !border !border-border !text-foreground' },
                                        }}
                                        className="w-full"
                                    />
                                </div>

                                {/* Service */}
                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={updateForm}
                                    className="input h-[52px]"
                                    required
                                >
                                    <option value="">Select a Service *</option>
                                    <option>Mobile App Development</option>
                                    <option>Web App / Website</option>
                                    <option>AI Automation & Workflow</option>
                                    <option>Cloud Infrastructure & DevOps</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* Description */}
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={updateForm}
                                rows="4"
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
                                className="btn-primary btn-lg w-full text-base"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-transparent" />
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

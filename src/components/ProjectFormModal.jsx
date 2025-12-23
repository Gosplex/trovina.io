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

export default function ProjectFormModal({ open, onClose }) {
    const { executeRecaptcha } = useGoogleReCaptcha()

    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('ng')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        businessEmail: '',
        service: '',
        description: '',
    })

    // Detect country
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
                ...form,
                phone,
                country,
                recaptchaToken: token,
                createdAt: new Date().toISOString(),
            }

            await addDoc(collection(db, 'leads'), payload)

            // Clear form
            setForm({
                name: '',
                email: '',
                businessEmail: '',
                service: '',
                description: '',
            })
            setPhone('')

            // Show thank you
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
                        className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-black border border-gray-800 rounded-3xl shadow-2xl p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Start Your Project
                            </h2>
                            <p className="text-gray-400">
                                Tell us about your idea and we’ll get back within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={updateForm}
                                    placeholder="Full Name"
                                    className="input"
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={updateForm}
                                    placeholder="Email Address"
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center h-[52px] bg-black/40 border border-gray-700 rounded-xl overflow-hidden">
                                    <PhoneInput
                                        country={country}
                                        value={phone}
                                        onChange={setPhone}
                                        className="w-full h-full"
                                        inputClassName="!bg-transparent !border-none !text-white !pl-3"
                                        countrySelectorStyleProps={{
                                            buttonClassName:
                                                '!bg-transparent !border-none !px-3 !text-white',
                                        }}
                                    />
                                </div>

                                <input
                                    name="businessEmail"
                                    value={form.businessEmail}
                                    onChange={updateForm}
                                    placeholder="Business Email (optional)"
                                    className="input"
                                />
                            </div>

                            <select
                                name="service"
                                value={form.service}
                                onChange={updateForm}
                                className="input"
                                required
                            >
                                <option value="">Request Service</option>
                                <option>Mobile App Development</option>
                                <option>Web App / Website</option>
                                <option>AI Automation & Workflow</option>
                                <option>Cloud Infrastructure & DevOps</option>
                                <option>Other</option>
                            </select>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={updateForm}
                                rows="4"
                                placeholder="Describe your project..."
                                className="input resize-none"
                                required
                            />

                            <motion.button
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold flex justify-center gap-3 ${isSubmitting
                                    ? 'bg-gray-300 text-gray-600'
                                    : 'bg-white text-black'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
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

            {/* THANK YOU */}
            <ThankYouRedirect
                key={showThankYou ? 'open' : 'closed'}
                open={showThankYou}
                onClose={() => {
                    setShowThankYou(false)
                    onClose()
                }}
                redirectUrl="https://calendly.com/YOUR_CALENDLY_LINK"
            />
        </>
    )
}

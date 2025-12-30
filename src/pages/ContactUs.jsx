import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import ProjectFormModal from '../components/ProjectFormModal'
import { Activity, Mail, Phone, Send, MapPin } from 'lucide-react'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'
import { PhoneInput } from 'react-international-phone'



export default function ContactUs() {
    const [showForm, setShowForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    })

    const updateForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const [phone, setPhone] = useState('')
    const [country] = useState('ng')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return

        setIsSubmitting(true)

        try {
            await addDoc(collection(db, 'leads'), {
                name: form.name,
                email: form.email,
                phone,
                service: form.service,
                description: form.message,
                source: 'contact-page',
                createdAt: new Date().toISOString(),
            })

            // Clear form
            setForm({
                name: '',
                email: '',
                service: '',
                message: '',
            })

            setPhone('')


            toast.success('Thank you! We’ll contact you within 24 hours.')
        } catch (err) {
            console.error('Contact form error:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Contact Trovina.io | Start Your Project</title>
                <meta
                    name="description"
                    content="Get in touch with Trovina to start your mobile app, website, AI or cloud development project today."
                />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] overflow-hidden font-poppins">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
                    />
                </div>

                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero */}
                <section className="relative z-10 px-6 py-20 md:py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm">
                            <Activity className="w-4 h-4 animate-pulse" />
                            Get in Touch
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mt-8">
                            Let's Build<br />Something Great
                        </h1>

                        <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
                            Whether you are ready to start a project or want expert guidance,
                            our team is here to help.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section className="relative z-10 px-6 py-20">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
                        {/* FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-8">
                                Tell Us About Your Project
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm mb-2">Your Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={updateForm}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-white outline-none"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={updateForm}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-white outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Phone Number</label>

                                    <div className="flex items-center h-[52px] bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden focus-within:border-white transition-colors">
                                        <PhoneInput
                                            country={country}
                                            value={phone}
                                            onChange={setPhone}
                                            className="w-full h-full"
                                            inputClassName="!h-full !bg-transparent !border-none !text-white !pl-3 !pr-4 !outline-none !placeholder-gray-400"
                                            countrySelectorStyleProps={{
                                                buttonClassName:
                                                    '!h-full !bg-transparent !border-none !px-3 !text-white hover:!bg-white/10',
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Interested In</label>
                                    <select
                                        name="service"
                                        value={form.service}
                                        onChange={updateForm}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-white outline-none"
                                    >
                                        <option value="">Select a service</option>
                                        <option>Mobile App Development</option>
                                        <option>Website Development</option>
                                        <option>AI Automation</option>
                                        <option>Cloud Infrastructure</option>
                                        <option>Multiple Services</option>
                                        <option>Just Exploring</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={updateForm}
                                        rows="6"
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-white outline-none resize-none"
                                        placeholder="Describe your idea or question..."
                                    />
                                </div>

                                <motion.button
                                    disabled={isSubmitting}
                                    className={`w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-3
                    ${isSubmitting
                                            ? 'bg-gray-300 text-gray-600'
                                            : 'bg-white text-black hover:bg-gray-200'
                                        }
                  `}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* INFO */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="text-4xl font-bold mb-8">How to Reach Us</h2>

                            <div className="space-y-8">
                                <Info icon={<Mail />} label="Email" value="hello@trovina.io" />
                                <Info icon={<Phone />} label="Phone" value="+1 (555) 123-4567" />
                                <Info
                                    icon={<MapPin />}
                                    label="Location"
                                    value="Remote First Teams"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />
            </div>
        </>
    )
}

function Info({ icon, label, value }) {
    return (
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-2xl font-medium">{value}</p>
            </div>
        </div>
    )
}

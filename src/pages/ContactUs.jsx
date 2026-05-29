import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectFormModal from '../components/ProjectFormModal'
import { Activity, Mail, Phone, Send, MapPin } from 'lucide-react'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'
import { PhoneInput } from 'react-international-phone'
import { Container } from '../components/ui/Section'
import { fadeUp, inView } from '../lib/motion'

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
                fullName: form.name,
                emailAddress: form.email,
                phoneNumber: phone,
                businessName: null,
                businessEmail: null,
                businessType: null,
                interestedService: form.service,
                projectDescription: form.message,
                hasAWebsite: null,
                websiteUrl: null,
                country,
                leadStatus: "new",
                source: "contact-page",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

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
                <meta property="og:title" content="Contact Trovina.io | Start Your Project" />
                <meta property="og:description" content="Reach out to start your mobile app, website, AI automation or cloud project with Trovina." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-contact.jpg" />
                <meta property="og:url" content="https://trovina.io/contact" />
                <meta property="og:site_name" content="Trovina.io" />
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* Hero */}
                <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
                        <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
                    </div>
                    <Container className="max-w-4xl text-center">
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
                            <span className="eyebrow">
                                <Activity className="h-4 w-4 animate-pulse text-brand-500" />
                                Get in Touch
                            </span>
                            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                                Let’s Build <span className="text-gradient">Something Great</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                                Whether you are ready to start a project or want expert guidance, our team is here to help.
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* Contact */}
                <section className="relative z-10 pb-20 pt-8">
                    <Container className="max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
                            {/* FORM */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={inView}
                                className="card p-8 md:p-10 lg:col-span-3"
                            >
                                <h2 className="text-2xl font-bold md:text-3xl">Tell Us About Your Project</h2>

                                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted">Your Name</label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={updateForm}
                                            required
                                            className="input"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={updateForm}
                                            required
                                            className="input"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted">Phone Number</label>
                                        <div className="flex h-[52px] items-center overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
                                            <PhoneInput
                                                country={country}
                                                value={phone}
                                                onChange={setPhone}
                                                className="h-full w-full"
                                                inputClassName="!h-full !w-full !border-none !bg-transparent !pl-3 !pr-4 !text-foreground !outline-none"
                                                countrySelectorStyleProps={{
                                                    buttonClassName: '!h-full !border-none !bg-transparent !px-3 !text-foreground hover:!bg-surface-2',
                                                    dropdownStyleProps: { className: '!bg-surface !border !border-border !text-foreground' },
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted">Interested In</label>
                                        <select name="service" value={form.service} onChange={updateForm} required className="input">
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
                                        <label className="mb-2 block text-sm font-medium text-muted">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={updateForm}
                                            rows="6"
                                            required
                                            className="input resize-none"
                                            placeholder="Describe your idea or question..."
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        className="btn-primary btn-lg w-full"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-transparent" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send className="h-5 w-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* INFO */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={inView}
                                className="flex flex-col justify-center lg:col-span-2"
                            >
                                <h2 className="text-2xl font-bold md:text-3xl">How to Reach Us</h2>
                                <p className="mt-3 text-muted">
                                    Prefer to reach out directly? We typically respond within a few hours.
                                </p>
                                <div className="mt-8 space-y-4">
                                    <Info icon={<Mail className="h-5 w-5" />} label="Email" value="hello@trovina.io" href="mailto:hello@trovina.io" />
                                    <Info icon={<Phone className="h-5 w-5" />} label="Phone" value="+2349037248511, +917777914539" />
                                    <Info icon={<MapPin className="h-5 w-5" />} label="Location" value="Remote First Teams" />
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </section>

                <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
                <Footer />
            </div>
        </>
    )
}

function Info({ icon, label, value, href }) {
    const content = (
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-brand-500/40">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm text-muted">{label}</p>
                <p className="truncate text-lg font-semibold text-foreground">{value}</p>
            </div>
        </div>
    )
    return href ? (
        <a href={href} className="block">
            {content}
        </a>
    ) : (
        content
    )
}

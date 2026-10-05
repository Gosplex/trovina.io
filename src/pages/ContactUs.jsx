import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectFormModal from '../components/ProjectFormModal'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import CtaBand from '../components/sections/CtaBand'
import { organizationSchema, breadcrumbSchema } from '../lib/schema'
import { services } from '../constants/siteContent'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'
import { PhoneInput } from 'react-international-phone'
import { Container } from '../components/ui/Section'
import { company } from '../constants/company'

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
            toast.error('Your message could not be sent. Please email us or try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Seo
                title="Contact Trovina | Web & App Development Studio"
                description="Tell us about your website, app or automation project. Trovina replies within one working day with next steps and a fixed quote. Call, WhatsApp or email us."
                path="/contact"
                image="/og-contact.jpg"
                jsonLd={[
                    organizationSchema,
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Contact', path: '/contact' },
                    ]),
                ]}
            />

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                <main id="main">
                    <section className="pb-12 pt-28 md:pb-16 md:pt-36">
                        <Container>
                            <h1 className="display-xl max-w-4xl text-balance">Let’s talk about your project.</h1>
                            <p className="lede mt-6 max-w-2xl">
                                Tell us what you want to build. We reply within one working day with questions,
                                next steps and a rough budget. No obligation.
                            </p>
                        </Container>
                    </section>

                    <section className="pb-20 md:pb-28">
                        <Container>
                            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                                {/* FORM */}
                                <div className="lg:col-span-7">
                                    <form className="grid gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-foreground">Name</label>
                                            <input id="c-name" name="name" value={form.name} onChange={updateForm} required autoComplete="name" className="input" placeholder="Your full name" />
                                        </div>

                                        <div>
                                            <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                                            <input id="c-email" name="email" type="email" value={form.email} onChange={updateForm} required autoComplete="email" className="input" placeholder="you@company.com" />
                                        </div>

                                        <div>
                                            <label htmlFor="c-phone" className="mb-2 block text-sm font-medium text-foreground">Phone or WhatsApp</label>
                                            <div className="flex h-[50px] items-center overflow-hidden rounded-xl border border-border bg-background transition-colors focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
                                                <PhoneInput
                                                    defaultCountry={country}
                                                    value={phone}
                                                    onChange={setPhone}
                                                    inputProps={{ id: 'c-phone' }}
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
                                            <label htmlFor="c-service" className="mb-2 block text-sm font-medium text-foreground">What do you need?</label>
                                            <select id="c-service" name="service" value={form.service} onChange={updateForm} required className="input">
                                                <option value="">Choose a service</option>
                                                {services.map((s) => (
                                                    <option key={s.slug}>{s.title}</option>
                                                ))}
                                                <option>More than one service</option>
                                                <option>Not sure yet</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-foreground">About the project</label>
                                            <textarea id="c-message" name="message" value={form.message} onChange={updateForm} rows="6" required className="input resize-y" placeholder="What are you building, who is it for, and when do you need it?" />
                                        </div>

                                        <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <button type="submit" disabled={isSubmitting} className="btn-primary btn-lg">
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-transparent" aria-hidden="true" />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    'Send message'
                                                )}
                                            </button>
                                            <p className="text-sm text-muted">We reply within one working day.</p>
                                        </div>
                                    </form>
                                </div>

                                {/* DETAILS */}
                                <aside className="lg:col-span-4 lg:col-start-9">
                                    <dl className="divide-y divide-border border-y border-border">
                                        <Info label="Email" value={company.email} href={`mailto:${company.email}`} />
                                        <Info label="Phone" value={company.phone} href={company.phoneHref} />
                                        <Info
                                            label="WhatsApp"
                                            value="Chat with us"
                                            href={`https://wa.me/${company.whatsapp}`}
                                            external
                                        />
                                        <Info label="Studio" value={company.addressText} href={company.mapsUrl} external />
                                        <Info label="Hours" value={company.hours} />
                                    </dl>
                                </aside>
                            </div>
                        </Container>
                    </section>

                    {/* MAP */}
                    <section aria-label="Map" className="pb-20 md:pb-28">
                        <Container>
                            <div className="overflow-hidden rounded-3xl border border-border bg-surface-2">
                                <iframe
                                    title={`Map showing ${company.addressText}`}
                                    src={company.mapsEmbed}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="block h-[360px] w-full md:h-[440px] dark:opacity-90 dark:invert-[0.9] dark:hue-rotate-180"
                                />
                            </div>
                        </Container>
                    </section>

                    <CtaBand
                        title="Prefer a quick call?"
                        description="Book a free 30-minute call. We will talk through your idea and tell you honestly what it would take."
                        primaryLabel="Book a call"
                        onPrimary={() => setShowForm(true)}
                    />
                </main>

                <ProjectFormModal open={showForm} onClose={() => setShowForm(false)} />
                <Footer />
            </div>
        </>
    )
}

function Info({ label, value, href, external }) {
    return (
        <div className="py-5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1">
                {href ? (
                    <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group inline-flex items-start gap-1 text-lg font-medium text-foreground hover:text-brand-600 dark:hover:text-brand-400"
                    >
                        {value}
                        {external && <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />}
                    </a>
                ) : (
                    <span className="text-lg font-medium text-foreground">{value}</span>
                )}
            </dd>
        </div>
    )
}

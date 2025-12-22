import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ArrowLeft,
    CheckCircle,
    Star,
    Rocket,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const serviceData = {

    // ===================== AI AUTOMATION - UPDATED ===================== //

    "ai-automation-workflow-systems": {
        slug: "ai-automation-workflow-systems",
        title: "AI Automation And Workflow Systems",
        keyword: "ai automation services nigeria",
        icon: "🤖",
        popular: true,
        heroTitle: "Automate Business Tasks And Scale Faster",
        heroDesc:
            "We design AI systems that remove manual work, increase sales, reduce customer waiting time, and help businesses operate 10x faster across Nigeria. From WhatsApp automation to AI phone receptionists and lead generation engines.",

        stats: [
            { value: "80%", label: "Time Saved" },
            { value: "99.9%", label: "Error Accuracy" },
            { value: "₦350M+", label: "Client Cost Savings" },
            { value: "24/7", label: "Operations Running" },
        ],

        features: [
            "WhatsApp automation workflows",
            "AI receptionist for calls and chat",
            "Lead generation automation",
            "Billing and invoice automation",
            "Customer follow up sequences",
            "Employee task automation",
            "CRM integrations",
        ],

        painPoints: [
            "Time wasted on repetitive tasks?",
            "Slow customer response?",
            "Lost leads and lost revenue?",
            "Manual errors costing money?",
        ],

        benefits: [
            {
                title: "Work Faster",
                desc: "Convert hours of manual work into seconds with automation.",
            },
            {
                title: "AI Driven Support",
                desc: "Instant WhatsApp replies, instant lead follow up, zero delays.",
            },
            {
                title: "More Revenue",
                desc: "Better lead conversion and customer retention through automation.",
            },
        ],

        process: [
            { title: "Business Audit", desc: "We analyze your workflow and identify automation gaps." },
            { title: "AI System Design", desc: "We build custom logic around your business needs." },
            { title: "Launch And Testing", desc: "Your automation tools go live." },
            { title: "Results And Support", desc: "We optimize and upgrade as you grow." },
        ],

        tech: [
            "OpenAI",
            "WhatsApp API",
            "LangChain",
            "Node.js",
            "FastAPI",
            "n8n",
            "Pinecone",
        ],

        testimonial: {
            quote:
                "Response time dropped to under 5 seconds and our customer base grew by 40 percent within 60 days. Game changing.",
            author: "Adeola Ahmed",
            role: "CEO DirectMall Nigeria",
            rating: 5,
        },

        faq: [
            {
                q: "Can this work for Nigerian businesses?",
                a: "Yes. Our automation tools are built specifically for SMEs and enterprise businesses in Nigeria.",
            },
            {
                q: "Can AI replace manual tasks?",
                a: "Yes. Most daily operations like customer service, scheduling, lead generation and admin tasks can be automated.",
            },
        ],
    },

    // ===== other services unchanged below =====

    "mobile-app-development": {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        keyword: "mobile app development services",
        icon: "📱",
        heroTitle: "Build Custom Mobile Apps That Scale",
        heroDesc:
            "Professional mobile app development for iOS and Android using Flutter, React Native, Swift and Kotlin. Built for performance, security and outstanding design.",
        stats: [
            { value: "500K+", label: "App Downloads" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4.9/5", label: "Avg Rating" },
            { value: "50+", label: "Apps Launched" },
        ],
        features: [
            "Cross platform app development",
            "Native iOS and Android development",
            "UI and UX design",
            "Real time sync",
            "Push notifications",
            "Store publishing",
            "Authentication and payments",
        ],
        painPoints: [
            "Slow development?",
            "Poor app performance?",
            "Low retention?",
            "Old app design?",
        ],
        benefits: [
            {
                title: "Fast Performance",
                desc: "Smooth apps for all devices.",
            },
            {
                title: "Security First",
                desc: "Encryption and secure authentication.",
            },
            {
                title: "Scale Ready",
                desc: "Built for thousands of users.",
            },
        ],
        process: [
            { title: "Planning", desc: "We shape the vision." },
            { title: "Design", desc: "We design the app UI." },
            { title: "Development", desc: "We build the product." },
            { title: "Deployment", desc: "We publish the app." },
        ],
        tech: [
            "Flutter",
            "React Native",
            "Swift",
            "Kotlin",
            "Firebase",
            "Node.js",
        ],
        testimonial: {
            quote:
                "Trovina built a beautiful and fast app that helped us scale to thousands of users.",
            author: "Sarah Chen",
            role: "CEO FitTrack",
            rating: 5,
        },
        faq: [
            {
                q: "How long does a mobile app take?",
                a: "Most apps are completed in 6 to 12 weeks depending on features.",
            },
            {
                q: "Do you support iOS and Android?",
                a: "Yes we build native and cross platform apps.",
            },
        ],
    },

    "web-app-website-development": {
        slug: "web-app-website-development",
        title: "Web App And Website Development",
        keyword: "web development services",
        icon: "🌍",
        heroTitle: "High Performance Web Apps And Websites",
        heroDesc:
            "Modern SEO friendly web apps and websites built for stability, speed and growth.",
        stats: [
            { value: "10M+", label: "Monthly Users" },
            { value: "100/100", label: "Lighthouse Score" },
            { value: "<1s", label: "Load Time" },
            { value: "3x", label: "Conversion Boost" },
        ],
        features: [
            "React and Next.js development",
            "Full stack systems",
            "SEO and analytics",
            "Custom dashboards",
            "CMS integration",
            "E commerce",
            "Animations",
        ],
        painPoints: [
            "Slow website?",
            "Low conversion?",
            "Poor SEO?",
            "Outdated UI?",
        ],
        benefits: [
            {
                title: "Fast Loading",
                desc: "No waiting or lag.",
            },
            {
                title: "SEO Growth",
                desc: "Rank higher and gain traffic.",
            },
            {
                title: "Future Ready",
                desc: "Stable and scalable tech.",
            },
        ],
        process: [
            { title: "Research", desc: "Understand users." },
            { title: "Design", desc: "Make it beautiful." },
            { title: "Development", desc: "Make it work." },
            { title: "Launch", desc: "Make it grow." },
        ],
        tech: [
            "Next.js",
            "React",
            "Tailwind",
            "Node.js",
            "PostgreSQL",
            "Firebase",
        ],
        testimonial: {
            quote:
                "Our conversions doubled and our bounce rate dropped drastically.",
            author: "Michael Rodriguez",
            role: "Founder GreenLeaf",
            rating: 5,
        },
        faq: [
            {
                q: "Do you build React or Next.js sites?",
                a: "Yes we specialise in React based platforms.",
            },
            {
                q: "Can you redesign a website?",
                a: "Yes we modernise and optimise performance.",
            },
        ],
    },

    "cloud-infrastructure-devops": {
        slug: "cloud-infrastructure-devops",
        title: "Cloud Infrastructure And DevOps",
        keyword: "cloud devops services",
        icon: "☁️",
        heroTitle: "Cloud Infrastructure Built For Scale",
        heroDesc:
            "Secure scalable cloud infrastructure built for speed, automation and uptime. We use AWS, Azure and GCP.",
        stats: [
            { value: "99.99%", label: "Uptime" },
            { value: "40%", label: "Cost Saved" },
            { value: "<5min", label: "Deploy Time" },
            { value: "24/7", label: "Support" },
        ],
        features: [
            "Multi cloud setup",
            "Kubernetes",
            "CI CD pipelines",
            "Cost optimisation",
            "Security",
            "Monitoring",
            "Zero downtime deployments",
        ],
        painPoints: [
            "High cloud bills?",
            "Slow deployment?",
            "Security risks?",
            "Downtime issues?",
        ],
        benefits: [
            {
                title: "Auto Scaling",
                desc: "Handle any traffic.",
            },
            {
                title: "Security First",
                desc: "Safe data and safe operations.",
            },
            {
                title: "Cost Efficient",
                desc: "Stop paying for unused servers.",
            },
        ],
        process: [
            { title: "Assessment", desc: "We analyze your cloud needs." },
            { title: "Setup", desc: "We build infrastructure." },
            { title: "Migration", desc: "We move assets." },
            { title: "Monitoring", desc: "We support and improve." },
        ],
        tech: [
            "AWS",
            "Azure",
            "GCP",
            "Docker",
            "Kubernetes",
            "Terraform",
        ],
        testimonial: {
            quote:
                "Deployment time went from 30 minutes to under 5 minutes.",
            author: "David Kumar",
            role: "CTO DataFlow",
            rating: 5,
        },
        faq: [
            {
                q: "Can you reduce our cloud cost?",
                a: "Yes we analyse and reduce billing.",
            },
            {
                q: "Do you manage Kubernetes?",
                a: "Yes full orchestration and monitoring.",
            },
        ],
    },

};

// ====================== COMPONENT ====================== //

export default function ServiceDetail() {

    const { slug } = useParams();
    const service = serviceData[slug];

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from;

    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service)
        return (
            <div className="text-center text-white p-24 text-3xl font-bold">
                Service not found
            </div>
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you. We will contact you shortly.");
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Helmet>
                <title>
                    {service.title} | Trovina.io
                </title>
                <meta name="description" content={service.heroDesc} />
                <meta name="keywords" content={service.keyword} />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">

                {/* BACK BUTTON */}
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <button
                        onClick={() => {
                            if (from === "home") navigate("/");
                            else navigate("/services");
                        }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >
                        <ArrowLeft /> {from === "home" ? "Back to Home" : "Back to Services"}
                    </button>
                </div>

                {/* HERO */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                    className="text-center px-6 py-16"
                >
                    {service.popular && (
                        <motion.span
                            variants={fadeUp}
                            className="inline-block mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 text-sm font-bold rounded-full"
                        >
                            ⭐ Most Popular Service
                        </motion.span>
                    )}

                    <motion.div variants={fadeUp} className="text-6xl mb-6">
                        {service.icon}
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto mb-6"
                    >
                        {service.heroTitle}
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        {service.heroDesc}
                    </motion.p>

                    <motion.button
                        variants={fadeUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                        className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-lg"
                    >
                        Start Your Project
                    </motion.button>
                </motion.section>

                {/* STATS */}
                <section className="px-6 py-16 border-t border-gray-800">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {service.stats.map((stat, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 text-center"
                            >
                                <div className="text-3xl font-bold text-purple-400">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* FEATURES */}
                <section className="px-6 py-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        What You Get
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"
                    >
                        {service.features.map((feature, i) => (
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.02 }}
                                key={i}
                                className="p-6 bg-black border border-gray-800 rounded-xl flex gap-4 items-start"
                            >
                                <CheckCircle className="text-green-400 mt-1" />
                                <p>{feature}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* PAIN POINTS */}
                <section className="px-6 py-16 bg-black border-y border-gray-800">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        Solving Real Challenges
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6"
                        viewport={{ once: true }}
                    >
                        {service.painPoints.map((point, i) => (
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                key={i}
                                className="p-5 bg-gray-900 text-center rounded-xl border border-gray-700"
                            >
                                {point}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* BENEFITS */}
                <section className="px-6 py-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        Why Choose This Service
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6"
                    >
                        {service.benefits.map((b, i) => (
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.05 }}
                                key={i}
                                className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800"
                            >
                                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                                <p className="text-gray-400">{b.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* PROCESS */}
                <section className="px-6 py-16 bg-black border-y border-gray-800">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        Our Process
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6"
                    >
                        {service.process.map((p, i) => (
                            <motion.div
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                key={i}
                                className="p-6 border border-gray-800 rounded-xl bg-gray-900"
                            >
                                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                                <p className="text-gray-400">{p.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* TESTIMONIAL */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="px-6 py-16"
                >
                    <div className="max-w-4xl mx-auto text-center bg-black border border-gray-800 p-12 rounded-xl">
                        <div className="flex justify-center gap-1 mb-4">
                            {[...Array(service.testimonial.rating)].map((_, i) => (
                                <Star key={i} className="text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-xl text-gray-300 mb-6">
                            “{service.testimonial.quote}”
                        </p>
                        <div className="text-gray-400">
                            {service.testimonial.author} • {service.testimonial.role}
                        </div>
                    </div>
                </motion.section>

                {/* TECH */}
                <section className="px-6 py-16 bg-black border-y border-gray-800">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        Tech We Use
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4"
                    >
                        {service.tech.map((t, i) => (
                            <motion.span
                                whileHover={{ scale: 1.1 }}
                                variants={fadeUp}
                                key={i}
                                className="px-6 py-3 text-lg border border-gray-700 rounded-xl"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                </section>

                {/* FAQ */}
                <section className="px-6 py-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-10"
                    >
                        FAQ
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{
                            show: { transition: { staggerChildren: 0.15 } },
                        }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        {service.faq.map((faq, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-6 bg-black border border-gray-800 rounded-xl"
                            >
                                <h3 className="font-bold text-xl mb-2">{faq.q}</h3>
                                <p className="text-gray-400">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* CTA FORM */}
                <section
                    ref={formRef}
                    className="px-6 py-20 border-t border-gray-800 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{
                            show: { transition: { staggerChildren: 0.2 } },
                        }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto text-center"
                    >
                        <motion.div variants={fadeUp}>
                            <Rocket className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl md:text-5xl font-bold mb-6"
                        >
                            Ready To Start?
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
                        >
                            Enter your details below and we will get back to you within 2 hours.
                        </motion.p>

                        <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-black/50 border border-gray-800 p-8 rounded-xl"
                            >
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full p-4 bg-black border border-gray-700 rounded-lg"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full p-4 bg-black border border-gray-700 rounded-lg"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="w-full p-4 bg-black border border-gray-700 rounded-lg"
                                    required
                                />
                                <textarea
                                    placeholder="Tell us about your project"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    rows="4"
                                    className="w-full p-4 bg-black border border-gray-700 rounded-lg"
                                    required
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full p-4 bg-white text-black font-bold rounded-lg"
                                >
                                    Get Free Consultation
                                </motion.button>
                            </form>

                            <p className="text-gray-400 text-sm mt-6">
                                Fast response time under 2 hours
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                <section className="px-6 py-16 text-center text-gray-500 text-sm">
                    © 2025 Trovina.io All Rights Reserved
                </section>
            </div>
        </>
    );
}

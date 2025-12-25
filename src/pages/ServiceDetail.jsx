import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProjectFormModal from '../components/ProjectFormModal'
import Footer from '../components/Footer'
import {
    ArrowLeft,
    CheckCircle,
    Star,
    Rocket,
    Zap,
    Target,
    TrendingUp,
    Shield,
    Users,
    Clock,
    Award,
    ChevronDown,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const serviceData = {
    "ai-automation-workflow-systems": {
        slug: "ai-automation-workflow-systems",
        title: "AI Automation And Workflow Systems",
        keyword: "ai automation services nigeria, business workflow automation nigeria, whatsapp business automation nigeria",
        icon: "🤖",
        popular: true,
        heroTitle: "Automate Business Tasks And Scale Faster",
        heroDesc:
            "We design intelligent AI automation systems that remove manual work, increase sales, reduce customer waiting time, and help businesses operate up to 10x faster across Nigeria. Our automation tools replace repetitive tasks, eliminate manual errors, and improve customer experience using WhatsApp automation, AI voice receptionists, workflow dashboards, lead generation engines, and predictive optimization.",
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",

        stats: [
            { value: "80%", label: "Time Saved" },
            { value: "99.9%", label: "Error Accuracy" },
            { value: "₦350M+", label: "Client Cost Savings" },
            { value: "24/7", label: "Operations Running" },
        ],

        features: [
            {
                title: "WhatsApp Automation",
                desc: "Automated workflows for customer messaging, tracking, order processing, updates, and support without human supervision.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "AI Receptionist",
                desc: "Smart automated call and chat handling 24/7 that answers questions, books appointments, and collects customer data.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Lead Generation",
                desc: "Automated lead capture tools that qualify users, store information, and trigger instant follow-ups to increase conversions.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "Billing Automation",
                desc: "Streamlined invoice and payment processing systems that remove financial bottlenecks and prevent revenue loss.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Follow-up Sequences",
                desc: "Automated reminders, engagement messages, and retention workflows that increase long-term customer loyalty.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "Task Automation",
                desc: "Employee workflow optimization and management systems that reduce workload and improve team efficiency.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "CRM Integration",
                desc: "Seamless connection between automation tools and your existing CRM, ERP, POS, or accounting systems.",
                icon: <Shield className="w-6 h-6" />,
            },
            {
                title: "Custom Workflows",
                desc: "Complete end-to-end automation tailored to your business model and operational structure.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Too much time wasted on manual repetitive tasks?",
            "Slow and inconsistent customer response hurting sales?",
            "Leads falling through the cracks and resulting in lost revenue?",
            "Manual human errors costing time, money, and reputation?",
        ],

        benefits: [
            {
                title: "Work Faster",
                desc: "Convert hours of manual work into seconds with automated AI-driven workflows that execute instantly without human intervention.",
            },
            {
                title: "AI Driven Support",
                desc: "Instant WhatsApp replies, automated follow up, real-time task execution, and zero communication delays.",
            },
            {
                title: "More Revenue",
                desc: "Higher lead conversion rates, faster response time, and enhanced customer retention driven by automation intelligence.",
            },
        ],

        process: [
            {
                step: "1",
                title: "Business Audit",
                desc: "We analyze your workflow and identify automation gaps, inefficiencies, and lost revenue opportunities.",
            },
            {
                step: "2",
                title: "AI System Design",
                desc: "We build custom automation logic around your needs using smart routing, conditional triggers, and AI decision layers.",
            },
            {
                step: "3",
                title: "Launch And Testing",
                desc: "We deploy automation workflows, run live tests, and refine system performance for accuracy and reliability.",
            },
            {
                step: "4",
                title: "Results And Support",
                desc: "We monitor performance, optimize results, and scale your automation as your business grows.",
            },
        ],

        tech: [
            "OpenAI",
            "WhatsApp API",
            "LangChain",
            "Node.js",
            "FastAPI",
            "n8n",
            "Pinecone",
            "Make",
            "Zapier"
        ],

        testimonial: {
            quote:
                "Response time dropped to under 5 seconds and our customer base grew by more than 40% within 60 days. The automation system eliminated manual handling errors and increased our daily sales conversions. It completely changed the way we operate.",
            author: "Adeola Ahmed",
            role: "CEO DirectMall Nigeria",
            rating: 5,
        },

        faq: [
            {
                q: "Can this work for Nigerian businesses?",
                a: "Yes. All automation systems are optimized for Nigerian SMEs and enterprise operations. They support WhatsApp, mobile, local payment processors, CRM platforms, and multiple workflow environments.",
            },
            {
                q: "Can AI replace manual tasks?",
                a: "Absolutely. Customer service, sales follow-ups, order tracking, lead management, appointment scheduling, and administrative tasks can all be automated.",
            },
            {
                q: "How long does implementation take?",
                a: "Most systems are deployed within 2-4 weeks depending on workflow complexity and integration layers.",
            },
            {
                q: "What kind of support do you provide?",
                a: "We offer 24/7 support, performance monitoring, optimization, and long-term system expansion as business needs grow.",
            },
            {
                q: "Is training provided for my team?",
                a: "Yes. We provide complete onboarding, documentation, training, and support materials for your team.",
            },
            {
                q: "Can you integrate with existing tools?",
                a: "Yes. We integrate with CRMs, ERPs, billing systems, dashboards, messaging platforms, and business applications.",
            },
        ],
    },


    // 🚀 MOBILE APP
    "mobile-app-development": {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        keyword: "mobile app development services nigeria, ios developers nigeria, android developers nigeria",
        icon: "📱",
        heroTitle: "Build Custom Mobile Apps That Scale",
        heroDesc:
            "We build powerful, secure, and scalable mobile apps for iOS and Android using technologies like Flutter, React Native, Swift, and Kotlin. Our apps are designed for performance, user retention, and world-class UI/UX — helping businesses grow their customer base and generate more revenue across Nigeria and beyond.",
        heroImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        stats: [
            { value: "500K+", label: "App Downloads" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4.9/5", label: "Avg Rating" },
            { value: "50+", label: "Apps Launched" },
        ],

        features: [
            {
                title: "Cross Platform",
                desc: "Write once, deploy everywhere — fast and cost-effective cross-platform development for iOS and Android.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Native Development",
                desc: "Performance-driven native iOS and Android systems tailored to high-growth demands.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "UI/UX Design",
                desc: "User-centric design systems that deliver beautiful interfaces, intuitive flow, and high retention.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Real-time Sync",
                desc: "Live data communication with modern APIs and cloud systems.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Push Notifications",
                desc: "Engage users instantly with alerts, marketing campaigns, reminders, and updates.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Store Publishing",
                desc: "We handle Apple App Store and Google Play Store submission, compliance, and publishing.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Authentication",
                desc: "Secure login systems with biometrics, 2FA, social auth, and enterprise-grade encryption.",
                icon: <Shield className="w-6 h-6" />,
            },
            {
                title: "Payment Integration",
                desc: "Seamless payment flows for subscriptions, one-time purchases, and digital goods.",
                icon: <Clock className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Slow development?",
            "Poor app performance?",
            "Low retention?",
            "Outdated design?",
        ],

        benefits: [
            {
                title: "Fast Performance",
                desc: "Apps optimized for speed, smooth animations, and low resource usage.",
            },
            {
                title: "Security First",
                desc: "Enterprise security with encrypted data handling and secure architecture.",
            },
            {
                title: "Scale Ready",
                desc: "Built for thousands of active users and high data flow.",
            },
        ],

        process: [
            { step: "1", title: "Planning", desc: "We understand needs, requirements, and user goals." },
            { step: "2", title: "Design", desc: "We create UI/UX visuals for structure and flow." },
            { step: "3", title: "Development", desc: "We build fast, stable, scalable applications." },
            { step: "4", title: "Deployment", desc: "We launch apps in the App Store and Play Store." },
        ],

        tech: [
            "Flutter",
            "React Native",
            "Swift",
            "Kotlin",
            "Firebase",
            "Node.js",
            "Supabase"
        ],

        testimonial: {
            quote:
                "Trovina built a beautiful and high-performance app that helped us scale to thousands of users. The process was smooth, the team was on time, and the results exceeded expectations.",
            author: "Sarah Chen",
            role: "CEO FitTrack",
            rating: 5,
        },

        faq: [
            {
                q: "How long does a mobile app take?",
                a: "Most apps are completed in 6 to 12 weeks depending on features, integrations, and design complexity.",
            },
            {
                q: "Do you support iOS and Android?",
                a: "Yes. We build both native and cross-platform systems with full device compatibility.",
            },
            {
                q: "What is the cost range?",
                a: "Pricing varies based on feature scope, API needs, and interface requirements. Contact us for an accurate quote.",
            },
            {
                q: "Do you provide app maintenance?",
                a: "Yes. We offer monthly, quarterly, and yearly support and update packages.",
            },
            {
                q: "Can you redesign an existing app?",
                a: "Yes. We modernize and enhance app UI, UX, performance, and backend logic.",
            },
            {
                q: "Do you handle app store submissions?",
                a: "Yes. Entire publishing and compliance process is handled by our team.",
            },
        ],
    },


    // 🌍 WEB DEVELOPMENT
    "web-app-website-development": {
        slug: "web-app-website-development",
        title: "Web App And Website Development",
        keyword: "web development services nigeria, website development nigeria, custom web app nigeria",
        icon: "🌍",
        heroTitle: "High Performance Web Apps And Websites",
        heroDesc:
            "We build fast, SEO-optimized, mobile-responsive web applications and websites that deliver stability, performance, security, and business growth. Our platforms increase conversions, improve user experience, boost search rankings, and support long-term scalability for businesses in Nigeria and globally.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",

        stats: [
            { value: "10M+", label: "Monthly Users" },
            { value: "100/100", label: "Lighthouse Score" },
            { value: "<1s", label: "Load Time" },
            { value: "3x", label: "Conversion Boost" },
        ],

        features: [
            {
                title: "React & Next.js",
                desc: "Modern framework development that delivers unmatched performance and scalability.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Full Stack",
                desc: "Complete backend and frontend systems designed for complexity and growth.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "SEO & Analytics",
                desc: "Optimized for Google search visibility, rankings, insights, and traffic tracking.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Custom Dashboards",
                desc: "Admin dashboards and user interfaces built for robust data control.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "CMS Integration",
                desc: "Easy content management with no technical skills needed.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "E-commerce",
                desc: "Full store systems for payment, shipping, inventory, and product management.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Animations",
                desc: "Smooth and dynamic motion effects that enhance user experience.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "API Development",
                desc: "Secure, scalable backend services and integrations for complex systems.",
                icon: <Shield className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Slow website speed hurting ranking?",
            "Low conversion and poor engagement?",
            "Weak SEO visibility?",
            "Outdated UI losing trust?",
        ],

        benefits: [
            {
                title: "Fast Loading",
                desc: "Ultra-fast page experience with optimized caching, rendering, and delivery.",
            },
            {
                title: "SEO Growth",
                desc: "Built to rank higher, gain search visibility, and drive organic traffic.",
            },
            {
                title: "Future Ready",
                desc: "Stable web architecture engineered for long-term scaling and updates.",
            },
        ],

        process: [
            { step: "1", title: "Research", desc: "We analyze goals, users, competitors, and structure." },
            { step: "2", title: "Design", desc: "We build visual layouts for clarity and aesthetic impact." },
            { step: "3", title: "Development", desc: "We write clean, fast, scalable code for deployment." },
            { step: "4", title: "Launch", desc: "We deploy, optimize, monitor, and improve performance." },
        ],

        tech: [
            "Next.js",
            "React",
            "Vite",
            "PHP Laravel",
            "Tailwind",
            "Node.js",
            "PostgreSQL",
            "Firebase",
        ],

        testimonial: {
            quote:
                "Our conversions doubled, bounce rate dropped drastically, and page load time improved immediately. The site architecture was clean, fast, and SEO ready — exactly what we needed to scale.",
            author: "Michael Rodriguez",
            role: "Founder GreenLeaf",
            rating: 5,
        },

        faq: [
            {
                q: "Do you build React or Next.js sites?",
                a: "Yes. We specialize in React and Next.js platforms because they deliver the best speed, SEO performance, scalability, and security.",
            },
            {
                q: "Can you redesign a website?",
                a: "Yes. We modernize UI/UX, improve speed, enhance SEO, restructure content, and rebuild backend logic.",
            },
            {
                q: "How long does web development take?",
                a: "Most projects take 4–8 weeks depending on content, integrations, features, and backend requirements.",
            },
            {
                q: "Do you provide hosting?",
                a: "Yes. We offer cloud hosting with automated security, backups, performance tracking, and uptime monitoring.",
            },
            {
                q: "Is SEO included?",
                a: "Yes. Every site includes structure optimization, metadata, indexing setup, sitemap configuration, and performance tuning.",
            },
            {
                q: "Can you migrate my existing site?",
                a: "Yes. We migrate all content and data safely, with zero downtime or structure disruption.",
            },
        ],
    },


    // ☁️ CLOUD DEVOPS
    "cloud-infrastructure-devops": {
        slug: "cloud-infrastructure-devops",
        title: "Cloud Infrastructure And DevOps",
        keyword: "cloud infrastructure services nigeria, devops nigeria, cloud migration nigeria",
        icon: "☁️",
        heroTitle: "Cloud Infrastructure Built For Scale",
        heroDesc:
            "We build secure, automated, cloud-based infrastructure designed for uptime, speed, cost efficiency, and continuous deployment. We work with AWS, Azure, and Google Cloud to support companies that want to scale applications reliably while reducing operational overhead.",
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",

        stats: [
            { value: "99.99%", label: "Uptime" },
            { value: "40%", label: "Cost Saved" },
            { value: "<5min", label: "Deploy Time" },
            { value: "24/7", label: "Support" },
        ],

        features: [
            {
                title: "Multi-Cloud Setup",
                desc: "Infrastructure design across AWS, Azure, and Google Cloud for performance and redundancy.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Kubernetes",
                desc: "Container orchestration, scaling, load balancing, and automated deployments.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "CI/CD Pipelines",
                desc: "Automated deployment pipelines that reduce downtime and accelerate development cycles.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Cost Optimization",
                desc: "Smart cost reduction strategies that lower cloud spending without affecting performance.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Security",
                desc: "Enterprise-grade data and network security reinforced with access control and compliance tools.",
                icon: <Shield className="w-6 h-6" />,
            },
            {
                title: "Monitoring",
                desc: "24/7 observability, logging, and metrics dashboards for real-time infrastructure health.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Zero Downtime",
                desc: "Blue-green deployment strategies to deploy updates without interruption.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Disaster Recovery",
                desc: "Backup systems, failover environments, and rapid data recovery solutions.",
                icon: <Clock className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Cloud cost too high?",
            "Slow deployment pipelines?",
            "Security vulnerabilities?",
            "Downtime affecting business?",
        ],

        benefits: [
            {
                title: "Auto Scaling",
                desc: "Systems handle traffic spikes automatically without risk of failure.",
            },
            {
                title: "Security First",
                desc: "Data, servers, and networking protected by industry-standard security.",
            },
            {
                title: "Cost Efficient",
                desc: "Only pay for resources needed — no wasted infrastructure spending.",
            },
        ],

        process: [
            { step: "1", title: "Assessment", desc: "We evaluate system requirements, security, and infrastructure goals." },
            { step: "2", title: "Setup", desc: "We build or migrate infrastructure to cloud platforms." },
            { step: "3", title: "Migration", desc: "We safely move assets, data, workloads, and environments." },
            { step: "4", title: "Monitoring", desc: "We maintain and optimize performance, cost, and security." },
        ],

        tech: [
            "AWS",
            "Azure",
            "GCP",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Jenkins"
        ],

        testimonial: {
            quote:
                "Deployment time went from 30 minutes to under 5 minutes. Infrastructure became fully automated and downtime issues disappeared. Support has been excellent.",
            author: "David Kumar",
            role: "CTO DataFlow",
            rating: 5,
        },

        faq: [
            {
                q: "Can you reduce cloud cost?",
                a: "Yes. We analyze billing activity, resource allocation, and architecture to significantly reduce cloud expenses.",
            },
            {
                q: "Do you manage Kubernetes?",
                a: "Yes. We provide full container management, monitoring, scaling, automation, and troubleshooting.",
            },
            {
                q: "What clouds do you support?",
                a: "We support AWS, Azure, Google Cloud, and DigitalOcean for infrastructure setup and scaling.",
            },
            {
                q: "How quickly can you migrate?",
                a: "Most migrations take 2-4 weeks with zero downtime and no data disruption.",
            },
            {
                q: "Do you provide 24/7 support?",
                a: "Yes. We offer continuous support, monitoring, and rapid response issue handling.",
            },
            {
                q: "Can you audit our current setup?",
                a: "Yes. We provide full cloud audits, security checks, performance evaluations, and improvement plans.",
            },
        ],
    },
};


function AccordionItem({ question, answer, isOpen, onClick }) {
    return (
        <motion.div
            initial={false}
            className="bg-black border border-gray-800 rounded-xl overflow-hidden"
        >
            <button
                onClick={onClick}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-900 transition-colors"
            >
                <h3 className="font-bold text-xl pr-4">{question}</h3>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 text-gray-400">
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
}


export default function ServiceDetail() {
    const { slug } = useParams();
    const service = serviceData[slug];

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from;

    const [showForm, setShowForm] = useState(false)


    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [hoveredProcess, setHoveredProcess] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service)
        return (
            <div className="text-center text-white p-24 text-3xl font-bold">
                Service not found
            </div>
        );


    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Helmet>
                <title>{service.title} | Trovina.io</title>
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
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft /> {from === "home" ? "Back to Home" : "Back to Services"}
                    </button>
                </div>

                {/* HERO */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                    className="px-6 py-12"
                >
                    <div className="max-w-7xl mx-auto text-center">

                        {service.popular && (
                            <motion.span
                                variants={fadeUp}
                                className="inline-block mb-4 bg-white text-black px-4 py-2 text-sm font-bold rounded-full"
                            >
                                Most Popular Service
                            </motion.span>
                        )}

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            {service.heroTitle}
                        </motion.h1>
                    </div>
                </motion.section>

                {/* IMAGE + TEXT */}
                <section className="px-6 py-12">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-2xl"
                        >
                            <img
                                src={service.heroImage}
                                alt={service.title}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                                {service.heroDesc}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowForm(true)}
                                className="px-8 py-4 bg-white text-black font-semibold rounded-lg transition-transform"
                            >
                                Start Your Project
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* STATS */}
                <section className="px-6 py-16 border-t border-gray-800">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {service.stats.map((stat, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-6 bg-gradient-to-br from-gray-900 to-[#0f0f0f] rounded-xl border border-gray-800 text-center transition-transform hover:scale-105"
                            >
                                <div className="text-3xl font-bold text-white">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* WHAT YOU GET */}
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
                        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {service.features.map((feature, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-6 bg-gradient-to-br from-gray-900 to-[#0f0f0f] border border-gray-800 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-white hover:shadow-lg hover:shadow-white/20"
                            >
                                <div className="text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* SOLVING REAL CHALLENGES */}
                <section className="px-6 py-16 bg-gradient-to-b from-[#0f0f0f] to-black border-y border-gray-800">
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
                        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                        viewport={{ once: true }}
                    >
                        {service.painPoints.map((point, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-6 bg-gradient-to-br from-gray-900 to-black text-center rounded-xl border border-gray-800 transition-all duration-300 ease-in-out hover:scale-105 hover:border-white"
                            >
                                <p className="font-semibold text-white">{point}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* WHY CHOOSE */}
                <section className="px-6 py-16 bg-gradient-to-b from-black to-[#0f0f0f]">
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
                        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
                    >
                        {service.benefits.map((b, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 transition-all duration-300 ease-in-out hover:scale-105 hover:border-white hover:shadow-xl hover:shadow-white/20"
                            >
                                <h3 className="text-2xl font-bold mb-3">{b.title}</h3>
                                <p className="text-gray-300">{b.desc}</p>
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
                        className="text-4xl font-bold text-center mb-16"
                    >
                        Our Process
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">

                            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-white/20" style={{ top: '64px' }} />

                            {service.process.map((p, i) => (
                                <motion.div
                                    variants={fadeUp}
                                    key={i}
                                    onMouseEnter={() => setHoveredProcess(i)}
                                    onMouseLeave={() => setHoveredProcess(null)}
                                    className="relative"
                                >
                                    <div className="relative z-10">
                                        <div className="flex flex-col items-center mb-4">

                                            <motion.div
                                                animate={{
                                                    scale: hoveredProcess === i ? 1.2 : 1,
                                                }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-white text-white"
                                            >
                                                {p.step}
                                            </motion.div>

                                            <h3 className="text-xl font-bold text-center">{p.title}</h3>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: hoveredProcess === i ? 1 : 0,
                                                height: hoveredProcess === i ? "auto" : 0,
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                                                <p className="text-gray-300 text-center">{p.desc}</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
                                <Star key={i} className="text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <p className="text-xl text-gray-300 mb-6">
                            "{service.testimonial.quote}"
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
                                className="px-6 py-3 text-lg border border-gray-700 rounded-xl transition-all hover:border-white hover:shadow-lg hover:shadow-white/20"
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
                            show: { transition: { staggerChildren: 0.1 } },
                        }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-4"
                    >
                        {service.faq.map((faq, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <AccordionItem
                                    question={faq.q}
                                    answer={faq.a}
                                    isOpen={openFaqIndex === i}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />

                {/* LAST CTA */}

                <section className="px-6 py-24 bg-gradient-to-br from-black via-[#0f0f0f] to-black border-t border-gray-800">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Ready to Build or Automate Your Business?
                        </h2>

                        <p className="text-xl text-gray-300 mb-10">
                            Get a free strategy session and see how our experts can help you increase
                            efficiency, scale faster, and grow revenue using modern technology.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowForm(true)}
                            className="px-12 py-5 bg-white text-black font-bold rounded-xl text-lg shadow-xl"
                        >
                            Book a Free Strategy Session
                        </motion.button>

                        <p className="text-gray-400 text-sm mt-6">
                            No obligation • Response within 2 hours • Trusted by 50+ businesses
                        </p>
                    </motion.div>
                </section>


                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

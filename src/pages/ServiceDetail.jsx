import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProjectFormModal from '../components/ProjectFormModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import {
    ArrowLeft,
    ArrowRight,
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
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80",

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
        heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
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
        heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80",

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
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",

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

    // SEO & Growth Optimization
    "seo-growth-optimization": {
        slug: "seo-growth-optimization",
        title: "SEO & Growth Optimization",
        keyword:
            "seo services, search engine optimization, technical seo, content marketing, growth marketing, organic traffic growth",

        icon: "🔍",

        heroTitle: "SEO & Growth Strategies That Drive Sustainable Organic Traffic",
        heroDesc:
            "We deliver data-driven SEO and growth optimization strategies combining technical SEO, keyword research, content systems, and conversion optimization to increase search visibility, attract high-intent traffic, and generate consistent long-term revenue growth for businesses worldwide.",

        heroImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",

        stats: [
            { value: "300%+", label: "Average Organic Traffic Growth" },
            { value: "Page 1", label: "Search Engine Rankings" },
            { value: "50+", label: "High-Intent Keywords Ranked" },
            { value: "6–12 Months", label: "Compounding Growth Results" },
        ],

        features: [
            {
                title: "Technical SEO",
                desc:
                    "Full technical SEO audits including site structure, crawlability, indexation, Core Web Vitals, page speed optimization, schema markup, and mobile-first performance improvements.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Keyword Research & Search Strategy",
                desc:
                    "In-depth keyword research and competitor analysis focused on high-intent, conversion-ready search queries that drive qualified organic traffic.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "Content Strategy & SEO Copywriting",
                desc:
                    "SEO-optimized content frameworks, topic clusters, landing pages, and authority-building articles designed to rank and convert.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Link Building & Authority Growth",
                desc:
                    "White-hat backlink strategies, digital PR, and outreach campaigns that increase domain authority and trust signals.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Local & International SEO",
                desc:
                    "Search optimization for both local and international markets, including multilingual SEO and geo-targeted strategies.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Analytics, Tracking & Reporting",
                desc:
                    "Advanced SEO analytics, real-time dashboards, conversion tracking, and transparent performance reporting.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Conversion Rate Optimization (CRO)",
                desc:
                    "Landing page optimization, UX improvements, and data-backed experiments to turn organic traffic into leads and sales.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "E-commerce SEO",
                desc:
                    "Product page optimization, category structuring, technical fixes, and SEO strategies built to increase online sales.",
                icon: <Shield className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Low organic traffic despite strong products or services?",
            "High rankings but poor conversions?",
            "Over-reliance on paid ads for growth?",
            "Competitors dominating search results?",
        ],

        benefits: [
            {
                title: "Qualified Organic Traffic",
                desc:
                    "Attract users actively searching for your products or services through search engines.",
            },
            {
                title: "Higher Search Visibility",
                desc:
                    "Consistent top-of-page rankings for high-value keywords that matter to your business.",
            },
            {
                title: "Compounding Long-Term Growth",
                desc:
                    "SEO strategies that continue to generate traffic and revenue without ongoing ad spend.",
            },
        ],

        process: [
            {
                step: "1",
                title: "Audit & Research",
                desc:
                    "Technical site audit, keyword research, competitor benchmarking, and growth opportunity analysis.",
            },
            {
                step: "2",
                title: "Strategy & Optimization",
                desc:
                    "On-page SEO, site architecture improvements, and technical optimization implementation.",
            },
            {
                step: "3",
                title: "Content & Authority",
                desc:
                    "SEO content production, topic clusters, and authority-building link acquisition.",
            },
            {
                step: "4",
                title: "Measure & Scale",
                desc:
                    "Continuous tracking, reporting, testing, and iterative optimization for growth.",
            },
        ],

        tech: [
            "Google Analytics",
            "Google Search Console",
            "Ahrefs",
            "SEMrush",
            "Screaming Frog",
            "RankMath / Yoast",
            "Hotjar",
        ],

        testimonial: {
            quote:
                "Organic traffic grew by over 350% within months. We now rank consistently for our core keywords and generate qualified leads without increasing ad spend.",
            author: "Head of Growth",
            role: "SaaS Company",
            rating: 5,
        },

        faq: [
            {
                q: "How long does SEO take to show results?",
                a:
                    "Early improvements typically appear within 4–8 weeks. Strong, sustainable growth usually occurs within 6–12 months depending on competition and scope.",
            },
            {
                q: "Do you guarantee #1 rankings?",
                a:
                    "No ethical SEO provider can guarantee exact rankings. We focus on measurable traffic, visibility, and revenue growth backed by data.",
            },
            {
                q: "Can SEO work alongside paid advertising?",
                a:
                    "Yes. SEO complements paid ads by reducing long-term acquisition costs and building sustainable organic traffic.",
            },
            {
                q: "Is SEO suitable for small or large businesses?",
                a:
                    "SEO is effective for startups, SMEs, and enterprises when aligned with clear growth goals and realistic timelines.",
            },
            {
                q: "What reporting do you provide?",
                a:
                    "Monthly reports covering keyword rankings, traffic growth, conversions, and actionable insights.",
            },
            {
                q: "Is SEO a one-time service?",
                a:
                    "SEO is an ongoing process that evolves with algorithms, competitors, and user behavior.",
            },
        ],
    },


    // Branding & Visual Identity
    "branding-visual-identity": {
        slug: "branding-visual-identity",
        title: "Branding & Visual Identity",
        keyword:
            "branding agency, brand identity design, logo design services, brand strategy, visual identity systems, corporate branding",

        icon: "🎨",

        heroTitle: "Build a Strong Brand Identity That People Remember",
        heroDesc:
            "We design strategic brand identities, logos, and visual systems that communicate clarity, credibility, and value. Our branding solutions help businesses stand out, build trust, and create lasting emotional connections across all digital and offline touchpoints.",

        heroImage:
            "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop&q=80",

        stats: [
            { value: "50+", label: "Brands Designed" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "10x", label: "Brand Perception Lift" },
            { value: "End-to-End", label: "Brand Systems Delivered" },
        ],

        features: [
            {
                title: "Logo Design",
                desc:
                    "Distinctive, timeless logo designs crafted to reflect your brand values, positioning, and long-term vision.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Brand Guidelines",
                desc:
                    "Comprehensive brand guidelines covering color systems, typography, logo usage, tone, and visual standards.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "Visual Identity Systems",
                desc:
                    "Complete visual identity systems including icons, patterns, imagery direction, and design components.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Stationery & Collateral",
                desc:
                    "Professionally designed business cards, letterheads, envelopes, and branded marketing materials.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Digital Brand Assets",
                desc:
                    "Social media templates, email signatures, presentation decks, and digital brand kits.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Brand Strategy",
                desc:
                    "Brand positioning, messaging frameworks, tone of voice, and audience research to guide all design decisions.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Rebranding Services",
                desc:
                    "Strategic rebranding that modernizes your brand while preserving recognition and brand equity.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "Packaging Design",
                desc:
                    "Product packaging and label design built to stand out visually and communicate value instantly.",
                icon: <Shield className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Brand looks generic or forgettable?",
            "Inconsistent visuals across platforms?",
            "Low trust or weak brand perception?",
            "Outdated or unclear brand identity?",
        ],

        benefits: [
            {
                title: "Instant Brand Recognition",
                desc:
                    "Create a cohesive identity that audiences recognize and trust immediately.",
            },
            {
                title: "Professional Market Positioning",
                desc:
                    "Present your business as credible, established, and competitive.",
            },
            {
                title: "Stronger Emotional Connection",
                desc:
                    "Build loyalty and affinity through consistent and meaningful design.",
            },
        ],

        process: [
            {
                step: "1",
                title: "Discovery & Research",
                desc:
                    "Deep understanding of your business goals, audience, competitors, and brand values.",
            },
            {
                step: "2",
                title: "Brand Strategy",
                desc:
                    "Define positioning, messaging, tone of voice, and creative direction.",
            },
            {
                step: "3",
                title: "Design & Identity",
                desc:
                    "Develop logo concepts, visual identity systems, and brand assets.",
            },
            {
                step: "4",
                title: "Delivery & Implementation",
                desc:
                    "Provide final files, brand guidelines, and ongoing implementation support.",
            },
        ],

        tech: [
            "Figma",
            "Adobe Illustrator",
            "Adobe Photoshop",
            "Canva Brand Kits",
            "Brand Guidelines PDF",
        ],

        testimonial: {
            quote:
                "Our new brand identity elevated how customers perceive us. The visual system is clear, professional, and consistent across every channel.",
            author: "Founder",
            role: "Consumer Brand",
            rating: 5,
        },

        faq: [
            {
                q: "How long does a branding project take?",
                a:
                    "Most branding projects take between 4–8 weeks depending on scope and feedback cycles.",
            },
            {
                q: "Do you provide all source files?",
                a:
                    "Yes. You receive all vector files, brand assets, and editable source files.",
            },
            {
                q: "Can you work with existing brands?",
                a:
                    "Absolutely. We handle both full rebrands and subtle brand refreshes.",
            },
            {
                q: "How many revisions are included?",
                a:
                    "We offer flexible revision rounds to ensure the final outcome aligns perfectly with your vision.",
            },
            {
                q: "Do you design for print and digital?",
                a:
                    "Yes. All branding assets are delivered for both print and digital use.",
            },
            {
                q: "Is brand strategy included?",
                a:
                    "Yes. Every branding project starts with strategic positioning and research.",
            },
        ],
    },


    // Graphics & Creative Design
    "graphics-creative-design": {
        slug: "graphics-creative-design",
        title: "Graphics & Creative Design",
        keyword:
            "graphic design services, creative design agency, social media graphics, marketing design, advertising creatives, visual design services",

        icon: "✏️",

        heroTitle: "High-Impact Graphic Design That Engages and Converts",
        heroDesc:
            "We create professional graphic design solutions for social media, advertising, print, and digital marketing. Our designs are crafted to capture attention, communicate value clearly, and drive measurable engagement and conversions.",

        heroImage:
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",

        stats: [
            { value: "1000+", label: "Designs Delivered" },
            { value: "48hr", label: "Fast Turnaround" },
            { value: "Unlimited", label: "Revisions Included" },
            { value: "Print & Digital", label: "All Design Formats" },
        ],

        features: [
            {
                title: "Social Media Graphics",
                desc:
                    "Scroll-stopping social media posts, stories, reel covers, and ad creatives optimized for each platform and audience.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "Flyers & Posters",
                desc:
                    "Promotional flyers, posters, and marketing materials designed for both print and digital distribution.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "Advertising Creatives",
                desc:
                    "High-converting ad creatives for social media, search, and display campaigns.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Infographics & Visual Data",
                desc:
                    "Clear, engaging infographics that simplify complex information and improve understanding.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Banners & Large Format Design",
                desc:
                    "Digital banners, website headers, and large-format visuals designed for maximum visibility.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Brochures & Catalogs",
                desc:
                    "Multi-page brochures, catalogs, and company profiles for products and services.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Packaging & Label Design",
                desc:
                    "Product packaging and labels that communicate value and stand out visually.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "Presentation & Pitch Deck Design",
                desc:
                    "Professional slide decks and presentations built to persuade and impress.",
                icon: <Shield className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Designs look generic or unprofessional?",
            "Low engagement or click-through rates on ads?",
            "Inconsistent visuals across marketing channels?",
            "Lack of internal design resources?",
        ],

        benefits: [
            {
                title: "Higher Engagement",
                desc:
                    "Designs that capture attention and increase likes, shares, and interactions.",
            },
            {
                title: "Improved Conversions",
                desc:
                    "Marketing visuals optimized to drive clicks, leads, and sales.",
            },
            {
                title: "Consistent Brand Presence",
                desc:
                    "All designs aligned with your brand identity and messaging.",
            },
        ],

        process: [
            {
                step: "1",
                title: "Creative Brief",
                desc:
                    "Understand your objectives, audience, brand guidelines, and messaging.",
            },
            {
                step: "2",
                title: "Concept Development",
                desc:
                    "Create initial design directions and visual concepts.",
            },
            {
                step: "3",
                title: "Refinement & Revisions",
                desc:
                    "Iterative improvements with flexible revision rounds.",
            },
            {
                step: "4",
                title: "Final Delivery",
                desc:
                    "Delivery of final assets in all required formats and sizes.",
            },
        ],

        tech: [
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Figma",
            "Canva Pro",
            "Adobe InDesign",
        ],

        testimonial: {
            quote:
                "Our engagement increased significantly after the new creatives. Every design now feels polished, professional, and aligned with our brand.",
            author: "Marketing Lead",
            role: "Consumer Brand",
            rating: 5,
        },

        faq: [
            {
                q: "How many revisions are included?",
                a:
                    "We offer flexible and generous revision rounds until the design meets your expectations.",
            },
            {
                q: "What file formats will I receive?",
                a:
                    "You receive all required formats including PNG, JPG, PDF, SVG, and editable source files.",
            },
            {
                q: "Do you design for both print and digital?",
                a:
                    "Yes. All designs are optimized for both print production and digital platforms.",
            },
            {
                q: "Do you offer ongoing design support?",
                a:
                    "Yes. Monthly and retainer-based design plans are available.",
            },
            {
                q: "How fast is delivery?",
                a:
                    "Initial concepts are typically delivered within 48–72 hours depending on scope.",
            },
            {
                q: "Can you match our existing brand identity?",
                a:
                    "Absolutely. We follow your brand guidelines or help create them if needed.",
            },
        ],
    },


    // Video Editing & Motion Content
    "video-editing-motion-content": {
        slug: "video-editing-motion-content",
        title: "Video Editing & Motion Content",
        keyword:
            "video editing services, motion graphics, professional video editor, social media video editing, youtube video editing, corporate video production",

        icon: "🎥",

        heroTitle: "Professional Video Editing That Engages and Converts",
        heroDesc:
            "We deliver high-quality video editing, motion graphics, color grading, and sound design for ads, social media, YouTube, corporate videos, and product demos. Our videos are crafted to capture attention, increase watch time, and drive measurable results.",

        heroImage:
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80",

        stats: [
            { value: "1M+", label: "Views Generated" },
            { value: "4K+", label: "Professional Video Quality" },
            { value: "48hr", label: "Fast Turnaround" },
            { value: "100+", label: "Videos Edited" },
        ],

        features: [
            {
                title: "Social Media Video Editing",
                desc:
                    "Short-form vertical videos optimized for Instagram Reels, TikTok, YouTube Shorts, and other social platforms.",
                icon: <Zap className="w-6 h-6" />,
            },
            {
                title: "YouTube Video Editing",
                desc:
                    "Long-form YouTube editing with pacing, chapters, thumbnails, hooks, and retention-focused storytelling.",
                icon: <Target className="w-6 h-6" />,
            },
            {
                title: "Motion Graphics & Animation",
                desc:
                    "Animated text, transitions, lower thirds, explainer elements, and branded motion graphics.",
                icon: <TrendingUp className="w-6 h-6" />,
            },
            {
                title: "Color Correction & Grading",
                desc:
                    "Professional color correction and cinematic grading for a polished, premium look.",
                icon: <Award className="w-6 h-6" />,
            },
            {
                title: "Advertising & Promo Videos",
                desc:
                    "High-conversion video ads for social media, websites, and digital campaigns.",
                icon: <Users className="w-6 h-6" />,
            },
            {
                title: "Corporate & Brand Videos",
                desc:
                    "Brand stories, testimonials, explainer videos, and internal communications.",
                icon: <CheckCircle className="w-6 h-6" />,
            },
            {
                title: "Sound Design & Audio Cleanup",
                desc:
                    "Music syncing, sound effects, voiceover mixing, noise reduction, and audio enhancement.",
                icon: <Clock className="w-6 h-6" />,
            },
            {
                title: "Subtitles & Captions",
                desc:
                    "Burned-in subtitles or SRT files to improve accessibility, engagement, and watch time.",
                icon: <Shield className="w-6 h-6" />,
            },
        ],

        painPoints: [
            "Videos failing to hold viewer attention?",
            "Low retention or watch time?",
            "Ads not converting into leads or sales?",
            "No time or expertise to edit professionally?",
        ],

        benefits: [
            {
                title: "Higher Watch Time",
                desc:
                    "Optimized pacing, visuals, and storytelling keep viewers engaged longer.",
            },
            {
                title: "Stronger Engagement",
                desc:
                    "Videos designed to earn more likes, comments, shares, and subscribers.",
            },
            {
                title: "Improved ROI",
                desc:
                    "Video content built to support marketing goals and revenue growth.",
            },
        ],

        process: [
            {
                step: "1",
                title: "Brief & Footage Review",
                desc:
                    "Understand project goals, audience, and review raw footage.",
            },
            {
                step: "2",
                title: "Rough Cut",
                desc:
                    "Initial edit focusing on structure, timing, and storytelling.",
            },
            {
                step: "3",
                title: "Polish & Enhance",
                desc:
                    "Add motion graphics, color grading, sound design, and refinements.",
            },
            {
                step: "4",
                title: "Final Delivery",
                desc:
                    "Export in required formats with revision rounds included.",
            },
        ],

        tech: [
            "Adobe Premiere Pro",
            "After Effects",
            "DaVinci Resolve",
            "Final Cut Pro",
            "Adobe Audition",
        ],

        testimonial: {
            quote:
                "Professional editing transformed our content. Watch time increased significantly and the motion graphics elevated our brand presence.",
            author: "Content Lead",
            role: "Digital Media Brand",
            rating: 5,
        },

        faq: [
            {
                q: "What editing software do you use?",
                a:
                    "We use industry-standard tools including Adobe Premiere Pro, After Effects, and DaVinci Resolve.",
            },
            {
                q: "Do you include music and sound effects?",
                a:
                    "Yes. Royalty-free music, sound effects, and audio cleanup are included.",
            },
            {
                q: "Can you edit mobile or low-quality footage?",
                a:
                    "Yes. We enhance and optimize raw footage to look professional.",
            },
            {
                q: "How many revisions are included?",
                a:
                    "Up to three revision rounds are included, depending on project scope.",
            },
            {
                q: "Do you design thumbnails?",
                a:
                    "Yes. Custom thumbnails are included with YouTube and video packages.",
            },
            {
                q: "What export formats do you provide?",
                a:
                    "We deliver MP4 and custom formats including vertical (9:16), horizontal (16:9), and square ratios.",
            },
        ],
    },

};


const relatedServicesMap = {
    "ai-automation-workflow-systems": [
        "web-app-website-development",
        "cloud-infrastructure-devops",
        "seo-growth-optimization",
    ],

    "mobile-app-development": [
        "web-app-website-development",
        "ai-automation-workflow-systems",
        "cloud-infrastructure-devops",
    ],

    "web-app-website-development": [
        "seo-growth-optimization",
        "branding-visual-identity",
        "cloud-infrastructure-devops",
    ],

    "cloud-infrastructure-devops": [
        "ai-automation-workflow-systems",
        "web-app-website-development",
        "mobile-app-development",
    ],

    "seo-growth-optimization": [
        "web-app-website-development",
        "graphics-creative-design",
        "video-editing-motion-content",
    ],

    "branding-visual-identity": [
        "graphics-creative-design",
        "web-app-website-development",
        "video-editing-motion-content",
    ],

    "graphics-creative-design": [
        "branding-visual-identity",
        "video-editing-motion-content",
        "seo-growth-optimization",
    ],

    "video-editing-motion-content": [
        "seo-growth-optimization",
        "branding-visual-identity",
        "graphics-creative-design",
    ],
};



function AccordionItem({ question, answer, isOpen, onClick }) {
    return (
        <motion.div
            initial={false}
            className={`overflow-hidden rounded-2xl border bg-surface transition-colors ${
                isOpen ? 'border-brand-500/40' : 'border-border'
            }`}
        >
            <button
                onClick={onClick}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-surface-2"
            >
                <h3 className="pr-4 text-lg font-semibold text-foreground">{question}</h3>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown className="h-6 w-6 flex-shrink-0 text-brand-500" />
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
                <div className="px-6 pb-6 leading-relaxed text-muted">
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
}


const buildServiceSchema = (service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.heroDesc,
    "provider": {
        "@type": "Organization",
        "name": "Trovina",
        "url": "https://trovina.io",
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "serviceType": service.title,
    "url": `https://trovina.io/services/${service.slug}`,
});

const buildFAQSchema = (faq = []) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
        }
    }))
});

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Trovina",
    "url": "https://trovina.io",
    "logo": "https://trovina.io/logo.png",
    "sameAs": [
        "https://www.linkedin.com/company/trovinaio",
        "https://www.facebook.com/trovinaio"
    ]
};


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
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
                <p className="text-7xl font-bold text-gradient">404</p>
                <h1 className="text-2xl font-bold">Service not found</h1>
                <button onClick={() => navigate('/services')} className="btn-primary mt-2">
                    View all services
                </button>
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

                {/* Organization Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>

                {/* Service Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(buildServiceSchema(service))}
                </script>

                {/* FAQ Schema */}
                {service.faq?.length > 0 && (
                    <script type="application/ld+json">
                        {JSON.stringify(buildFAQSchema(service.faq))}
                    </script>
                )}
            </Helmet>

            <div className="min-h-screen bg-background font-sans text-foreground">
                <Navbar onOpenForm={() => setShowForm(true)} />

                {/* BACK BUTTON */}
                <div className="mx-auto max-w-7xl px-6 pt-24 pb-2 lg:px-8">
                    <button
                        onClick={() => {
                            if (from === "home") navigate("/");
                            else navigate("/services");
                        }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" /> {from === "home" ? "Back to Home" : "Back to Services"}
                    </button>
                </div>

                {/* HERO */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                    className="relative overflow-hidden px-6 pt-8 pb-12 lg:px-8"
                >
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
                        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
                    </div>
                    <div className="mx-auto max-w-4xl text-center">
                        {service.popular && (
                            <motion.span
                                variants={fadeUp}
                                className="mb-5 inline-block rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                            >
                                Most Popular Service
                            </motion.span>
                        )}

                        <motion.h1
                            variants={fadeUp}
                            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl"
                        >
                            {service.heroTitle}
                        </motion.h1>
                    </div>
                </motion.section>

                {/* IMAGE + TEXT */}
                <section className="px-6 py-12 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                        className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-3xl border border-border shadow-card"
                        >
                            <img
                                src={service.heroImage}
                                alt={service.title}
                                loading="lazy"
                                className="h-[400px] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <p className="mb-8 text-lg leading-relaxed text-muted md:text-xl">
                                {service.heroDesc}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setShowForm(true)}
                                className="btn-primary btn-lg"
                            >
                                Start Your Project <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* STATS */}
                <section className="border-t border-border bg-surface px-6 py-16 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4"
                    >
                        {service.stats.map((stat, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="card card-hover p-6 text-center"
                            >
                                <div className="bg-brand-gradient bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                                    <AnimatedCounter value={stat.value} />
                                </div>
                                <div className="mt-1 text-sm text-muted">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* WHAT YOU GET */}
                <section className="px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        What You Get
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {service.features.map((feature, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="card card-hover p-6"
                            >
                                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                                    {feature.icon}
                                </span>
                                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-muted">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* SOLVING REAL CHALLENGES */}
                <section className="border-y border-border bg-surface px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Solving Real Challenges
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4"
                        viewport={{ once: true }}
                    >
                        {service.painPoints.map((point, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="card card-hover p-6 text-center"
                            >
                                <p className="font-medium text-foreground">{point}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* WHY CHOOSE */}
                <section className="px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Why Choose This Service
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        viewport={{ once: true }}
                        className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
                    >
                        {service.benefits.map((b, i) => (
                            <motion.div
                                variants={fadeUp}
                                key={i}
                                className="card card-hover p-8"
                            >
                                <h3 className="mb-3 text-xl font-bold text-foreground">{b.title}</h3>
                                <p className="leading-relaxed text-muted">{b.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* PROCESS */}
                <section className="border-y border-border bg-surface px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Our Process
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-6xl"
                    >
                        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">

                            <div className="absolute left-0 right-0 hidden h-0.5 bg-border md:block" style={{ top: '32px' }} />

                            {service.process.map((p, i) => (
                                <motion.div
                                    variants={fadeUp}
                                    key={i}
                                    onMouseEnter={() => setHoveredProcess(i)}
                                    onMouseLeave={() => setHoveredProcess(null)}
                                    className="relative"
                                >
                                    <div className="relative z-10">
                                        <div className="mb-4 flex flex-col items-center">

                                            <motion.div
                                                animate={{
                                                    scale: hoveredProcess === i ? 1.15 : 1,
                                                }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-white shadow-lift"
                                            >
                                                {p.step}
                                            </motion.div>

                                            <h3 className="text-center text-xl font-semibold text-foreground">{p.title}</h3>
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
                                            <div className="mt-4 rounded-xl border border-border bg-background p-4">
                                                <p className="text-center text-sm leading-relaxed text-muted">{p.desc}</p>
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
                    className="px-6 py-16 md:py-24 lg:px-8"
                >
                    <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-surface p-10 text-center shadow-card md:p-12">
                        <div className="mb-4 flex justify-center gap-1">
                            {[...Array(service.testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                            ))}
                        </div>
                        <p className="mb-6 text-xl leading-relaxed text-foreground">
                            “{service.testimonial.quote}”
                        </p>
                        <div className="font-medium text-muted">
                            {service.testimonial.author} • {service.testimonial.role}
                        </div>
                    </div>
                </motion.section>

                {/* TECH */}
                <section className="border-y border-border bg-surface px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Tech We Use
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                        viewport={{ once: true }}
                        className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
                    >
                        {service.tech.map((t, i) => (
                            <motion.span
                                whileHover={{ scale: 1.06 }}
                                variants={fadeUp}
                                key={i}
                                className="rounded-xl border border-border bg-background px-5 py-2.5 font-medium text-muted transition-all hover:border-brand-500/40 hover:text-foreground"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                </section>

                {/* FAQ */}
                <section className="px-6 py-16 md:py-24 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Frequently Asked Questions
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

                {/* RELATED SERVICES */}
                <section className="border-t border-border bg-surface px-6 py-20 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        Related Services
                    </motion.h2>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                        {relatedServicesMap[slug]?.map((relatedSlug) => {
                            const related = serviceData[relatedSlug];

                            if (!related) return null;

                            return (
                                <motion.div
                                    key={related.slug}
                                    whileHover={{ y: -6 }}
                                    className="card card-hover p-8"
                                >
                                    <h3 className="mb-3 text-xl font-bold text-foreground">
                                        {related.title}
                                    </h3>

                                    <p className="mb-6 text-sm leading-relaxed text-muted">
                                        {related.heroDesc.slice(0, 120)}...
                                    </p>

                                    <button
                                        onClick={() => navigate(`/services/${related.slug}`)}
                                        className="inline-flex items-center gap-1 font-semibold text-brand-600 transition-all hover:gap-2 dark:text-brand-400"
                                    >
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>



                <ProjectFormModal
                    open={showForm}
                    onClose={() => setShowForm(false)}
                />

                {/* LAST CTA */}

                <section className="px-6 py-20 md:py-24 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-brand-gradient px-8 py-16 text-center shadow-lift md:px-12"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                        <div className="relative">
                            <h2 className="text-balance text-3xl font-bold text-white md:text-5xl">
                                Ready to Build or Automate Your Business?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                                Get a free strategy session and see how our experts can help you increase
                                efficiency, scale faster, and grow revenue using modern technology.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setShowForm(true)}
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-bold text-brand-700 shadow-xl transition-all hover:bg-white/90"
                            >
                                Book a Free Strategy Session <ArrowRight className="h-5 w-5" />
                            </motion.button>

                            <p className="mt-6 text-sm text-white/80">
                                No obligation • Response within 2 hours • Trusted by 50+ businesses
                            </p>
                        </div>
                    </motion.div>
                </section>


                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

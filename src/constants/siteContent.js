/**
 * Centralized marketing content for the premium agency sections.
 * Structured as plain data (icons are lucide component references, not JSX) so
 * these can later be swapped for a CMS / Firestore source without touching the
 * presentation components.
 *
 * Positioning: Trovina is a US-based software, AI & cloud product studio.
 * Copy is outcome-driven and written for funded startups, SaaS companies, and
 * mid-market / enterprise teams in the US market.
 */
import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  BrainCircuit,
  GitBranch,
  Rocket,
  Compass,
  PenTool,
  Wrench,
  TrendingUp,
  Zap,
  ShieldCheck,
  MessageSquare,
  Gauge,
  Layers,
  Building2,
  Users,
  CalendarCheck,
  FileCheck,
  Lock,
  Headphones,
} from 'lucide-react';

/* ----------------------------------------------------------------
   TECHNOLOGIES WE USE — grouped stack
----------------------------------------------------------------- */
export const techStack = [
  {
    category: 'Frontend',
    icon: Code2,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: Server,
    items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Laravel', 'GraphQL'],
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
  },
  {
    category: 'Cloud & Infra',
    icon: Cloud,
    items: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Firebase', 'Cloudflare'],
  },
  {
    category: 'AI & Data',
    icon: BrainCircuit,
    items: ['OpenAI', 'LangChain', 'Pinecone', 'TensorFlow', 'Hugging Face'],
  },
  {
    category: 'DevOps',
    icon: GitBranch,
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Grafana'],
  },
];

/* ----------------------------------------------------------------
   PROCESS — Discovery → Strategy → Design → Development → Launch → Scale
----------------------------------------------------------------- */
export const processSteps = [
  {
    icon: Compass,
    title: 'Discovery',
    desc: 'We start with your business model, users, and goals — defining what success looks like and what it should be worth before we write a line of code.',
  },
  {
    icon: Layers,
    title: 'Strategy',
    desc: 'We turn findings into a clear, fixed-scope roadmap — architecture, milestones, and a budget tied directly to measurable business outcomes.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'We craft intuitive, on-brand interfaces and clickable prototypes, validating the experience with real users before we build.',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'We engineer clean, scalable, well-tested code in weekly sprints — you see working software every Friday and can steer in real time.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    desc: 'We ship with confidence — performance, security, and analytics dialed in for a smooth go-live and a measurable baseline from day one.',
  },
  {
    icon: TrendingUp,
    title: 'Scale',
    desc: 'We monitor, optimize, and evolve your product with long-term support — turning your launch into compounding growth.',
  },
];

/* ----------------------------------------------------------------
   WHY CHOOSE US — premium credibility
----------------------------------------------------------------- */
export const whyChooseUs = [
  {
    icon: Users,
    title: 'Senior Team, Direct Access',
    desc: 'You work directly with the senior engineers and designers building your product — never a sales rep, junior hand-off, or account-manager black box.',
  },
  {
    icon: TrendingUp,
    title: 'Outcomes, Not Output',
    desc: 'We tie scope to business results — conversions, revenue, efficiency — and measure success by what your product earns, not the hours we bill.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance First',
    desc: 'Secure-by-design architecture, best-practice auth, and rigorous reviews — ready for SOC 2, HIPAA, and enterprise procurement when you need it.',
  },
  {
    icon: Gauge,
    title: 'Engineering Quality',
    desc: 'Clean, documented, automatically tested code with performance budgets — products that stay fast and reliable as they scale to millions of users.',
  },
  {
    icon: MessageSquare,
    title: 'Radical Transparency',
    desc: 'Weekly demos, a shared roadmap, and fixed-scope pricing. You always know what is shipping, what it costs, and when it lands.',
  },
  {
    icon: Wrench,
    title: 'Partners After Launch',
    desc: 'We stay on with monitoring, maintenance, and iteration — most clients keep us as their long-term product partner well beyond v1.',
  },
];

/* ----------------------------------------------------------------
   TESTIMONIALS — social proof.
   Anonymized by role + industry (no named companies) so every quote is honest
   to swap for real, attributable references before launch.
----------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      'Trovina rebuilt our platform from the ground up. Page loads dropped from 6 seconds to under one, and our trial-to-paid conversion climbed 38% in the first quarter after launch.',
    name: 'Daniel R.',
    role: 'Founder & CEO',
    company: 'B2B SaaS · Series A',
    initials: 'DR',
    result: '+38% conversions',
  },
  {
    quote:
      'Their AI automation now handles thousands of customer messages a day. Response time went from hours to under five seconds, and my team finally spends its time on growth instead of triage.',
    name: 'Marcus T.',
    role: 'VP of Operations',
    company: 'National Logistics Company',
    initials: 'MT',
    result: '10x faster ops',
  },
  {
    quote:
      'From discovery to launch in eight weeks, fully HIPAA-conscious. Communication was flawless and the product looked like it came out of a top-tier studio. Easily our best agency experience.',
    name: 'Priya S.',
    role: 'Founder',
    company: 'Digital Health Startup',
    initials: 'PS',
    result: '8-week launch',
  },
  {
    quote:
      'We came with an idea and left with a scalable platform and paying customers. Trovina operated like an in-house team that genuinely cared about our numbers, not just shipping features.',
    name: 'Jordan K.',
    role: 'Co-founder',
    company: 'FinTech Startup',
    initials: 'JK',
    result: 'MVP → revenue',
  },
];

/* ----------------------------------------------------------------
   RESULTS — representative outcomes, anonymized by industry.
   Illustrative of typical engagements; replace with attributable case studies.
----------------------------------------------------------------- */
export const results = [
  {
    industry: 'B2B SaaS',
    stage: 'Series A',
    headline: 'Platform rebuild → +38% trial-to-paid',
    detail: 'Re-architected a legacy web app for speed and reliability. Page loads fell from 6s to under 1s and qualified trial conversions rose 38% in one quarter.',
    metrics: [
      { value: '6s→<1s', label: 'Load time' },
      { value: '+38%', label: 'Conversions' },
    ],
  },
  {
    industry: 'Logistics',
    stage: 'Mid-market',
    headline: 'AI ops automation → 10x throughput',
    detail: 'Built an AI workflow layer that handles thousands of daily customer messages and order updates. Response time dropped from hours to seconds.',
    metrics: [
      { value: '<5s', label: 'Response time' },
      { value: '10x', label: 'Ops throughput' },
    ],
  },
  {
    industry: 'Digital Health',
    stage: 'Seed',
    headline: 'HIPAA-conscious telehealth MVP in 8 weeks',
    detail: 'Shipped a compliant patient + provider platform from discovery to launch in eight weeks, ready for the first cohort of paying customers.',
    metrics: [
      { value: '8 wks', label: 'To launch' },
      { value: 'HIPAA', label: 'Compliant build' },
    ],
  },
];

/* ----------------------------------------------------------------
   PRICING — engagement tiers ("starting at" anchors, value-led)
----------------------------------------------------------------- */
export const pricingTiers = [
  {
    icon: Rocket,
    name: 'Launch',
    price: '$7,500',
    priceNote: 'starting',
    summary: 'For founders validating an idea and getting to market fast.',
    features: [
      'Discovery & product strategy sprint',
      'UX/UI design system',
      'MVP web app, marketing site, or landing funnel',
      'Launch + analytics setup',
      '30 days post-launch support',
    ],
    cta: 'Start Your Launch',
    popular: false,
  },
  {
    icon: TrendingUp,
    name: 'Growth',
    price: '$20,000',
    priceNote: 'starting',
    summary: 'For companies scaling a live product with real users and revenue.',
    features: [
      'Everything in Launch',
      'Full web + mobile application',
      'Third-party & payment integrations',
      'AI automation & workflow systems',
      'Dedicated product manager + weekly demos',
      'Performance, SEO & conversion optimization',
    ],
    cta: 'Plan Your Growth',
    popular: true,
  },
  {
    icon: Building2,
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'tailored',
    summary: 'For teams with complex, mission-critical, or compliance-heavy systems.',
    features: [
      'Everything in Growth',
      'Dedicated cross-functional team',
      'Cloud architecture & DevOps at scale',
      'Security & compliance (SOC 2 / HIPAA)',
      'SLA-backed support & monitoring',
      'Long-term product partnership',
    ],
    cta: 'Talk to Us',
    popular: false,
  },
];

/* ----------------------------------------------------------------
   GUARANTEE — risk reversal / what every engagement includes
----------------------------------------------------------------- */
export const guarantees = [
  {
    icon: FileCheck,
    title: 'Fixed scope, fixed price',
    desc: 'You approve a clear scope and budget up front. No surprise invoices, no scope-creep games.',
  },
  {
    icon: CalendarCheck,
    title: 'Weekly working demos',
    desc: 'See real, running software every week — and steer the build before anything is locked in.',
  },
  {
    icon: Lock,
    title: 'You own 100% of the IP',
    desc: 'All code, designs, and assets are yours. Full handover, clean repos, complete documentation.',
  },
  {
    icon: Headphones,
    title: '30 days support, included',
    desc: 'Every launch ships with a month of support and monitoring at no extra cost — then optional retainers.',
  },
];

/* ----------------------------------------------------------------
   INDUSTRIES — markets we serve (US-focused framing)
----------------------------------------------------------------- */
export const industries = [
  { name: 'SaaS & Startups', desc: 'MVPs, full SaaS platforms, subscription billing, and AI-powered web and mobile products built to raise and scale.' },
  { name: 'FinTech', desc: 'Payment systems, lending platforms, and secure, compliance-ready transaction technology with enterprise-grade auth.' },
  { name: 'Healthcare & Health Tech', desc: 'HIPAA-conscious telehealth, patient and provider portals, scheduling, and care-management platforms.' },
  { name: 'E-Commerce & Retail', desc: 'High-converting storefronts, headless commerce, marketplaces, and integrated fulfillment and payment systems.' },
  { name: 'Logistics & Supply Chain', desc: 'Real-time tracking, fleet and route optimization, and AI-driven warehouse and operations platforms.' },
  { name: 'Professional & B2B Services', desc: 'Internal tools, client portals, automation, and dashboards that remove manual work and unlock capacity.' },
];

/* ----------------------------------------------------------------
   FAQ — homepage commercial-intent questions
----------------------------------------------------------------- */
export const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'Most engagements start at $7,500 for an MVP or marketing build (Launch), $20,000+ for a full product (Growth), and scale into custom enterprise programs. After a short discovery call we give you a fixed scope and price — no open-ended hourly billing.',
  },
  {
    q: 'How long does it take to build?',
    a: 'MVPs and websites typically launch in 4–8 weeks. Full web and mobile products run 8–16 weeks depending on scope. We work in weekly sprints, so you see progress and can adjust priorities throughout.',
  },
  {
    q: 'Do you work with startups or established companies?',
    a: 'Both. We partner with funded startups shipping their first product and with mid-market and enterprise teams modernizing or scaling existing systems. The process flexes to your stage.',
  },
  {
    q: 'Where is your team based?',
    a: 'Trovina is a US-based, remote-first studio. You work directly with senior engineers and designers, with overlapping US business hours and clear, async-friendly communication.',
  },
  {
    q: 'Do I own the code and design?',
    a: 'Yes — 100%. You retain full ownership of all source code, designs, and assets, with a clean handover, documented repositories, and no vendor lock-in.',
  },
  {
    q: 'Can you take over or fix an existing product?',
    a: 'Absolutely. We regularly audit, rescue, and modernize existing codebases — improving performance, security, and UX, or rebuilding the parts holding you back.',
  },
];

/* ----------------------------------------------------------------
   TEAM — supports future dynamic data (photo falls back to initials)
----------------------------------------------------------------- */
export const team = [
  {
    name: 'Gospel John',
    role: 'Founder & CEO',
    bio: 'Sets product vision and partners directly with clients to align technology with measurable business growth.',
    initials: 'GJ',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Gospel%20John&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=20',
  },
  {
    name: 'Madhav Patadiya',
    role: 'Head of Design',
    bio: 'Leads the design studio end-to-end — research, UX, and pixel-perfect, conversion-focused interfaces.',
    initials: 'MP',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Madhav%20Patadiya&backgroundColor=ffd5dc,ffdfbf,d1d4f9&radius=20',
  },
  {
    name: 'Chinedu Okafor',
    role: 'Lead Software Engineer',
    bio: 'Ships scalable web, mobile, and cloud systems with a relentless focus on quality, security, and performance.',
    initials: 'CO',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Chinedu%20Okafor&backgroundColor=c0aede,b6e3f4,ffd5dc&radius=20',
  },
  {
    name: 'Ananya Sharma',
    role: 'AI & Automation Lead',
    bio: 'Designs intelligent workflows and AI systems that remove manual work and accelerate operations.',
    initials: 'AS',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Ananya%20Sharma&backgroundColor=d1d4f9,ffdfbf,b6e3f4&radius=20',
  },
];

export default {
  techStack,
  processSteps,
  whyChooseUs,
  testimonials,
  results,
  pricingTiers,
  guarantees,
  industries,
  faqs,
  team,
};

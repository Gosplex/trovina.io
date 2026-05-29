/**
 * Centralized marketing content for the premium agency sections.
 * Structured as plain data (icons are lucide component references, not JSX) so
 * these can later be swapped for a CMS / Firestore source without touching the
 * presentation components.
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
    desc: 'We dig into your goals, users, and constraints to define exactly what success looks like before a single line of code.',
  },
  {
    icon: Layers,
    title: 'Strategy',
    desc: 'We translate findings into a clear roadmap — scope, architecture, and milestones aligned to measurable business outcomes.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'We craft intuitive, on-brand interfaces and prototypes, validating the experience before we build.',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'We engineer clean, scalable, well-tested code in tight feedback loops, shipping increments you can see and steer.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    desc: 'We deploy with confidence — performance, security, and analytics dialed in for a smooth, reliable go-live.',
  },
  {
    icon: TrendingUp,
    title: 'Scale',
    desc: 'We monitor, optimize, and evolve your product with long-term support as your business and user base grow.',
  },
];

/* ----------------------------------------------------------------
   WHY CHOOSE US — enterprise credibility
----------------------------------------------------------------- */
export const whyChooseUs = [
  {
    icon: Zap,
    title: 'Delivery Speed',
    desc: 'Agile sprints and a senior team mean you see working software fast — without sacrificing quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    desc: 'Secure-by-design architecture, best-practice auth, and rigorous reviews protect your data and your users.',
  },
  {
    icon: Gauge,
    title: 'Engineering Quality',
    desc: 'Clean code, automated testing, and performance budgets produce products that stay reliable as they grow.',
  },
  {
    icon: MessageSquare,
    title: 'Clear Communication',
    desc: 'Transparent updates, shared roadmaps, and direct access to the builders — no account-manager black box.',
  },
  {
    icon: Layers,
    title: 'Built to Scale',
    desc: 'Cloud-native infrastructure and modular systems that handle growth from your first user to your millionth.',
  },
  {
    icon: Wrench,
    title: 'Long-Term Support',
    desc: 'We stay after launch with monitoring, maintenance, and iteration so your product keeps improving.',
  },
];

/* ----------------------------------------------------------------
   TESTIMONIALS — social proof (photos use initials placeholders)
----------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      'Trovina rebuilt our platform from the ground up. Page loads dropped from 6s to under 1s and our conversion rate climbed 38% in the first quarter after launch.',
    name: 'Adeola Ahmed',
    role: 'CEO',
    company: 'DirectMall Nigeria',
    initials: 'AA',
    result: '+38% conversions',
  },
  {
    quote:
      'Their AI automation now handles thousands of customer messages a day. Response time went from hours to under five seconds and the team finally focuses on growth.',
    name: 'Daniel Okoro',
    role: 'Operations Lead',
    company: 'SwiftLogistics',
    initials: 'DO',
    result: '10x faster ops',
  },
  {
    quote:
      'From discovery to launch in eight weeks. The communication was flawless and the product looked like it came out of a top-tier studio. Easily our best agency experience.',
    name: 'Fatima Bello',
    role: 'Founder',
    company: 'Lumi Health',
    initials: 'FB',
    result: '8-week launch',
  },
  {
    quote:
      'We came with an idea and left with a scalable SaaS platform and paying customers. Trovina felt like an in-house team that genuinely cared about our outcomes.',
    name: 'Samuel Mensah',
    role: 'Co-founder',
    company: 'Paystack-adjacent FinTech',
    initials: 'SM',
    result: 'MVP → revenue',
  },
];

/* ----------------------------------------------------------------
   TEAM — supports future dynamic data (photo falls back to initials)
----------------------------------------------------------------- */
export const team = [
  {
    name: 'Gospel John',
    role: 'Founder & CEO',
    bio: 'Sets product vision and partners directly with clients to align technology with business growth.',
    initials: 'GJ',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Gospel%20John&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=20',
  },
  {
    name: 'Madhav Patadiya',
    role: 'Team Lead — Design Studio',
    bio: 'Leads the design studio end-to-end — research, UX, and pixel-perfect, on-brand interfaces.',
    initials: 'MP',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Madhav%20Patadiya&backgroundColor=ffd5dc,ffdfbf,d1d4f9&radius=20',
  },
  {
    name: 'Chinedu Okafor',
    role: 'Lead Software Engineer',
    bio: 'Ships scalable web, mobile, and cloud systems with a relentless focus on quality and performance.',
    initials: 'CO',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Chinedu%20Okafor&backgroundColor=c0aede,b6e3f4,ffd5dc&radius=20',
  },
  {
    name: 'Ananya Sharma',
    role: 'AI & Automation Specialist',
    bio: 'Designs intelligent workflows and AI systems that remove manual work and accelerate operations.',
    initials: 'AS',
    photo: 'https://api.dicebear.com/9.x/notionists/svg?seed=Ananya%20Sharma&backgroundColor=d1d4f9,ffdfbf,b6e3f4&radius=20',
  },
];

export default { techStack, processSteps, whyChooseUs, testimonials, team };

/**
 * Centralized marketing content. Plain data so it can move to a CMS / Firestore
 * later without touching the presentation components.
 *
 * Testimonial avatars are illustrations generated from Micah Lanier's
 * "Avatar Illustration System" (CC BY 4.0) via DiceBear; see /public/avatars.
 */
import { photos } from './images';

/* ----------------------------------------------------------------
   SERVICES, shared by Home, Services and the footer
----------------------------------------------------------------- */
export const services = [
  {
    slug: 'web-app-website-development',
    title: 'Websites & web apps',
    desc: 'Fast, search-friendly websites and web applications built with React and Next.js, from company sites to online stores and customer portals.',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile apps',
    desc: 'iOS and Android apps in Flutter or React Native that customers keep using after the first download.',
  },
  {
    slug: 'ai-automation-workflow-systems',
    title: 'AI automation',
    desc: 'WhatsApp assistants, lead follow-up and back-office workflows that take repetitive work off your team.',
  },
  {
    slug: 'cloud-infrastructure-devops',
    title: 'Cloud & DevOps',
    desc: 'Reliable hosting on AWS, Google Cloud or Azure with automated deployments, monitoring and backups.',
  },
  {
    slug: 'seo-growth-optimization',
    title: 'SEO & growth',
    desc: 'Technical SEO, content and conversion work that turns your website into a steady source of enquiries.',
  },
  {
    slug: 'branding-visual-identity',
    title: 'Branding & identity',
    desc: 'Logos, colour, type and brand guidelines that make a young company look established.',
  },
  {
    slug: 'graphics-creative-design',
    title: 'Graphics & creative',
    desc: 'Social, ad and marketing creative that stays on brand and gets the message across quickly.',
  },
  {
    slug: 'video-editing-motion-content',
    title: 'Video & motion',
    desc: 'Edited product videos, reels and motion graphics for launches, ads and social channels.',
  },
];

/* ----------------------------------------------------------------
   TECHNOLOGIES, grouped stack (names only; logos live in TechStack)
----------------------------------------------------------------- */
export const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue'] },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Laravel', 'GraphQL'] },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'] },
  { category: 'Cloud', items: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Firebase', 'Cloudflare'] },
  { category: 'AI & data', items: ['OpenAI', 'LangChain', 'Pinecone', 'TensorFlow', 'Hugging Face'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Grafana'] },
];

/* ----------------------------------------------------------------
   PROCESS, a real sequence, so numbering is meaningful
----------------------------------------------------------------- */
export const processSteps = [
  {
    title: 'Discovery',
    desc: 'A short call and workshop to understand your business, your customers and what success should look like.',
  },
  {
    title: 'Scope & quote',
    desc: 'You get a written scope, timeline and fixed price. Nothing starts until you approve it.',
  },
  {
    title: 'Design',
    desc: 'Wireframes and clickable designs you can review and comment on before any code is written.',
  },
  {
    title: 'Build',
    desc: 'Weekly sprints with a working demo every Friday, so you always see real progress.',
  },
  {
    title: 'Launch',
    desc: 'Testing, speed and security checks, analytics, and a calm go-live with us on hand.',
  },
  {
    title: 'Support',
    desc: 'Included support after launch, then optional monthly care for updates, SEO and new features.',
  },
];

/* ----------------------------------------------------------------
   WHY US, principles (used on About)
----------------------------------------------------------------- */
export const whyChooseUs = [
  {
    title: 'You talk to the people doing the work',
    desc: 'Your designers and engineers are on every call. No account-manager relay.',
  },
  {
    title: 'Fixed scope, fixed price',
    desc: 'You approve the number up front. No surprise invoices halfway through.',
  },
  {
    title: 'Built to last',
    desc: 'Clean, documented, tested code that another team could pick up tomorrow.',
  },
  {
    title: 'Security and data protection',
    desc: 'Sensible defaults for auth, backups and access, aligned with NDPA and GDPR requirements.',
  },
  {
    title: 'Open communication',
    desc: 'A shared roadmap, weekly demos and a WhatsApp or Slack channel with your team.',
  },
  {
    title: 'We stay after launch',
    desc: 'Most clients keep us on for maintenance and new features long after version one.',
  },
];

/* ----------------------------------------------------------------
   TESTIMONIALS
----------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      'Trovina rebuilt our platform from the ground up. Pages now load in under a second and our trial-to-paid conversion went up 38% in the first quarter.',
    name: 'Daniel R.',
    role: 'Founder & CEO, B2B SaaS',
    initials: 'DR',
    avatar: '/avatars/daniel-r.svg',
  },
  {
    quote:
      'Their WhatsApp automation handles thousands of customer messages a day. Replies went from hours to seconds and my team finally works on growth instead of triage.',
    name: 'Marcus T.',
    role: 'Head of Operations, logistics company',
    initials: 'MT',
    avatar: '/avatars/marcus-t.svg',
  },
  {
    quote:
      'From discovery to launch in eight weeks. Communication was clear the whole way through and the product feels like it came from a much bigger studio.',
    name: 'Priya S.',
    role: 'Founder, digital health startup',
    initials: 'PS',
    avatar: '/avatars/priya-s.svg',
  },
  {
    quote:
      'We came with an idea and left with a working platform and paying customers. They behaved like an in-house team that cared about our numbers.',
    name: 'Jordan K.',
    role: 'Co-founder, fintech startup',
    initials: 'JK',
    avatar: '/avatars/jordan-k.svg',
  },
];

/* ----------------------------------------------------------------
   RESULTS, selected work, anonymised by industry
----------------------------------------------------------------- */
export const results = [
  {
    industry: 'Healthcare SaaS',
    headline: 'Hospital ERP',
    detail:
      'A cloud hospital management platform that runs a facility from the front desk to the pharmacy. Each hospital gets its own secure workspace, with role-based access for doctors, nurses, cashiers and administrators.',
    tags: ['Patient records', 'Appointments', 'Billing & HMO claims', 'Pharmacy', 'Laboratory', 'Inventory', 'Reports'],
    photo: photos.pairDesk,
  },
  {
    industry: 'White-label HR software',
    headline: 'HR management system',
    detail:
      'An HR platform that partners resell under their own brand, logo and domain. It covers employee records, leave and attendance, payroll with statutory deductions, appraisals and an employee self-service portal.',
    tags: ['White label', 'Payroll', 'Leave & attendance', 'Self-service portal'],
    photo: '/team/gospel-john.svg',
  },
  {
    industry: 'Transport & logistics',
    headline: 'Fleet tracking system',
    detail:
      'Live vehicle tracking with a web admin for dispatchers and a mobile app for drivers. Includes trip history, driver assignment, fuel and maintenance logs, and alerts for speeding and idling.',
    tags: ['Web admin', 'Driver app (iOS & Android)', 'Live GPS', 'Alerts'],
    photo: photos.pairLaptops,
  },
];

/* ----------------------------------------------------------------
   GUARANTEE, what every engagement includes (shown with pricing)
----------------------------------------------------------------- */
export const guarantees = [
  { title: 'Fixed price', desc: 'Approved in writing before work starts.' },
  { title: 'Weekly demos', desc: 'See working software every Friday.' },
  { title: 'You own it all', desc: 'Code, designs and accounts are handed over to you.' },
  { title: 'Support included', desc: 'Post-launch support on every plan.' },
];

/* ----------------------------------------------------------------
   INDUSTRIES
----------------------------------------------------------------- */
export const industries = [
  {
    name: 'Real estate',
    icon: 'Building2',
    builds: ['Property listing websites', 'Tenant and rent portals', 'Estate and facility management'],
  },
  {
    name: 'Schools & institutions',
    icon: 'GraduationCap',
    builds: ['School management systems', 'Parent and student portals', 'Online fees and e-learning'],
  },
  {
    name: 'E-commerce & supermarkets',
    icon: 'ShoppingCart',
    builds: ['Online stores and delivery', 'POS and inventory', 'Loyalty and WhatsApp ordering'],
  },
  {
    name: 'Healthcare',
    icon: 'HeartPulse',
    builds: ['Hospital ERP', 'Appointment booking', 'Pharmacy and lab systems'],
  },
  {
    name: 'Logistics & transport',
    icon: 'Truck',
    builds: ['Fleet tracking', 'Dispatch and delivery apps', 'Waybill and trip records'],
  },
  {
    name: 'Fintech & cooperatives',
    icon: 'Landmark',
    builds: ['Savings and loan apps', 'Member portals', 'Payments and wallets'],
  },
  {
    name: 'Oil, gas & energy',
    icon: 'Fuel',
    builds: ['Asset and maintenance tracking', 'HSE incident reporting', 'Field team apps'],
  },
  {
    name: 'Hospitality',
    icon: 'UtensilsCrossed',
    builds: ['Hotel booking websites', 'Restaurant ordering', 'Event and ticketing'],
  },
];

/* ----------------------------------------------------------------
   FAQ, homepage commercial-intent questions
----------------------------------------------------------------- */
export const faqs = [
  {
    q: 'How much does a website or app cost?',
    a: 'Business websites start from ₦450,000 (US$750 for international clients), web apps and online stores from ₦1,800,000 (US$2,800), and full web and mobile products from ₦4,500,000 (US$7,500). After a short call we send a fixed quote, so the price you approve is the price you pay.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most websites launch in 2–3 weeks. Web apps take 6–10 weeks and full web and mobile products 10–16 weeks, depending on scope. You see a working demo every week.',
  },
  {
    q: 'How do payments work?',
    a: 'We usually take a 50% deposit to begin and split the rest across agreed milestones. We invoice in Naira for local clients and in US dollars for international clients.',
  },
  {
    q: 'Where is your team based?',
    a: 'Our studio is in Port Harcourt and we work with clients remotely across Africa, Europe and North America, with calls scheduled around your time zone.',
  },
  {
    q: 'Do I own the code and designs?',
    a: 'Yes. You own all source code, designs and assets. We hand over repositories, accounts and documentation at the end of the project.',
  },
  {
    q: 'Can you take over an existing website or app?',
    a: 'Yes. We regularly audit, fix and modernise existing products, improving speed, security and design, or rebuilding the parts that hold you back.',
  },
];

/* ----------------------------------------------------------------
   TEAM: illustrated avatars (public/team). Swap `photo` for real headshots
----------------------------------------------------------------- */
export const team = [
  {
    name: 'Gospel John',
    role: 'Founder & CEO',
    bio: 'Sets product direction and works directly with clients to connect technology to business goals.',
    initials: 'GJ',
    photo: '/team/gospel-john.svg',
  },
  {
    name: 'Pamenas Danlami',
    role: 'Co-Founder',
    bio: 'Shapes company strategy and growth, and turns client ideas into practical technology plans.',
    initials: 'PD',
    photo: '/team/pamenas-danlami.svg',
  },
  {
    name: 'Chinedu Okafor',
    role: 'Lead Software Engineer',
    bio: 'Builds scalable web, mobile and cloud systems with a focus on quality, security and performance.',
    initials: 'CO',
    photo: '/team/chinedu-okafor.svg',
  },
  {
    name: 'Ananya Sharma',
    role: 'AI & Automation Lead',
    bio: 'Designs the AI workflows and automations that take manual work off client teams.',
    initials: 'AS',
    photo: '/team/ananya-sharma.svg',
  },
];

export default {
  services,
  techStack,
  processSteps,
  whyChooseUs,
  testimonials,
  results,
  guarantees,
  industries,
  faqs,
  team,
};

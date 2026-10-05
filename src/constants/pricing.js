/**
 * Pricing, one place for every number on the site.
 *
 * Local clients see Naira, international clients see USD. USD figures are set
 * as their own price points (not a live FX conversion) so they stay stable.
 */
import { Globe, Layers, Rocket } from 'lucide-react';

export const CURRENCIES = {
  NGN: { code: 'NGN', label: '₦ NGN', locale: 'en-NG', symbol: '₦' },
  USD: { code: 'USD', label: '$ USD', locale: 'en-US', symbol: '$' },
};

export const formatPrice = (amount, code = 'NGN') =>
  new Intl.NumberFormat(CURRENCIES[code].locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount);

export const pricingTiers = [
  {
    id: 'website',
    icon: Globe,
    name: 'Website',
    price: { NGN: 450000, USD: 750 },
    timeline: '2–3 weeks',
    summary: 'A fast, credible business website your customers can find on Google.',
    features: [
      'Up to 8 custom-designed pages',
      'Mobile-first, loads in under 2 seconds',
      'Easy content editing (CMS)',
      'On-page SEO and Google Business setup',
      'Contact forms, WhatsApp and analytics',
      '30 days of support after launch',
    ],
    cta: 'Start a website',
    featured: false,
  },
  {
    id: 'product',
    icon: Layers,
    name: 'Web app',
    price: { NGN: 1800000, USD: 2800 },
    timeline: '6–10 weeks',
    summary: 'For online stores, booking platforms, portals and MVPs.',
    features: [
      'Everything in Website',
      'User accounts and admin dashboard',
      'Payments with Paystack, Flutterwave or Stripe',
      'Integrations with your existing tools',
      'Weekly demos with a dedicated project lead',
      '60 days of support after launch',
    ],
    cta: 'Plan a web app',
    featured: true,
  },
  {
    id: 'scale',
    icon: Rocket,
    name: 'Product',
    price: { NGN: 4500000, USD: 7500 },
    timeline: '10–16 weeks',
    summary: 'Web and mobile products with automation and cloud built in.',
    features: [
      'Everything in Web app',
      'iOS and Android app',
      'AI automation and workflow systems',
      'Cloud setup, monitoring and backups',
      'Security review before launch',
      '90 days of support after launch',
    ],
    cta: 'Scope a product',
    featured: false,
  },
];

/** Monthly retainer anchor shown under the tiers. */
export const retainer = { NGN: 150000, USD: 250 };

/** "Starting from" price per service, used on service pages. */
export const servicePricing = {
  'web-app-website-development': { NGN: 450000, USD: 750, unit: 'project' },
  'mobile-app-development': { NGN: 2500000, USD: 3500, unit: 'project' },
  'ai-automation-workflow-systems': { NGN: 600000, USD: 900, unit: 'project' },
  'cloud-infrastructure-devops': { NGN: 350000, USD: 600, unit: 'project' },
  'seo-growth-optimization': { NGN: 150000, USD: 250, unit: 'month' },
  'branding-visual-identity': { NGN: 250000, USD: 400, unit: 'project' },
  'graphics-creative-design': { NGN: 60000, USD: 100, unit: 'design pack' },
  'video-editing-motion-content': { NGN: 40000, USD: 80, unit: 'video' },
};

export default pricingTiers;

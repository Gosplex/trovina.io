/**
 * Trovina.io, Company / Contact (NAP) single source of truth.
 * --------------------------------------------------------------
 * Name, address, phone, email and links are edited in ONE place and flow into
 * the Footer, Contact page, WhatsApp button, JSON-LD schema and llms.txt copy.
 *
 * Keep the NAP (name, address, phone) here identical to your Google Business
 * Profile listing, consistency is a local-SEO ranking signal.
 */

export const company = {
  brand: 'Trovina.io',
  // Registered company name (CAC).
  legalName: 'Trovina Technologies Limited',
  tagline: 'Product studio for web, mobile and AI',

  email: 'hello@trovina.io',

  phone: '+234 903 724 8511',
  phoneHref: 'tel:+2349037248511',
  phoneE164: '+2349037248511',
  whatsapp: '2349037248511', // digits only, for wa.me links

  hours: 'Mon–Fri, 9:00am–6:00pm WAT',
  // schema.org openingHours format
  openingHours: 'Mo-Fr 09:00-18:00',

  address: {
    line1: '42 Obiwali Road, Rumuigbo',
    city: 'Port Harcourt',
    state: 'Rivers State',
    region: 'Rivers',
    country: 'NG',
    countryName: 'Nigeria',
  },
  // Pre-joined for display.
  addressText: '42 Obiwali Road, Rumuigbo, Port Harcourt, Rivers State, Nigeria',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=42+Obiwali+Road%2C+Rumuigbo%2C+Port+Harcourt%2C+Rivers+State%2C+Nigeria',
  mapsEmbed:
    'https://www.google.com/maps?q=42+Obiwali+Road,+Rumuigbo,+Port+Harcourt,+Rivers+State,+Nigeria&output=embed',

  url: 'https://trovina.io',

  socials: {
    linkedin: 'https://linkedin.com/company/trovinaio',
    facebook: 'https://facebook.com/trovinaio',
    youtube: 'https://youtube.com/@trovinaio',
  },
};

export default company;

/**
 * Trovina.io — Company / Contact (NAP) single source of truth.
 * --------------------------------------------------------------
 * Centralized so name, address, phone, email, and links are edited in ONE place
 * and flow into the Footer, Contact page, WhatsApp float, and JSON-LD schema.
 *
 * NOTE: The US address and phone below are PLACEHOLDERS (the phone uses the
 * 555-01xx range reserved for fictional use). Replace them with the real
 * details — every consumer reads from here, so no other file needs touching.
 */

export const company = {
  brand: 'Trovina.io',
  legalName: 'Trovina Technologies LLC',
  // Premium, business-outcome positioning (US market).
  tagline: 'US-based software, AI & cloud product studio',
  positioning: 'US-based, remote-first',

  email: 'hello@trovina.io',

  // Placeholder US phone (NANP 555-01xx is reserved for fiction — safe to ship).
  phone: '+1 (212) 555-0188',
  phoneHref: 'tel:+12125550188',
  whatsapp: '12125550188', // digits only, for wa.me links

  // Replace with your real scheduling link.
  calendly: 'https://calendly.com/trovina/strategy-call',

  hours: 'Mon–Fri · 9:00am–6:00pm ET',

  address: {
    line1: '447 Broadway, 2nd Floor',
    city: 'New York',
    state: 'NY',
    zip: '10013',
    country: 'US',
  },
  // Pre-joined for display.
  addressText: '447 Broadway, 2nd Floor, New York, NY 10013',

  url: 'https://trovina.io',

  socials: {
    linkedin: 'https://linkedin.com/company/trovinaio',
    facebook: 'https://facebook.com/trovinaio',
    youtube: 'https://youtube.com/@trovinaio',
  },
};

export default company;

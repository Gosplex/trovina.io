/**
 * JSON-LD builders (schema.org). Every page composes from these so the
 * business details stay identical everywhere, search engines and AI answer
 * engines cross-check them.
 */
import { company } from '../constants/company';

const ORG_ID = `${company.url}/#organization`;
const SITE_ID = `${company.url}/#website`;

export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: company.address.line1,
  addressLocality: company.address.city,
  addressRegion: company.address.state,
  addressCountry: company.address.country,
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: company.brand,
  legalName: company.legalName,
  alternateName: ['Trovina', 'Trovina Technologies', 'Trovina Technologies Limited'],
  url: company.url,
  logo: `${company.url}/logo.png`,
  image: `${company.url}/og-home.jpg`,
  description:
    'Trovina is a software and digital product studio that designs and builds websites, web apps, mobile apps and AI automation for businesses.',
  email: company.email,
  telephone: company.phoneE164,
  address: postalAddress,
  hasMap: company.mapsUrl,
  openingHours: company.openingHours,
  priceRange: '₦₦–₦₦₦',
  currenciesAccepted: 'NGN, USD',
  paymentAccepted: 'Bank transfer, Card',
  areaServed: [
    { '@type': 'Country', name: 'Nigeria' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'Website development',
    'Web application development',
    'Mobile app development',
    'AI automation',
    'WhatsApp automation',
    'Cloud infrastructure',
    'Search engine optimization',
    'Brand identity design',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: company.phoneE164,
      email: company.email,
      availableLanguage: ['English'],
    },
  ],
  sameAs: Object.values(company.socials),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: company.url,
  name: company.brand,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${company.url}${item.path}`,
  })),
});

export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: typeof f.a === 'string' ? f.a : String(f.a) },
  })),
});

export const serviceSchema = ({ name, description, slug, price }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: name,
  description,
  url: `${company.url}/services/${slug}`,
  provider: { '@id': ORG_ID },
  areaServed: organizationSchema.areaServed,
  ...(price
    ? {
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NGN',
          price: price.NGN,
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: price.NGN,
            priceCurrency: 'NGN',
          },
          availability: 'https://schema.org/InStock',
          url: `${company.url}/services/${slug}`,
        },
      }
    : {}),
});

export const offerCatalogSchema = (tiers) => ({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Trovina pricing',
  url: `${company.url}/#pricing`,
  itemListElement: tiers.map((t) => ({
    '@type': 'Offer',
    name: `${t.name} plan`,
    description: t.summary,
    priceCurrency: 'NGN',
    price: t.price.NGN,
    seller: { '@id': ORG_ID },
  })),
});

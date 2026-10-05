import React from 'react';
import { Helmet } from 'react-helmet-async';
import { company } from '../constants/company';

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter card,
 * robots and JSON-LD. Pass `path` (e.g. "/about"), the canonical URL is
 * always built from the production domain.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = '/og-home.jpg',
  type = 'website',
  jsonLd = [],
  noindex = false,
}) {
  const url = `${company.url}${path === '/' ? '/' : path}`;
  const imageUrl = image.startsWith('http') ? image : `${company.url}${image}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.brand} />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.filter(Boolean).map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

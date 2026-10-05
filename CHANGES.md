# Site update, October 2026

## Company details
- All contact info lives in `src/constants/company.js` (address, phone, WhatsApp, hours, map links).
- Removed the US address, the +1 (212) placeholder number and every "US-based" claim.
- Legal name: Trovina Technologies Limited.

## Pricing
- All prices live in `src/constants/pricing.js` (plans, care plan, per-service "from" prices).
- Visitors on Nigerian time see NGN; everyone else sees USD. The toggle remembers their choice.
- If you change prices, also update the FAQ answer in `src/constants/siteContent.js` and `public/llms.txt` / `public/llms-full.txt`.

## Images
- Registry in `src/constants/images.js`. Unsplash photos shot in Lagos and Ota (free under the Unsplash License).
- Team cards show initials until you add real headshots: set `photo` for each person in `siteContent.js`.
- `public/video-thumbnail.jpg` (78 KB) replaces the 1.6 MB PNG on the About page. The PNG is kept.

## SEO
- `src/components/Seo.jsx` handles title, description, canonical, Open Graph, Twitter and JSON-LD per page.
- `src/lib/schema.js` builds Organization, WebSite, Service (with NGN offers), OfferCatalog, FAQPage and BreadcrumbList.
- `public/robots.txt` blocks `/admin/` and `/free-website-promo`, explicitly allows AI crawlers.
- `public/llms.txt` + `public/llms-full.txt` give AI assistants a plain-text summary.
- `public/sitemap.xml` regenerated with lastmod. Re-run `node generate-sitemap.js` when you add pages.
- `public/site.webmanifest` added. Admin and 404 pages are `noindex`.

## After deploying
1. Create or claim a **Google Business Profile** with exactly the same name, address and phone as `company.js`.
2. Submit `https://trovina.io/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Test a few URLs in Google's Rich Results Test.
4. Replace the anonymised testimonials and case studies with named clients when you can.

## Install note
`npm install --legacy-peer-deps` (react-helmet-async declares React ≤18 as a peer).

## Update 2 (October 2026)
- Brand purple now sampled from the logo: `#802FB5` to `#4D1077` (see `tailwind.config.js`). CTA band, featured price card and hero tile use the logo gradient.
- New logo mark extracted from the artboard with a transparent background: `public/logo-mark*.png`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `logo.png`. Previous files are kept in `public/_archive/`.
- "Tools we build with" is now a two-row logo slider. Logos are self-hosted in `public/tech/`; hover pauses it, reduced-motion users see a static layout.
- Team cards use the studio photos (Unsplash, face-cropped). Swap `photo` in `siteContent.js` for real headshots when ready.
- Testimonial avatars are illustrations in `public/avatars/`, based on "Avatar Illustration System" by Micah Lanier (CC BY 4.0), generated with DiceBear. Credit is on the Disclaimer page; keep it if you keep the avatars.
- Recent work: Hospital ERP (SaaS), HR management system (white label), fleet tracking system (web admin + mobile app).
- All em dashes removed from the site copy and code.

## Update 3
- Team cards use illustrated avatars (`public/team/`, same CC BY 4.0 illustration style as the testimonials). Set `photo` in `siteContent.js` to a real headshot URL to replace one.
- New "Industries we serve" section (`components/sections/Industries.jsx`) on Home and Services. Edit the list in `siteContent.js` (`industries`).

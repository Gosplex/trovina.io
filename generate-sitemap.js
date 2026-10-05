import { SitemapStream, streamToPromise } from 'sitemap'
import fs from 'fs'
import path from 'path'

/**
 * Regenerates public/sitemap.xml. Run with: node generate-sitemap.js
 * Add new public routes here. Admin pages and the ad landing page are
 * intentionally excluded (they are also blocked in robots.txt).
 */
const SITE_URL = 'https://trovina.io'
const today = new Date().toISOString().slice(0, 10)

const SERVICES = [
    'web-app-website-development',
    'mobile-app-development',
    'ai-automation-workflow-systems',
    'cloud-infrastructure-devops',
    'seo-growth-optimization',
    'branding-visual-identity',
    'graphics-creative-design',
    'video-editing-motion-content',
]

const pages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/services', changefreq: 'monthly', priority: 0.9 },
    ...SERVICES.map((slug) => ({ url: `/services/${slug}`, changefreq: 'monthly', priority: 0.8 })),
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'yearly', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'yearly', priority: 0.2 },
    { url: '/terms-of-service', changefreq: 'yearly', priority: 0.2 },
    { url: '/cookie-policy', changefreq: 'yearly', priority: 0.2 },
    { url: '/disclaimer', changefreq: 'yearly', priority: 0.2 },
]

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: SITE_URL })
    pages.forEach((p) => sitemap.write({ ...p, lastmod: today }))
    sitemap.end()

    const sitemapXML = await streamToPromise(sitemap)
    const outputPath = path.resolve('public', 'sitemap.xml')
    fs.writeFileSync(outputPath, sitemapXML.toString())
    console.log(`Sitemap generated at public/sitemap.xml (${pages.length} URLs)`)
}

generateSitemap()

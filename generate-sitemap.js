import { SitemapStream, streamToPromise } from 'sitemap'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://trovina.io'

const pages = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/services/mobile-app-development',
    '/services/web-app-website-development',
    '/services/ai-automation-workflow-systems',
    '/services/cloud-infrastructure-devops',
    '/services/seo-growth-optimization',
    '/services/branding-visual-identity',
    '/services/graphics-creative-design',
    '/services/video-editing-motion-content',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/disclaimer'
]

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: SITE_URL })

    pages.forEach((url) => {
        sitemap.write({
            url,
            changefreq: 'weekly',
            priority: url === '/' ? 1.0 : 0.8,
        })
    })

    sitemap.end()

    const sitemapXML = await streamToPromise(sitemap)
    const outputPath = path.resolve('public', 'sitemap.xml')

    fs.writeFileSync(outputPath, sitemapXML.toString())
    console.log('✅ Sitemap generated at public/sitemap.xml')
}

generateSitemap()

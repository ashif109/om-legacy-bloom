// seo-config.js
// Dynamic Meta Tags & Sitemap Generator

class SEOConfig {
    constructor() {
        this.siteUrl = "https://triyambakam.org";
        this.initDynamicMeta();
        this.initBreadcrumbSchema();
    }

    initDynamicMeta() {
        // Dynamically adjust meta description based on user intent & scroll
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > 500 && !this.metaUpdated) {
                document.querySelector('meta[name="description"]')
                    .setAttribute('content', 'Explore deep secrets of Sanatan Dharma and accurate Vedic Astrology predictions with Triyambkeshwar Nath Tyagi.');
                this.metaUpdated = true;
            }
        }, { passive: true });
    }

    initBreadcrumbSchema() {
        const breadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": this.siteUrl
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Vedic Astrology",
                "item": `${this.siteUrl}/astrology`
            }]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(breadcrumb);
        document.head.appendChild(script);
    }

    static generateRobotsTxt() {
        // Optimized to prevent bot crawl budget waste
        return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?
Sitemap: ${this.siteUrl}/sitemap.xml
Crawl-delay: 1`;
    }

    static generateSitemap(routes) {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        routes.forEach(route => {
            xml += `\n  <url>\n    <loc>${this.siteUrl}${route}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`;
        });
        xml += `\n</urlset>`;
        return xml;
    }
}

new SEOConfig();

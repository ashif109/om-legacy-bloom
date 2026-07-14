// link-building-automation.js
// Internal linking suggestions & related posts generator

class LinkAutomation {
    constructor() {
        this.keywordMap = {
            "kundli": "/kundli-analysis",
            "dharma": "/sanatan-dharma",
            "astrology": "/vedic-astrology",
            "karma": "/karma-theory"
        };
        this.autoLinkKeywords();
        this.generateRelatedPosts();
    }

    autoLinkKeywords() {
        // Auto-inject internal links on specific high-value keywords in articles
        const articles = document.querySelectorAll('article p');
        articles.forEach(p => {
            let html = p.innerHTML;
            Object.keys(this.keywordMap).forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
                html = html.replace(regex, `<a href="${this.keywordMap[keyword]}" class="auto-internal-link">$1</a>`);
            });
            p.innerHTML = html;
        });
    }

    generateRelatedPosts() {
        // Simulates fetching related content based on current page tags
        const relatedSection = document.createElement('div');
        relatedSection.className = 'related-posts';
        relatedSection.innerHTML = `
            <h3>Explore More Vedic Wisdom</h3>
            <ul>
                <li><a href="/vedic-astrology/navagraha">Understanding the Navagraha</a></li>
                <li><a href="/sanatan-dharma/daily-rituals">Daily Rituals for Students</a></li>
            </ul>
        `;
        const main = document.querySelector('main');
        if (main) main.appendChild(relatedSection);
    }
}

document.addEventListener('DOMContentLoaded', () => new LinkAutomation());

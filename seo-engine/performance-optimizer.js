// performance-optimizer.js
// Speed metrics, lazy loading, and cache busting (PageSpeed 95+ target)

class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initFontPreloader();
        this.trackCoreWebVitals();
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazyload');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.lazyload').forEach(img => imageObserver.observe(img));
        }
    }

    initFontPreloader() {
        // Dynamic font loading without render-blocking
        const fonts = ['Noto Sans Devanagari', 'Yatra One'];
        if ("fonts" in document) {
            fonts.forEach(font => {
                document.fonts.load(`1em "${font}"`).then(() => {
                    document.documentElement.classList.add(`${font.replace(/\s/g, '').toLowerCase()}-loaded`);
                });
            });
        }
    }

    trackCoreWebVitals() {
        // Track LCP, FID, CLS for Google Analytics
        if (window.PerformanceObserver) {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log(`[SEO Speed Metric] ${entry.name}: ${entry.startTime}`);
                    // Send to analytics endpoint here
                }
            }).observe({ type: 'largest-contentful-paint', buffered: true });
        }
    }
}

new PerformanceOptimizer();

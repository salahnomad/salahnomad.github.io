/**
 * START HERE V2 - Engagement Tracking for FAQ
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('🚀 Start Here V2 enhancements loading...');
    
    // Enhanced engagement tracking
    const trackEngagement = (element, action, metadata = {}) => {
        const trackId = element.getAttribute('data-track');
        const question = element.closest('.start-here-v2-faq-item')?.querySelector('h3')?.textContent;
        
        console.log(`🔍 Engagement: ${trackId || question} - ${action}`, metadata);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'start_here_v2_engagement', {
                'event_category': 'faq_interaction',
                'event_label': `${trackId || question}_${action}`,
                'value': metadata.value || 1,
                'question': question,
                'link_clicked': metadata.linkText || null
            });
        }
        
        // Send to your analytics if needed
        if (window.fetch) {
            fetch('/api/engagement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: 'start-here-v2',
                    action: action,
                    question: question,
                    metadata: metadata,
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.log('Analytics error:', err));
        }
    };
    
    // FAQ Link Tracking
    const faqLinks = document.querySelectorAll('.start-here-v2-faq-link');
    faqLinks.forEach(link => {
        link.setAttribute('data-track', 'faq_link_click');
        
        link.addEventListener('click', function(e) {
            const question = this.closest('.start-here-v2-faq-item')?.querySelector('h3')?.textContent;
            const linkText = this.textContent.trim();
            
            trackEngagement(this, 'faq_link_click', {
                question: question,
                linkText: linkText,
                href: this.href,
                value: 5 // Higher value for conversion actions
            });
        });
    });
    
    // FAQ Item Visibility Tracking (which questions users read)
    const faqItems = document.querySelectorAll('.start-here-v2-faq-item');
    
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const question = entry.target.querySelector('h3')?.textContent;
                trackEngagement(entry.target, 'faq_question_view', {
                    question: question,
                    viewTime: Date.now(),
                    value: 1
                });
                
                // Unobserve after first view to avoid duplicate tracking
                visibilityObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5, // 50% of question visible
        rootMargin: '0px 0px -100px 0px' // Track when scrolled into view
    });
    
    faqItems.forEach(item => {
        visibilityObserver.observe(item);
    });
    
    // Time on FAQ Section Tracking
    let faqSectionEnterTime = null;
    const faqSection = document.querySelector('.start-here-v2-faq');
    
    const faqSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                faqSectionEnterTime = Date.now();
            } else if (faqSectionEnterTime) {
                const timeSpent = Date.now() - faqSectionEnterTime;
                if (timeSpent > 2000) { // Only track if spent more than 2 seconds
                    trackEngagement(faqSection, 'faq_section_time', {
                        timeSpent: Math.round(timeSpent / 1000),
                        value: Math.min(10, Math.round(timeSpent / 5000)) // Cap at 10 points
                    });
                }
                faqSectionEnterTime = null;
            }
        });
    }, { threshold: 0.5 });
    
    if (faqSection) {
        faqSectionObserver.observe(faqSection);
    }
    
    // Existing card tracking (keep your existing code)
    const cards = document.querySelectorAll('.start-here-v2-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const primaryLink = card.querySelector('.start-here-v2-btn-primary');
                if (primaryLink) {
                    primaryLink.click();
                    trackEngagement(card, 'card_click');
                }
            }
        });
        
        card.addEventListener('mouseenter', () => {
            trackEngagement(card, 'card_hover');
        });
    });
    
    // Rest of your existing JavaScript...
    console.log('✅ Start Here V2 FAQ engagement tracking loaded');
});
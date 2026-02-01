/**
 * FAQ Page JavaScript - Engagement Tracking & UX Enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('📚 FAQ page enhancements loading...');
    
    // Track FAQ engagement
    const trackFAQEngagement = (action, question, metadata = {}) => {
        console.log(`🔍 FAQ Engagement: ${question} - ${action}`, metadata);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_page_engagement', {
                'event_category': 'faq_interaction',
                'event_label': `${question}_${action}`,
                'value': metadata.value || 1,
                'question': question
            });
        }
    };
    
    // Track which questions are viewed
    const faqQuestions = document.querySelectorAll('h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const question = entry.target.textContent.replace('Q: ', '').trim();
                trackFAQEngagement('question_viewed', question, {
                    viewTime: Date.now()
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    faqQuestions.forEach(question => {
        observer.observe(question);
    });
    
    // Track link clicks in FAQ
    const faqLinks = document.querySelectorAll('.faq-content a[href^="/"]');
    faqLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const question = this.closest('h3')?.textContent.replace('Q: ', '').trim() || 'quick_navigation';
            trackFAQEngagement('faq_link_click', question, {
                linkText: this.textContent.trim(),
                href: this.href,
                value: 5
            });
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ FAQ page enhancements loaded successfully');
});
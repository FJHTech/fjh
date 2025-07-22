/**
 * how-we-do-it.js - Enhanced animations and SVG handling for the How We Do It page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initPageAnimations();
    
    // Initialize SVG enhancements
    enhanceSVGs();
    
    // Initialize FAQ accordion functionality
    initFaqAccordion();
    
    // Initialize parallax effects
    initParallaxEffects();
});

/**
 * Initialize page animations with staggered reveal effects
 */
function initPageAnimations() {
    // Animate page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        setTimeout(() => {
            pageHeader.classList.add('animated');
        }, 100);
    }
    
    // Staggered animation for process steps
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        processSteps.forEach((step, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            step.classList.add('visible');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(step);
        });
    }
    
    // Staggered animation for approach cards
    const approachCards = document.querySelectorAll('.approach-card');
    if (approachCards.length > 0) {
        approachCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(card);
        });
    }
    
    // Animate CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaSection.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(ctaSection);
    }
}

/**
 * Enhance SVG elements for better visibility and animations
 */
function enhanceSVGs() {
    // Get all SVG containers
    const svgContainers = document.querySelectorAll('.svg-container');
    
    svgContainers.forEach(container => {
        // Find the SVG element
        const svg = container.querySelector('svg');
        if (!svg) return;
        
        // Ensure SVG is visible and properly sized
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', 'auto');
        svg.style.overflow = 'visible';
        
        // Enhance SVG inner elements
        const innerElements = svg.querySelectorAll('rect, path, circle, line, polygon');
        innerElements.forEach(element => {
            // Add vector-effect to ensure strokes scale properly
            element.setAttribute('vector-effect', 'non-scaling-stroke');
            
            // Add subtle animations to certain elements
            if (element.classList.contains('animate-pulse') || Math.random() > 0.7) {
                element.style.animation = `pulse ${2 + Math.random() * 3}s infinite alternate ease-in-out`;
            }
        });
    });
    
    // Add CSS for pulse animation if it doesn't exist
    if (!document.getElementById('svg-animations-style')) {
        const style = document.createElement('style');
        style.id = 'svg-animations-style';
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0.7; transform: scale(0.98); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items (optional - for accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize parallax effects for background elements
 */
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for page header
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.style.backgroundPosition = `center ${scrollPosition * 0.2}px`;
        }
        
        // Subtle parallax for process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            const offset = (index % 2 === 0) ? 0.05 : -0.05;
            step.style.transform = `translateY(${scrollPosition * offset}px)`;
        });
    });
}
/**
 * why-us.js - Enhanced animations and interactions for the Why Us page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initPageAnimations();
    
    // Initialize counter animations for statistics
    initCounterAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
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
    
    // Staggered animation for value cards
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length > 0) {
        valueCards.forEach((card, index) => {
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
    
    // Staggered animation for stat cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        statCards.forEach((card, index) => {
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
    
    // Staggered animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length > 0) {
        teamMembers.forEach((member, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            member.classList.add('visible');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(member);
        });
    }
    
    // Staggered animation for testimonials
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            testimonial.classList.add('visible');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(testimonial);
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
 * Initialize counter animations for statistics
 */
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetValue = parseInt(statNumber.getAttribute('data-value') || statNumber.textContent, 10);
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    const startValue = 0;
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const easedProgress = easeOutQuart(progress);
                        const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
                        
                        statNumber.textContent = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            statNumber.textContent = targetValue.toLocaleString();
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statNumber);
    });
}

/**
 * Easing function for smooth counter animation
 */
function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.classList.add('hovered');
        });
        
        member.addEventListener('mouseleave', () => {
            member.classList.remove('hovered');
        });
    });
    
    // Value card hover effects
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });
    
    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
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
        
        // Subtle parallax for value cards
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach((card, index) => {
            const offset = (index % 2 === 0) ? 0.05 : -0.05;
            card.style.transform = `translateY(${scrollPosition * offset}px)`;
        });
    });
}
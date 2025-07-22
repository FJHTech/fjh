// Specific JavaScript for the What We Do page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced animations for the What We Do page
    initWhatWeDoAnimations();
    
    // Add parallax effect to the background
    initParallaxBackground();
    
    // Add hover effects to service items
    initServiceItemEffects();
});

// Function to initialize enhanced animations
function initWhatWeDoAnimations() {
    // Add staggered animation to service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length) {
        // Create observer options
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        // Create observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay based on the index
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe each service item
        serviceItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Add enhanced animation to the page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        setTimeout(() => {
            pageHeader.classList.add('animated');
        }, 300);
    }
}

// Function to add parallax effect to the background
function initParallaxBackground() {
    const pageHeader = document.querySelector('.page-header');
    const servicesSection = document.querySelector('.services-section');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Parallax effect for page header
        if (pageHeader) {
            const headerOffset = pageHeader.offsetTop;
            const headerParallax = (scrollTop - headerOffset) * 0.4;
            pageHeader.style.backgroundPositionY = `${headerParallax}px`;
        }
        
        // Parallax effect for services section
        if (servicesSection) {
            const sectionOffset = servicesSection.offsetTop;
            const sectionParallax = (scrollTop - sectionOffset) * 0.2;
            servicesSection.style.backgroundPositionY = `${sectionParallax}px`;
        }
    });
}

// Function to add hover effects to service items
function initServiceItemEffects() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add a subtle scale effect to the icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
            
            // Add a subtle color shift to the heading
            const heading = this.querySelector('h3');
            if (heading) {
                heading.style.color = 'var(--secondary-color)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset the icon scale
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            
            // Reset the heading color
            const heading = this.querySelector('h3');
            if (heading) {
                heading.style.color = 'var(--primary-color)';
            }
        });
    });
}

// Add a subtle animation to the CTA section when it comes into view
function initCtaAnimation() {
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaSection.classList.add('animated');
                    observer.unobserve(ctaSection);
                }
            });
        }, options);
        
        observer.observe(ctaSection);
    }
}

// Initialize CTA animation
document.addEventListener('DOMContentLoaded', initCtaAnimation);
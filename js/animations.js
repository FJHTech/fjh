// Animations JavaScript for FJH - Future Junction of High Tech

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Function to initialize animations that should run on page load
function initAnimations() {
    // Add visible class to elements with fade-in, slide-up, etc. classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-right, .slide-in-left');
    
    setTimeout(() => {
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
}

// Function to initialize scroll-based animations using Intersection Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll, .fade-in:not(.visible), .slide-up:not(.visible), .slide-in-right:not(.visible), .slide-in-left:not(.visible), .scale-in:not(.visible), .stagger-in:not(.visible)');
    
    // Create observer options
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element must be visible
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, options);
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero section
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', initParallax);

// Counter animation for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration') || 2000);
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counters
document.addEventListener('DOMContentLoaded', initCounters);

// Typing animation
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation when element is in view
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        observer.observe(element);
    });
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Reveal animation
function initRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', initRevealAnimation);

// Animate numbers on scroll
function animateNumbers() {
    const numberElements = document.querySelectorAll('.animate-number');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalNumber = parseInt(element.dataset.number);
                const duration = parseInt(element.dataset.duration || 2000);
                const increment = finalNumber / (duration / 16);
                
                let currentNumber = 0;
                const updateNumber = () => {
                    if (currentNumber < finalNumber) {
                        currentNumber += increment;
                        element.textContent = Math.ceil(currentNumber);
                        requestAnimationFrame(updateNumber);
                    } else {
                        element.textContent = finalNumber;
                    }
                };
                
                updateNumber();
                observer.unobserve(element);
            }
        });
    }, options);
    
    numberElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize number animations
document.addEventListener('DOMContentLoaded', animateNumbers);
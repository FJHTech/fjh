/**
 * contact.js - Enhanced animations and form handling for the Contact Us page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initPageAnimations();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize map interactions
    initMapInteractions();
    
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
    
    // Animate contact info section
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactInfo.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(contactInfo);
    }
    
    // Animate form container
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    formContainer.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(formContainer);
    }
    
    // Staggered animation for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems.length > 0) {
        contactItems.forEach((item, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(item);
        });
    }
    
    // Staggered animation for social links
    const socialLinks = document.querySelectorAll('.social-links-contact a');
    if (socialLinks.length > 0) {
        socialLinks.forEach((link, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            link.classList.add('visible');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(link);
        });
    }
    
    // Staggered animation for form groups
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length > 0) {
        formGroups.forEach((group, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            group.classList.add('visible');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(group);
        });
    }
    
    // Animate map container
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mapContainer.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(mapContainer);
    }
    
    // Staggered animation for office cards
    const officeCards = document.querySelectorAll('.office-card');
    if (officeCards.length > 0) {
        officeCards.forEach((card, index) => {
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
}

/**
 * Initialize form validation and submission handling
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateInput(input);
        });
        
        // Add input validation
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all inputs
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            // Collect form data
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value.trim(),
                email: contactForm.querySelector('input[name="email"]').value.trim(),
                phone: contactForm.querySelector('input[name="phone"]').value.trim(),
                subject: contactForm.querySelector('input[name="subject"]').value.trim(),
                message: contactForm.querySelector('textarea[name="message"]').value.trim()
            };

            fetch("https://formspree.io/f/mwpqvkgn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                `;
            })
            // Simulate API call with timeout
            setTimeout(() => {
                // Replace form with success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                `;
            }, 1500);
        }
    });
}

/**
 * Validate individual form input
 */
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } 
    // Validate email format
    else if (input.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Validate phone format (optional field)
    else if (input.id === 'phone' && value !== '') {
        const phonePattern = /^[\d\+\-\(\)\s]{7,20}$/;
        if (!phonePattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Add or remove error class
    if (isValid) {
        input.classList.remove('error');
    } else {
        input.classList.add('error');
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        input.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

/**
 * Initialize map interactions
 */
function initMapInteractions() {
    // Add a subtle zoom effect when map comes into view
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mapContainer.classList.add('map-loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(mapContainer);
    }
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
        
        // Subtle parallax for office cards
        const officeCards = document.querySelectorAll('.office-card');
        officeCards.forEach((card, index) => {
            const offset = (index % 2 === 0) ? 0.05 : -0.05;
            card.style.transform = `translateY(${scrollPosition * offset}px)`;
        });
    });
}
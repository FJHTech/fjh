// Main JavaScript for FJH - Future Junction of High Tech

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active Navigation Link
    const currentLocation = location.href;
    const navLinks2 = document.querySelectorAll('nav a');
    const navLength = navLinks2.length;
    
    for (let i = 0; i < navLength; i++) {
        if (navLinks2[i].href === currentLocation) {
            navLinks2[i].classList.add('active');
        }
    }
    
    // Service Card Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!nameField.value.trim()) {
                showError(nameField, 'Name is required');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            if (!emailField.value.trim()) {
                showError(emailField, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                showError(emailField, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            if (!messageField.value.trim()) {
                showError(messageField, 'Message is required');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If valid, show success message (in a real app, you would submit the form)
            if (isValid) {
                const formContainer = document.querySelector('.form-container');
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for your message!</h3>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for form validation
    function showError(field, message) {
        // Remove any existing error
        removeError(field);
        
        // Add error class to the field
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function removeError(field) {
        // Remove error class from the field
        field.classList.remove('error');
        
        // Remove any existing error message
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize service tabs if they exist (for services page)
    initServiceTabs();
});

// Service Tabs Function
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        // Show the first tab by default
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                button.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });
    }
}

// FAQ Accordion (for How We Do It page)
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle current item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Call FAQ Accordion function when DOM is loaded
document.addEventListener('DOMContentLoaded', initFaqAccordion);
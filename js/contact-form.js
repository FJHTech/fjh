/**
 * Contact Form Handling
 * FJH - Future Junction of High Tech
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Initialize the contact form with validation and submission handling
 * @param {HTMLFormElement} form - The contact form element
 */
function initContactForm(form) {
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Add event listeners for real-time validation
    nameField.addEventListener('blur', () => validateField(nameField, isNotEmpty));
    emailField.addEventListener('blur', () => validateField(emailField, isValidEmail));
    phoneField.addEventListener('blur', () => validateField(phoneField, isValidPhoneOrEmpty));
    subjectField.addEventListener('blur', () => validateField(subjectField, isNotEmpty));
    messageField.addEventListener('blur', () => validateField(messageField, isNotEmpty));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        const nameValid = validateField(nameField, isNotEmpty);
        const emailValid = validateField(emailField, isValidEmail);
        const phoneValid = validateField(phoneField, isValidPhoneOrEmpty);
        const subjectValid = validateField(subjectField, isNotEmpty);
        const messageValid = validateField(messageField, isNotEmpty);
        
        if (nameValid && emailValid && phoneValid && subjectValid && messageValid) {
            submitForm(form);
        }
    });
}

/**
 * Validate a form field using the provided validation function
 * @param {HTMLElement} field - The field to validate
 * @param {Function} validationFn - The validation function to use
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, validationFn) {
    // Remove any existing error message
    removeErrorMessage(field);
    
    // Validate the field
    const isValid = validationFn(field.value);
    
    if (!isValid) {
        // Add error class and message
        field.classList.add('error');
        
        // Create error message based on field type
        let errorMessage = 'This field is required';
        
        if (field.id === 'email' && field.value.trim() !== '') {
            errorMessage = 'Please enter a valid email address';
        } else if (field.id === 'phone' && field.value.trim() !== '') {
            errorMessage = 'Please enter a valid phone number';
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        field.parentNode.appendChild(errorElement);
    } else {
        // Remove error class
        field.classList.remove('error');
    }
    
    return isValid;
}

/**
 * Remove error message from a field
 * @param {HTMLElement} field - The field to remove error from
 */
function removeErrorMessage(field) {
    // Remove error class
    field.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
}

/**
 * Check if a value is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - Whether the value is not empty
 */
function isNotEmpty(value) {
    return value.trim() !== '';
}

/**
 * Check if an email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if a phone number is valid or empty
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid or empty
 */
function isValidPhoneOrEmpty(phone) {
    if (phone.trim() === '') {
        return true; // Phone is optional
    }
    
    // Basic phone validation (can be adjusted based on requirements)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

/**
 * Submit the contact form
 * @param {HTMLFormElement} form - The form to submit
 */
function submitForm(form) {
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll simulate a server response after a delay
    setTimeout(() => {
        // Hide the form
        form.style.display = 'none';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We'll get back to you shortly.</p>
        `;
        
        form.parentNode.appendChild(successMessage);
        
        // Reset form for future use (though it's hidden now)
        form.reset();
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Log the form data (for demo purposes)
        console.log('Form submitted with data:', formData);
    }, 1500);
}
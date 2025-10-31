// ===== CONTACT FORM WITH EMAILJS INTEGRATION =====

// EmailJS configuration
const emailjsConfig = {
    serviceID: 'service_professionalweld', // Replace with your EmailJS service ID
    templateID: 'template_contact_form',   // Replace with your EmailJS template ID
    publicKey: 'your_public_key_here'      // Replace with your EmailJS public key
};

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initEmailJS();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    // Add form validation
    initFormValidation();
    
    // Add form submission handler
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    console.log('Contact form initialized successfully');
}

function initEmailJS() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailjsConfig.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS library not loaded');
    }
}

function initFormValidation() {
    // Custom validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/,
            message: 'Imię i nazwisko musi zawierać tylko litery (2-50 znaków)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Podaj poprawny adres email'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[0-9\s\-\(\)]{9,15}$/,
            message: 'Podaj poprawny numer telefonu'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Wiadomość musi mieć od 10 do 1000 znaków'
        },
        privacy: {
            required: true,
            message: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych'
        }
    };
    
    window.contactFormValidation = validationRules;
}

function validateField(event) {
    const field = event.target;
    const fieldName = field.name;
    const rules = window.contactFormValidation[fieldName];
    
    if (!rules) return true;
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'To pole jest wymagane';
    }
    
    // Length validation
    if (isValid && value && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum ${rules.minLength} znaków`;
    }
    
    if (isValid && value && rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Maksimum ${rules.maxLength} znaków`;
    }
    
    // Pattern validation
    if (isValid && value && rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message || 'Niepoprawny format';
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && rules.required && !field.checked) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Show/hide error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError({ target: field });
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert after the field or its wrapper
    const insertAfter = field.type === 'checkbox' ? field.closest('.checkbox-group') : field;
    insertAfter.parentNode.insertBefore(errorElement, insertAfter.nextSibling);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const fields = form.querySelectorAll('input[name], select[name], textarea[name]');
    let isValid = true;
    
    fields.forEach(field => {
        const fieldValid = validateField({ target: field });
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Validate form
    if (!validateForm()) {
        showContactNotification('Proszę poprawić błędy w formularzu', 'error');
        return;
    }
    
    // Disable submit button and show loading
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';
    
    try {
        // Collect form data
        const formData = collectFormData(form);
        
        // Send email
        await sendEmailJS(formData);
        
        // Success handling
        showContactNotification('Wiadomość została wysłana pomyślnie! Odpowiemy w ciągu 24 godzin.', 'success');
        
        // Reset form
        form.reset();
        
        // Optional: Track form submission
        trackFormSubmission(formData);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showContactNotification('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.', 'error');
    } finally {
        // Restore button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add timestamp and additional info
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer;
    
    return data;
}

async function sendEmailJS(formData) {
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
    }
    
    // Prepare template parameters
    const templateParams = {
        to_name: 'ProfessionalWeld',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Nie podano',
        service: formData.service || 'Nie wybrano',
        message: formData.message,
        timestamp: new Date().toLocaleString('pl-PL'),
        reply_to: formData.email
    };
    
    // Send email via EmailJS
    const response = await emailjs.send(
        emailjsConfig.serviceID,
        emailjsConfig.templateID,
        templateParams
    );
    
    if (response.status !== 200) {
        throw new Error(`EmailJS error: ${response.status}`);
    }
    
    return response;
}

function sendFallbackEmail(formData) {
    // Fallback method using mailto
    const subject = encodeURIComponent(`Zapytanie ze strony: ${formData.service || 'Ogólne'}`);
    const body = encodeURIComponent(`
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone || 'Nie podano'}
Rodzaj usługi: ${formData.service || 'Nie wybrano'}

Wiadomość:
${formData.message}

---
Wysłano ze strony www.professionalweld.pl
Data: ${new Date().toLocaleString('pl-PL')}
    `);
    
    const mailtoUrl = `mailto:biuro@professionalweld.pl?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
    
    return Promise.resolve();
}

function showContactNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.contact-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `contact-notification contact-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to contact section
    const contactSection = document.getElementById('contact');
    contactSection.insertBefore(notification, contactSection.firstChild);
    
    // Show notification with animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide success notifications
    if (type === 'success') {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 8000);
    }
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function trackFormSubmission(formData) {
    // Google Analytics tracking (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: formData.service || 'General',
            value: 1
        });
    }
    
    // Console log for development
    console.log('Form submitted:', {
        service: formData.service,
        timestamp: formData.timestamp,
        hasPhone: !!formData.phone
    });
}

// Enhanced form features
function initEnhancedFeatures() {
    // Character counter for message field
    initCharacterCounter();
    
    // Auto-suggest for service field
    initServiceAutoSuggest();
    
    // Phone number formatting
    initPhoneFormatting();
}

function initCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.innerHTML = `<span class="current">0</span>/${maxLength}`;
    
    messageField.parentNode.appendChild(counter);
    
    messageField.addEventListener('input', function() {
        const currentLength = this.value.length;
        const currentSpan = counter.querySelector('.current');
        currentSpan.textContent = currentLength;
        
        // Change color based on length
        if (currentLength > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
        
        if (currentLength > maxLength) {
            counter.classList.add('error');
        } else {
            counter.classList.remove('error');
        }
    });
}

function initPhoneFormatting() {
    const phoneField = document.getElementById('phone');
    if (!phoneField) return;
    
    phoneField.addEventListener('input', function() {
        // Simple phone formatting for Polish numbers
        let value = this.value.replace(/\D/g, '');
        
        if (value.startsWith('48')) {
            value = '+' + value;
        } else if (value.length === 9) {
            value = '+48 ' + value;
        }
        
        this.value = value;
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initEnhancedFeatures, 100);
});

// Add CSS styles for contact form enhancements
const contactStyles = `
    .field-error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .error {
        border-color: #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.05) !important;
    }
    
    .character-counter {
        text-align: right;
        font-size: 0.8rem;
        color: var(--gray-500);
        margin-top: 0.25rem;
    }
    
    .character-counter.warning {
        color: var(--accent-color);
    }
    
    .character-counter.error {
        color: #e74c3c;
    }
    
    .contact-notification {
        background: white;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
        border-left: 4px solid var(--primary-color);
    }
    
    .contact-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .contact-notification-success {
        border-left-color: #27ae60;
        background: rgba(39, 174, 96, 0.05);
    }
    
    .contact-notification-error {
        border-left-color: #e74c3c;
        background: rgba(231, 76, 60, 0.05);
    }
    
    .contact-notification-warning {
        border-left-color: #f39c12;
        background: rgba(243, 156, 18, 0.05);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--gray-500);
        padding: 0.25rem;
        border-radius: var(--border-radius-sm);
        transition: all var(--transition-fast);
    }
    
    .notification-close:hover {
        background: var(--gray-200);
        color: var(--gray-700);
    }
    
    .contact-form button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .contact-form button[disabled]:hover {
        transform: none;
    }
`;

// Inject contact styles
const contactStyleSheet = document.createElement('style');
contactStyleSheet.textContent = contactStyles;
document.head.appendChild(contactStyleSheet);

// Export functions for external use
window.contactForm = {
    validate: validateForm,
    submit: handleFormSubmission,
    showNotification: showContactNotification
};

console.log('Contact.js loaded successfully');
// ===== MAIN JAVASCRIPT FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initPortfolio();
    initBackToTop();
    initReviews();
    initLoadingSpinner();
    
    console.log('ProfessionalWeld website loaded successfully');
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', highlightActiveNavigation);
}

function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.service-card, .value-item, .portfolio-item, .review-card, .contact-item'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Counter animation for statistics (if added)
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== PORTFOLIO =====
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    // Portfolio data
    const portfolioItems = [
        {
            id: 1,
            title: 'Konstrukcja stalowa hali przemysłowej',
            category: 'konstrukcje',
            image: 'images/gallery/konstrukcja-placeholder.svg',
            description: 'Kompletna konstrukcja stalowa hali o powierzchni 1200m²'
        },
        {
            id: 2,
            title: 'Balustrada ze stali nierdzewnej',
            category: 'balustrady',
            image: 'images/gallery/balustrada-placeholder.svg',
            description: 'Elegancka balustrada wewnętrzna ze stali nierdzewnej'
        },
        {
            id: 3,
            title: 'Brama wjazdowa automatyczna',
            category: 'bramy',
            image: 'images/gallery/brama-placeholder.svg',
            description: 'Brama przesuwna z automatyką i kontrolą dostępu'
        },
        {
            id: 4,
            title: 'Profesjonalne urządzenia spawalnicze',
            category: 'przemysl',
            image: 'images/gallery/welding-equipment.png',
            description: 'Nowoczesne maszyny spawalnicze do precyzyjnych prac'
        },
        {
            id: 5,
            title: 'Konstrukcja dachu stalowego',
            category: 'konstrukcje',
            image: 'images/gallery/konstrukcja-placeholder.svg',
            description: 'Konstrukcja nośna dachu dla centrum logistycznego'
        },
        {
            id: 6,
            title: 'Balustrada zewnętrzna',
            category: 'balustrady',
            image: 'images/gallery/balustrada-placeholder.svg',
            description: 'Balustrada tarasu z elementami dekoracyjnymi'
        },
        {
            id: 7,
            title: 'Brama garażowa dwuskrzydłowa',
            category: 'bramy',
            image: 'images/gallery/brama-placeholder.svg',
            description: 'Brama garażowa z napędem elektrycznym'
        },
        {
            id: 8,
            title: 'Zbiornik przemysłowy',
            category: 'przemysl',
            image: 'images/gallery/przemysl-placeholder.svg',
            description: 'Zbiornik na chemikalia o pojemności 5000L'
        }
    ];

    // Render portfolio items
    function renderPortfolio(items) {
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioElement = createPortfolioElement(item);
            portfolioGrid.appendChild(portfolioElement);
        });
    }

    // Create portfolio item element
    function createPortfolioElement(item) {
        const div = document.createElement('div');
        div.className = `portfolio-item ${item.category}`;
        
        // Create better fallback SVG
        const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ecf0f1;stop-opacity:1" /><stop offset="100%" style="stop-color:%23bdc3c7;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23grad)"/><circle cx="200" cy="120" r="30" fill="%23ff6b35" opacity="0.8"/><rect x="150" y="150" width="100" height="60" fill="%2334495e" opacity="0.7"/><rect x="0" y="250" width="400" height="50" fill="rgba(0,0,0,0.7)"/><text x="200" y="280" text-anchor="middle" fill="%23ffffff" font-family="Arial, sans-serif" font-weight="bold" font-size="16">${encodeURIComponent(item.title)}</text></svg>`;
        
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image" 
                 onerror="this.src='${fallbackSvg}'; this.classList.add('fallback-image');">
            <div class="portfolio-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        // Add loading state
        const img = div.querySelector('.portfolio-image');
        
        // Start with opacity 0, show when loaded
        img.style.opacity = '0';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '1';
            this.classList.add('fallback-image');
            console.log(`Portfolio image failed to load: ${item.image}`);
        });
        
        // Add click handler for lightbox
        div.addEventListener('click', () => openLightbox(item));
        
        return div;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            const filteredItems = filter === 'all' 
                ? portfolioItems 
                : portfolioItems.filter(item => item.category === filter);
            
            renderPortfolio(filteredItems);
        });
    });

    // Initial render
    renderPortfolio(portfolioItems);
}

// Simple lightbox function
function openLightbox(item) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${item.image}" alt="${item.title}" class="lightbox-image">
            <div class="lightbox-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
    }
    
    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== REVIEWS =====
function initReviews() {
    loadReviews();
}

async function loadReviews() {
    try {
        const response = await fetch('data/reviews.json');
        const reviews = await response.json();
        renderReviews(reviews);
    } catch (error) {
        console.log('Reviews data not found, using fallback data');
        // Fallback reviews data
        const fallbackReviews = [
            {
                name: 'Jan Kowalski',
                rating: 5,
                text: 'Profesjonalna obsługa i wysokiej jakości spawanie. Balustrada wykonana perfekcyjnie, polecam!',
                date: '2024-10-15',
                service: 'Balustrady'
            },
            {
                name: 'Anna Nowak',
                rating: 5,
                text: 'Szybka realizacja projektu bramy. Bardzo solidne wykonanie i konkurencyjna cena.',
                date: '2024-10-10',
                service: 'Bramy'
            },
            {
                name: 'Marek Wiśniewski',
                rating: 5,
                text: 'Konstrukcja stalowa wykonana zgodnie z projektem. Terminowo i profesjonalnie.',
                date: '2024-09-28',
                service: 'Konstrukcje stalowe'
            }
        ];
        renderReviews(fallbackReviews);
    }
}

function renderReviews(reviews) {
    const reviewsGrid = document.getElementById('reviews-grid');
    
    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">
                    ${review.name.charAt(0)}
                </div>
                <div class="review-info">
                    <h5>${review.name}</h5>
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-meta">
                <small>Usługa: ${review.service} | ${formatDate(review.date)}</small>
            </div>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===== LOADING SPINNER =====
function initLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    
    // Show spinner for API calls or heavy operations
    window.showSpinner = function() {
        spinner.classList.add('active');
    };
    
    window.hideSpinner = function() {
        spinner.classList.remove('active');
    };
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add throttled scroll listener for better performance
window.addEventListener('scroll', throttle(function() {
    highlightActiveNavigation();
}, 100));

// ===== CSS FOR LIGHTBOX =====
// Add dynamic styles for lightbox
const lightboxStyles = `
    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        animation: slideIn 0.3s ease;
    }
    
    .lightbox-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
    }
    
    .lightbox-info {
        padding: 1rem;
    }
    
    .lightbox-info h3 {
        margin-bottom: 0.5rem;
        color: var(--secondary-color);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .review-meta {
        margin-top: 1rem;
        color: var(--gray-500);
        font-size: 0.85rem;
    }
`;

// Inject lightbox styles
const style = document.createElement('style');
style.textContent = lightboxStyles;
document.head.appendChild(style);

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Focus management for better accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.nav-link')) {
        e.target.classList.add('focused');
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.nav-link')) {
        e.target.classList.remove('focused');
    }
});

console.log('ProfessionalWeld main.js loaded successfully');
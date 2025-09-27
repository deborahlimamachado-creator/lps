// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Update aria-expanded
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Animate hamburger lines
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            if (navMenu.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = '';
                lines[1].style.opacity = '1';
                lines[2].style.transform = '';
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = '';
                lines[1].style.opacity = '1';
                lines[2].style.transform = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = '';
                lines[1].style.opacity = '1';
                lines[2].style.transform = '';
            }
        });
    }
});

// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission();
            }
        });
        
        // Real-time validation on input blur
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateForm() {
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Por favor, digite seu nome');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            showError(phone, 'Por favor, digite seu telefone');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Digite um telefone válido (ex: (16) 99999-9999)');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Por favor, digite seu e-mail');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Digite um e-mail válido');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Por favor, digite sua mensagem');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        switch (field.id) {
            case 'name':
                if (!value) {
                    showError(field, 'Por favor, digite seu nome');
                    isValid = false;
                } else if (value.length < 2) {
                    showError(field, 'Nome deve ter pelo menos 2 caracteres');
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (!value) {
                    showError(field, 'Por favor, digite seu telefone');
                    isValid = false;
                } else if (!isValidPhone(value)) {
                    showError(field, 'Digite um telefone válido (ex: (16) 99999-9999)');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    showError(field, 'Por favor, digite seu e-mail');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showError(field, 'Digite um e-mail válido');
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    showError(field, 'Por favor, digite sua mensagem');
                    isValid = false;
                } else if (value.length < 10) {
                    showError(field, 'Mensagem deve ter pelo menos 10 caracteres');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.setAttribute('aria-invalid', 'true');
        field.style.borderColor = 'var(--error)';
    }
    
    function clearFieldError(field) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.removeAttribute('aria-invalid');
        field.style.borderColor = '';
    }
    
    function clearErrors() {
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.removeAttribute('aria-invalid');
            input.style.borderColor = '';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Accept various phone formats
        const phoneRegex = /^(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/;
        return phoneRegex.test(phone.replace(/\D/g, '').length >= 10);
    }
    
    function simulateFormSubmission() {
        const submitButton = contactForm.querySelector('.form-submit');
        const successMessage = document.getElementById('form-success');
        
        // Disable submit button and show loading
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // Reset form
            contactForm.reset();
            
            // Reset submit button
            submitButton.textContent = 'Enviar mensagem';
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
            
        }, 2000);
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy loading images enhancement
document.addEventListener('DOMContentLoaded', function() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        document.head.appendChild(script);
        
        script.onload = function() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        };
    }
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Animation on scroll (simple implementation)
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.news-card, .pillar-card, .demand-card, .campaign-card, .contact-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
    
    // CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Google Sheets integration placeholder
// This section would be used to integrate with Google Sheets for dynamic content
// Example implementation for news/actions updates:

/*
async function loadNewsFromGoogleSheets() {
    // This is a placeholder for Google Sheets integration
    // You would replace this with actual Google Sheets API calls
    
    try {
        // Example API call structure:
        // const response = await fetch('GOOGLE_SHEETS_API_URL');
        // const data = await response.json();
        
        // For now, we'll use static content already in HTML
        console.log('Google Sheets integration ready - replace with actual API calls');
        
        // Example of how you might update the news grid:
        // updateNewsGrid(data);
        
    } catch (error) {
        console.error('Error loading data from Google Sheets:', error);
        // Fall back to static content already in HTML
    }
}

function updateNewsGrid(newsData) {
    // This function would update the news grid with data from Google Sheets
    const newsGrid = document.querySelector('.news-grid');
    
    if (newsGrid && newsData) {
        // Clear existing content except the "Faça parte também!" card
        const specialCard = newsGrid.querySelector('.special-card');
        newsGrid.innerHTML = '';
        
        // Add news cards from Google Sheets data
        newsData.forEach(news => {
            const newsCard = createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });
        
        // Re-add the special card at the end
        if (specialCard) {
            newsGrid.appendChild(specialCard);
        }
    }
}

function createNewsCard(newsItem) {
    const card = document.createElement('article');
    card.className = 'news-card';
    
    card.innerHTML = `
        <img src="${newsItem.image || 'https://via.placeholder.com/400x200'}" 
             alt="${newsItem.altText || newsItem.title}" 
             class="news-image" loading="lazy">
        <div class="news-content">
            <h3 class="news-title">${newsItem.title}</h3>
            <p class="news-text">${newsItem.description}</p>
            <div class="news-meta">
                <span class="news-location">${newsItem.location || 'Local não informado'}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Uncomment the line below when you're ready to implement Google Sheets integration
// loadNewsFromGoogleSheets();
*/

// Performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    // Monitor page performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                
                // You could send this data to analytics
                // gtag('event', 'page_load_time', {
                //     value: Math.round(perfData.loadEventEnd - perfData.fetchStart)
                // });
            }, 0);
        });
    }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.setAttribute('data-focus-visible', '');
        });
        
        element.addEventListener('blur', function() {
            this.removeAttribute('data-focus-visible');
        });
    });
    
    // Enhanced keyboard navigation for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Trap focus in mobile menu when open
        navMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileMenuToggle.click();
                mobileMenuToggle.focus();
            }
        });
    }
});

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to a service here
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
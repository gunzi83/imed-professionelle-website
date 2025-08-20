/**
 * imed2230 - Dr. Gunter Riedmüller Website JavaScript
 * Medical Practice Website Interactive Features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('imed2230 Website loaded successfully');
    
    // Initialize all interactive features
    initializeRippleEffects();
    initializeSmoothScrolling();
    initializeFloatingActionButton();
    initializeTerminButtons();
    initializeMobileMenu();
    initializeScrollHeader();
    initializeServiceAccordions();
    
    console.log('All interactive features initialized');
});

/**
 * Ripple Effect for Modern Buttons
 */
function initializeRippleEffects() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            // Ensure button has relative positioning
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Floating Action Button Functionality
 */
function initializeFloatingActionButton() {
    const fab = document.getElementById('fab-termin');
    if (fab) {
        fab.addEventListener('click', function() {
            // Scroll to contact section or show appointment modal
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Add bounce animation
            fab.style.animation = 'bounce 0.5s';
            setTimeout(() => {
                fab.style.animation = '';
            }, 500);
        });
        
        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.visibility = 'visible';
            } else {
                fab.style.opacity = '0';
                fab.style.visibility = 'hidden';
            }
        });
    }
}

/**
 * Termin (Appointment) Button Functionality
 */
function initializeTerminButtons() {
    const terminButtons = document.querySelectorAll('[data-action="termin"], .btn-primary-modern');
    
    terminButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demo purposes, show alert - in production, integrate with booking system
            if (this.textContent.includes('Termin') || this.textContent.includes('Online')) {
                e.preventDefault();
                showAppointmentInfo();
            }
        });
    });
}

/**
 * Show Appointment Information
 */
function showAppointmentInfo() {
    const modal = createInfoModal(
        'Online Terminvereinbarung',
        `
        <div class="text-left">
            <p class="mb-4">Für die Terminvereinbarung kontaktieren Sie uns bitte:</p>
            <div class="space-y-2">
                <p><strong>📞 Telefon:</strong> <a href="tel:0228252827" class="text-blue-600 hover:underline">02282-52827</a></p>
                <p><strong>✉️ E-Mail:</strong> <a href="mailto:office@imed2230.at" class="text-blue-600 hover:underline">office@imed2230.at</a></p>
                <p><strong>🕒 Ordinationszeiten:</strong></p>
                <ul class="ml-4 space-y-1 text-sm">
                    <li>Montag: 10:00 - 12:00, 13:00 - 16:00</li>
                    <li>Dienstag: 08:00 - 12:00, 13:00 - 16:00</li>
                    <li>Mittwoch: 08:00 - 12:00</li>
                    <li>Donnerstag: 10:00 - 12:00, 13:00 - 14:00</li>
                    <li>Fr, Sa, So: Geschlossen</li>
                </ul>
                <p class="mt-2 text-sm"><strong>Termine nur nach Vereinbarung</strong></p>
            </div>
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800">💡 <strong>Tipp:</strong> Bitte bringen Sie Ihre e-card und eventuelle Vorbefunde mit.</p>
            </div>
        </div>
        `
    );
    document.body.appendChild(modal);
}

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    // Mobile menu functionality is handled by toggleMobileMenu function
    // Add smooth scrolling for mobile navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when a link is clicked
            const mobileMenu = document.getElementById('mobile-menu');
            const menuButton = document.getElementById('mobile-menu-button');
            if (mobileMenu && menuButton) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                updateMenuIcon(false);
            }
        });
    });
}

/**
 * Toggle Mobile Menu Function
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu && menuButton) {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuButton.setAttribute('aria-expanded', 'true');
            updateMenuIcon(true);
        } else {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
            updateMenuIcon(false);
        }
    }
}

/**
 * Update Menu Icon
 */
function updateMenuIcon(isOpen) {
    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
        if (isOpen) {
            menuIcon.className = 'fas fa-times text-xl';
        } else {
            menuIcon.className = 'fas fa-bars text-xl';
        }
    }
}

/**
 * Initialize Service Accordion Functionality
 */
function initializeServiceAccordions() {
    const serviceHeaders = document.querySelectorAll('.service-header[data-service]');
    
    serviceHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            toggleService(serviceId);
        });
        
        // Add keyboard support
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const serviceId = this.getAttribute('data-service');
                toggleService(serviceId);
            }
        });
        
        // Make focusable
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-label', 'Klicken Sie um Details zu sehen');
    });
    
    console.log('Service accordions initialized:', serviceHeaders.length);
    
    // Make toggleService globally available for onclick handlers
    window.toggleService = toggleService;
}

/**
 * Toggle Service Details Function - Simple and Reliable
 */
function toggleService(serviceId) {
    console.log('Toggling service:', serviceId);
    
    const serviceDetails = document.getElementById(serviceId);
    const icon = document.getElementById(serviceId + '-icon');
    
    if (!serviceDetails) {
        console.error('Service details not found for:', serviceId);
        return;
    }
    
    if (!icon) {
        console.error('Icon not found for:', serviceId + '-icon');
        return;
    }
    
    // Simple display toggle - no complex class management
    const isCurrentlyHidden = serviceDetails.style.display === 'none' || serviceDetails.style.display === '';
    
    if (isCurrentlyHidden) {
        // Show the details
        serviceDetails.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
        console.log('✅ SHOWING service:', serviceId);
        
        // Update button text
        const headerText = icon.parentElement.querySelector('span');
        if (headerText) {
            headerText.textContent = 'Details verbergen';
        }
        
    } else {
        // Hide the details
        serviceDetails.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        console.log('❌ HIDING service:', serviceId);
        
        // Update button text
        const headerText = icon.parentElement.querySelector('span');
        if (headerText) {
            headerText.textContent = 'Details anzeigen';
        }
    }
}

/**
 * Initialize Scroll-based Header Shrinking
 */
function initializeScrollHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function updateHeaderOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down more than 100px
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Add sticky animation class when crossing the threshold
        if (scrollTop > 100 && lastScrollTop <= 100) {
            header.classList.add('sticky-animation');
            setTimeout(() => {
                header.classList.remove('sticky-animation');
            }, 400);
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttled scroll event for better performance
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(updateHeaderOnScroll);
    }, { passive: true });
    
    // Initial check
    updateHeaderOnScroll();
    
    console.log('Scroll-based header initialized');
}

/**
 * Create Info Modal
 */
function createInfoModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
                    <button class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                </div>
                <div class="text-gray-700">
                    ${content}
                </div>
                <div class="mt-6 text-right">
                    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Verstanden
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Close modal functionality
    const closeButtons = modal.querySelectorAll('button');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

/**
 * Utility Functions
 */

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

// Add bounce animation CSS
if (!document.querySelector('#bounce-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'bounce-animation-styles';
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
            }
            40%, 43% {
                transform: translate3d(0,-15px,0);
            }
            70% {
                transform: translate3d(0,-7px,0);
            }
            90% {
                transform: translate3d(0,-2px,0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Console info for developers
console.log(`
🏥 imed2230 - Dr. Gunter Riedmüller Website
📍 Brunnengasse 9, 2230 Gänserndorf
📞 02282-52827
✉️ office@imed2230.at
🌐 www.imed2230.at

This website serves Dr. Gunter Riedmüller's medical practice.
All interactive features are now loaded and ready.
`);
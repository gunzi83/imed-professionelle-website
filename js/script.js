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
    initializeNotificationSystem();
    initializeNewsSystem();
    
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
            const targetId = this.getAttribute('href');
            
            // Skip empty anchors
            if (targetId === '#') {
                return;
            }
            
            console.log(`🖱️ Smooth scroll to: ${targetId}`);
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                console.log(`📍 Scrolling to position: ${targetPosition}`);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error(`❌ Target element not found: ${targetId}`);
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
        // FAB is now a link that opens CGM Life Portal directly
        // Add bounce animation on hover
        fab.addEventListener('mouseenter', function() {
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
    // All termin buttons are now direct links to CGM Life Portal
    // Add visual feedback for links
    const terminLinks = document.querySelectorAll('a[href*="cgmlife.com"]');
    
    terminLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add bounce animation feedback when clicking appointment links
            link.style.animation = 'bounce 0.3s';
            setTimeout(() => {
                link.style.animation = '';
            }, 300);
        });
    });
}

/**
 * Show Appointment Information (Legacy function - now unused)
 * All appointment buttons now link directly to CGM Life Portal
 */
function showAppointmentInfo() {
    // This function is no longer used as appointment buttons
    // now link directly to the CGM Life Portal
    console.log('Appointment info function called (legacy)');
}

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    // Mobile menu functionality is handled by toggleMobileMenu function
    // Add smooth scrolling for mobile navigation links AND quick action buttons
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .quick-action-btn');
    
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                console.log(`🖱️ Mobile link clicked: ${href} (${link.classList.contains('quick-action-btn') ? 'quick-action' : 'nav-link'})`);
                
                // Close mobile menu when a link is clicked
                const mobileMenu = document.getElementById('mobile-menu');
                const menuButton = document.getElementById('mobile-menu-button');
                if (mobileMenu && menuButton) {
                    mobileMenu.classList.add('hidden');
                    menuButton.setAttribute('aria-expanded', 'false');
                    updateMenuIcon(false);
                    console.log('📲 Mobile menu closed');
                }
                
                // Let smooth scrolling handle the navigation
                // Don't prevent default - let initializeSmoothScrolling handle it
            });
        }
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

/**
 * Notification System - For Important Announcements
 */
function initializeNotificationSystem() {
    const banner = document.getElementById('notification-banner');
    const closeBtn = document.getElementById('close-notification');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideNotification();
        });
    }
    
    // Auto-hide notification after 10 seconds for info notifications
    setTimeout(() => {
        if (banner && banner.style.display !== 'none' && !banner.classList.contains('urgent')) {
            hideNotification();
        }
    }, 10000);
}

/**
 * Show Notification Banner
 * @param {string} message - Notification message
 * @param {string} type - Type: 'info', 'warning', 'success', 'urgent'
 * @param {string} icon - FontAwesome icon class (optional)
 */
function showNotification(message, type = 'info', icon = null) {
    const banner = document.getElementById('notification-banner');
    const textElement = document.getElementById('notification-text');
    const iconElement = document.getElementById('notification-icon');
    
    if (!banner || !textElement || !iconElement) return;
    
    // Set content
    textElement.innerHTML = message;
    
    // Set icon
    const iconClass = icon || getDefaultIcon(type);
    iconElement.className = `fas ${iconClass}`;
    
    // Set banner style
    banner.className = `notification-banner ${type}`;
    banner.style.display = 'block';
    
    // Smooth slide-in animation
    setTimeout(() => {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
    }, 50);
}

/**
 * Hide Notification Banner
 */
function hideNotification() {
    const banner = document.getElementById('notification-banner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

/**
 * Get Default Icon for Notification Type
 */
function getDefaultIcon(type) {
    const icons = {
        'info': 'fa-info-circle',
        'warning': 'fa-exclamation-triangle',
        'success': 'fa-check-circle',
        'urgent': 'fa-exclamation-circle'
    };
    return icons[type] || 'fa-info-circle';
}

/**
 * News System - For Regular Updates and Announcements
 */
function initializeNewsSystem() {
    loadNews();
    loadHoursAlert();
}

/**
 * Load and Display News Items
 */
function loadNews() {
    // In a real implementation, this would fetch from a backend or CMS
    // For now, we'll use a configuration-based approach
    const newsItems = getNewsConfiguration();
    
    const container = document.getElementById('news-container');
    const noNewsMessage = document.getElementById('no-news-message');
    
    if (!container) return;
    
    // Filter active news (within date range)
    const activeNews = newsItems.filter(item => isNewsActive(item));
    
    if (activeNews.length === 0) {
        container.style.display = 'none';
        if (noNewsMessage) noNewsMessage.style.display = 'block';
        return;
    }
    
    // Show news container and hide no-news message
    container.style.display = 'block';
    if (noNewsMessage) noNewsMessage.style.display = 'none';
    
    // Sort by priority and date
    activeNews.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.startDate) - new Date(a.startDate);
    });
    
    // Generate HTML for news items
    container.innerHTML = activeNews.map(item => generateNewsCardHTML(item)).join('');
}

/**
 * Check if news item is active (within date range)
 */
function isNewsActive(newsItem) {
    const now = new Date();
    const startDate = new Date(newsItem.startDate);
    const endDate = newsItem.endDate ? new Date(newsItem.endDate) : null;
    
    return now >= startDate && (!endDate || now <= endDate);
}

/**
 * Generate HTML for News Card
 */
function generateNewsCardHTML(newsItem) {
    const typeClass = `news-type-${newsItem.type}`;
    const priorityClass = `priority-${newsItem.priority}`;
    
    return `
        <div class="news-card ${priorityClass}">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <i class="fas ${newsItem.icon} text-2xl" style="color: ${getNewsIconColor(newsItem.type)};"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-1">${newsItem.title}</h3>
                            <div class="news-meta">
                                <span class="news-type-badge ${typeClass}">${getNewsTypeLabel(newsItem.type)}</span>
                                <span><i class="fas fa-calendar text-xs mr-1"></i>${formatDate(newsItem.startDate)}</span>
                                ${newsItem.priority === 'high' ? '<span class="text-red-600 font-semibold">WICHTIG</span>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-gray-700 leading-relaxed">
                    ${newsItem.content}
                </div>
                ${newsItem.endDate ? `<div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-clock mr-1"></i>Gültig bis: ${formatDate(newsItem.endDate)}
                </div>` : ''}
            </div>
        </div>
    `;
}

/**
 * Load Hours Alert for Contact Section
 */
function loadHoursAlert() {
    const hoursAlert = document.getElementById('hours-alert');
    const hoursAlertText = document.getElementById('hours-alert-text');
    
    if (!hoursAlert || !hoursAlertText) return;
    
    // Check for active hours alerts
    const newsItems = getNewsConfiguration();
    const hoursAlerts = newsItems.filter(item => 
        item.type === 'hours' && isNewsActive(item) && item.showInContact
    );
    
    if (hoursAlerts.length > 0) {
        const alert = hoursAlerts[0]; // Show most recent/important
        hoursAlertText.innerHTML = alert.content;
        hoursAlert.style.display = 'block';
    }
}

/**
 * News Configuration - Easy to Update
 * 📝 CHANGE THIS SECTION TO UPDATE NEWS AND ANNOUNCEMENTS
 */
function getNewsConfiguration() {
    return [
        // AKTUELLE PRAXIS-NEUIGKEITEN
        {
            id: 'vacation-august-2025',
            type: 'vacation',
            title: 'Urlaub',
            content: 'Die Ordination ist vom <strong>26. August bis 28. August 2025</strong> geschlossen.',
            startDate: '2025-08-01',
            endDate: '2025-08-28',
            priority: 'high',
            icon: 'fa-plane',
            showInContact: true
        }
        
        // WEITERE NEWS KÖNNEN HIER HINZUGEFÜGT WERDEN
        // Beispiele für andere News-Typen:
        /*
        {
            id: 'new-service-example',
            type: 'service',
            title: 'Neue Leistung: 24h-Blutdruckmessung',
            content: 'Ab sofort bieten wir auch 24-Stunden-Blutdruckmessungen an. Diese moderne Diagnostik ermöglicht eine präzise Beurteilung Ihres Blutdruckverlaufs. Vereinbaren Sie gerne einen Termin.',
            startDate: '2025-01-15',
            endDate: null,
            priority: 'medium',
            icon: 'fa-heartbeat',
            showInContact: false
        },
        {
            id: 'hours-change-example',
            type: 'hours',
            title: 'Geänderte Öffnungszeiten',
            content: 'Aufgrund von Fortbildungen sind wir am <strong>Donnerstag, 25. Januar</strong> nur von 10:00-12:00 Uhr geöffnet.',
            startDate: '2025-01-20',
            endDate: '2025-01-26',
            priority: 'medium',
            icon: 'fa-clock',
            showInContact: true
        }
        */
    ];
}

/**
 * Utility Functions for News System
 */
function getNewsTypeLabel(type) {
    const labels = {
        'vacation': 'Urlaub',
        'hours': 'Öffnungszeiten',
        'service': 'Neue Leistung',
        'general': 'Allgemein'
    };
    return labels[type] || 'Info';
}

function getNewsIconColor(type) {
    const colors = {
        'vacation': '#F59E0B',
        'hours': '#3B82F6',
        'service': '#10B981',
        'general': '#6B7280'
    };
    return colors[type] || '#6B7280';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Global functions for easy management
window.showNotification = showNotification;
window.hideNotification = hideNotification;
window.loadNews = loadNews;

// Console info for developers
console.log(`
🏥 imed2230 - Dr. Gunter Riedmüller Website
📍 Brunnengasse 9, 2230 Gänserndorf
📞 02282-52827
✉️ office@imed2230.at
🌐 www.imed2230.at
🔗 Online Terminvereinbarung: CGM Life Portal
📢 Benachrichtigungssystem: Aktiviert
📰 News-System: Aktiviert

This website serves Dr. Gunter Riedmüller's medical practice.
All interactive features are now loaded and ready.
Online appointment booking integrated with CGM Life Portal.

📝 To add news/announcements, edit the getNewsConfiguration() function in script.js
🚨 To show urgent notifications, use: showNotification('message', 'urgent')
`);
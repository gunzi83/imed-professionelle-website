<?php
/**
 * imed2230 WordPress Theme - header.php
 * Header Template für alle Seiten
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- WordPress Head -->
    <?php wp_head(); ?>
    
    <!-- TailwindCSS Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#2563eb',
                        'primary-dark': '#1e40af', 
                        'secondary': '#1e3a8a',
                        'accent': '#f59e0b',
                        'success': '#10b981',
                        'info': '#06b6d4',
                        'warning': '#f59e0b',
                        'danger': '#ef4444'
                    },
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
                        'pulse-slow': 'pulse 3s ease-in-out infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'flip': 'flip 0.6s ease-in-out',
                        'scale-in': 'scaleIn 0.3s ease-out',
                        'ripple': 'ripple 1s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        slideUp: {
                            '0%': { opacity: '0', transform: 'translateY(40px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        bounceSoft: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-20px)' }
                        },
                        glow: {
                            '0%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' },
                            '100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.8)' }
                        },
                        flip: {
                            '0%': { transform: 'rotateY(0)' },
                            '100%': { transform: 'rotateY(180deg)' }
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.9)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        ripple: {
                            '0%': { transform: 'scale(0)', opacity: '1' },
                            '100%': { transform: 'scale(4)', opacity: '0' }
                        }
                    },
                    backdropBlur: {
                        'xs': '2px',
                    }
                }
            }
        }
    </script>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo/Brand -->
                <div class="flex items-center">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="text-2xl font-bold text-primary">
                            <?php bloginfo('name'); ?>
                        </a>
                    <?php endif; ?>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'flex items-center space-x-8',
                        'container' => false,
                        'fallback_cb' => 'imed2230_default_menu',
                    ));
                    ?>
                </div>
                
                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button type="button" class="text-gray-700 hover:text-primary focus:outline-none focus:text-primary" onclick="toggleMobileMenu()">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="md:hidden bg-white border-t" id="mobile-menu" style="display: none;">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class' => 'mobile-nav-menu',
                    'container' => false,
                    'fallback_cb' => 'imed2230_mobile_default_menu',
                ));
                ?>
            </div>
        </div>
    </nav>

<?php
// Fallback Menü wenn kein Menü definiert ist
function imed2230_default_menu() {
    ?>
    <ul class="flex items-center space-x-8">
        <li><a href="#home" class="nav-link hover:text-primary transition-colors">Start</a></li>
        <li><a href="#services" class="nav-link hover:text-primary transition-colors">Leistungen</a></li>
        <li><a href="#about" class="nav-link hover:text-primary transition-colors">Über uns</a></li>
        <li><a href="#contact" class="nav-link hover:text-primary transition-colors">Kontakt</a></li>
        <li><a href="#news" class="nav-link hover:text-primary transition-colors">Aktuelles</a></li>
    </ul>
    <?php
}

function imed2230_mobile_default_menu() {
    ?>
    <a href="#home" class="block px-3 py-2 text-gray-700 hover:text-primary">Start</a>
    <a href="#services" class="block px-3 py-2 text-gray-700 hover:text-primary">Leistungen</a>
    <a href="#about" class="block px-3 py-2 text-gray-700 hover:text-primary">Über uns</a>
    <a href="#contact" class="block px-3 py-2 text-gray-700 hover:text-primary">Kontakt</a>
    <a href="#news" class="block px-3 py-2 text-gray-700 hover:text-primary">Aktuelles</a>
    <?php
}
?>
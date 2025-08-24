<?php
/**
 * imed2230 WordPress Theme - footer.php
 * Footer Template für alle Seiten
 */
?>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <!-- Praxis Info -->
                <div class="space-y-6">
                    <div class="flex items-center space-x-3">
                        <?php if (has_custom_logo()) : ?>
                            <?php the_custom_logo(); ?>
                        <?php else : ?>
                            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <i class="fas fa-heartbeat text-white text-lg"></i>
                            </div>
                            <span class="text-xl font-bold"><?php bloginfo('name'); ?></span>
                        <?php endif; ?>
                    </div>
                    <p class="text-gray-300">
                        Moderne Innere Medizin mit dem Fokus auf Herz-Kreislauf-Erkrankungen und Diabetes in Gänserndorf.
                    </p>
                    <div class="flex space-x-4">
                        <a href="mailto:<?php echo esc_attr(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="tel:<?php echo esc_attr(get_theme_mod('praxis_phone', '02282-52827')); ?>" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                            <i class="fas fa-phone"></i>
                        </a>
                    </div>
                </div>
                
                <!-- Kontakt -->
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold">Kontakt</h3>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-map-marker-alt text-primary mt-1"></i>
                            <div>
                                <p class="font-medium">Adresse</p>
                                <p class="text-gray-300"><?php echo esc_html(get_theme_mod('praxis_address', 'Brunnengasse 9, 2230 Gänserndorf')); ?></p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-phone text-primary mt-1"></i>
                            <div>
                                <p class="font-medium">Telefon</p>
                                <a href="tel:<?php echo esc_attr(get_theme_mod('praxis_phone', '02282-52827')); ?>" class="text-gray-300 hover:text-primary transition-colors">
                                    <?php echo esc_html(get_theme_mod('praxis_phone', '02282-52827')); ?>
                                </a>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-envelope text-primary mt-1"></i>
                            <div>
                                <p class="font-medium">E-Mail</p>
                                <a href="mailto:<?php echo esc_attr(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>" class="text-gray-300 hover:text-primary transition-colors">
                                    <?php echo esc_html(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Öffnungszeiten -->
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold">Öffnungszeiten</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Montag</span>
                            <span class="font-medium">07:30-12:00, 14:00-17:00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Dienstag</span>
                            <span class="font-medium">07:30-12:00, 14:00-17:00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Mittwoch</span>
                            <span class="font-medium">07:30-12:00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Donnerstag</span>
                            <span class="font-medium">07:30-12:00, 14:00-17:00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Freitag</span>
                            <span class="font-medium">07:30-12:00</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Samstag</span>
                            <span class="font-medium text-red-400">Geschlossen</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Sonntag</span>
                            <span class="font-medium text-red-400">Geschlossen</span>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold">Quick Links</h3>
                    <?php if (has_nav_menu('footer')) : ?>
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'footer',
                            'menu_class' => 'space-y-3',
                            'container' => false,
                            'fallback_cb' => 'imed2230_footer_default_menu',
                        ));
                        ?>
                    <?php else : ?>
                        <?php imed2230_footer_default_menu(); ?>
                    <?php endif; ?>
                    
                    <?php if (is_active_sidebar('footer-1')) : ?>
                        <div class="widget-area">
                            <?php dynamic_sidebar('footer-1'); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="bg-gray-800 border-t border-gray-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="text-gray-300 text-sm">
                        © <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Alle Rechte vorbehalten.
                    </div>
                    <div class="flex items-center space-x-6 text-sm">
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">Datenschutz</a>
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">Impressum</a>
                        <a href="#" class="text-gray-300 hover:text-primary transition-colors">AGB</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-110 opacity-0 invisible" onclick="scrollToTop()">
        <i class="fas fa-chevron-up"></i>
    </button>

    <!-- JavaScript -->
    <script>
        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        }

        // Back to Top Functionality
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Show/Hide Back to Top Button
        window.addEventListener('scroll', function() {
            const backToTopBtn = document.getElementById('back-to-top');
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        // Smooth scrolling for anchor links
        document.addEventListener('DOMContentLoaded', function() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu.style.display === 'block') {
                        mobileMenu.style.display = 'none';
                    }
                });
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        });
    </script>

    <?php wp_footer(); ?>
</body>
</html>

<?php
// Fallback Footer Menu
function imed2230_footer_default_menu() {
    ?>
    <div class="space-y-3">
        <a href="#home" class="block text-gray-300 hover:text-primary transition-colors">Start</a>
        <a href="#services" class="block text-gray-300 hover:text-primary transition-colors">Leistungen</a>
        <a href="#about" class="block text-gray-300 hover:text-primary transition-colors">Über uns</a>
        <a href="#contact" class="block text-gray-300 hover:text-primary transition-colors">Kontakt</a>
        <a href="#news" class="block text-gray-300 hover:text-primary transition-colors">Aktuelles</a>
    </div>
    <?php
}
?>
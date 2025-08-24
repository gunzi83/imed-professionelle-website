<?php
/**
 * imed2230 WordPress Theme - index.php Template
 * Haupttemplate basierend auf der optimierten HTML-Struktur
 */

get_header(); ?>

<main id="main-content">
    <!-- Hero Section -->
    <section id="home" class="relative bg-gradient-to-br from-primary via-primary-dark to-secondary min-h-screen flex items-center overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute inset-0">
            <div class="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-48 h-48 bg-white/3 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl"></div>
        </div>
        
        <!-- Content Container -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                
                <!-- Left Column - Content -->
                <div class="text-white space-y-8 lg:pr-8">
                    <!-- Badge -->
                    <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Kassenordination • Alle Kassen
                    </div>
                    
                    <!-- Main Heading -->
                    <div class="space-y-4">
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            <?php bloginfo('name'); ?>
                        </h1>
                        <h2 class="text-xl sm:text-2xl lg:text-3xl font-light text-blue-100">
                            <?php bloginfo('description'); ?>
                        </h2>
                        <p class="text-lg text-blue-100/80 max-w-lg">
                            Ihre Gesundheit liegt uns am Herzen. Moderne Diagnostik und persönliche Betreuung in Gänserndorf.
                        </p>
                    </div>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="tel:<?php echo esc_attr(get_theme_mod('praxis_phone', '02282-52827')); ?>" 
                           class="btn-primary-modern btn-ripple inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            <i class="fas fa-phone mr-3"></i>
                            <?php echo esc_html(get_theme_mod('praxis_phone', '02282-52827')); ?>
                        </a>
                        <a href="#services" 
                           class="btn-outline-modern btn-ripple inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary transition-all duration-300">
                            <i class="fas fa-stethoscope mr-3"></i>
                            Unsere Leistungen
                        </a>
                    </div>
                    
                    <!-- Contact Info -->
                    <div class="pt-8 border-t border-white/20">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-3 text-blue-300"></i>
                                <span><?php echo esc_html(get_theme_mod('praxis_address', 'Brunnengasse 9, 2230 Gänserndorf')); ?></span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope mr-3 text-blue-300"></i>
                                <a href="mailto:<?php echo esc_attr(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>" 
                                   class="hover:underline"><?php echo esc_html(get_theme_mod('praxis_email', 'office@imed2230.at')); ?></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column - Doctor Image -->
                <div class="relative lg:order-2">
                    <div class="relative w-full max-w-md mx-auto">
                        <!-- Image Container -->
                        <div class="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white/20 group">
                            <?php 
                            $hero_image = get_template_directory_uri() . '/images/dr_riedmuller_hero.jpg';
                            ?>
                            <img src="<?php echo esc_url($hero_image); ?>" 
                                 alt="Dr. Gunter Riedmüller - Facharzt für Innere Medizin" 
                                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                 loading="eager">
                        </div>
                        
                        <!-- Floating Elements -->
                        <div class="absolute -top-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <i class="fas fa-heart text-2xl text-red-300 animate-pulse"></i>
                        </div>
                        <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <i class="fas fa-stethoscope text-white"></i>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" class="text-white/70 hover:text-white transition-colors">
                <i class="fas fa-chevron-down text-2xl"></i>
            </a>
        </div>
    </section>

    <!-- News Section (WordPress Dynamic Content) -->
    <?php if (function_exists('get_praxis_news_items')): ?>
    <section id="news" class="py-16 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
            <div id="news-container" class="space-y-6">
                <!-- Dynamic News Content wird hier durch WordPress geladen -->
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-12">
                <h1 class="text-3xl font-bold mb-2 text-gray-800 flex items-center justify-center welcome-main-title">
                    <span class="inline-flex items-center welcome-logo-text-fusion">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/heart_logo.png" alt="Herz Logo" class="welcome-main-logo" loading="lazy">lich
                    </span>&nbsp;Willkommen
                </h1>
                <h2 class="text-2xl font-medium mb-4 text-gray-700 text-center welcome-sub-title">
                    bei imed2230
                </h2>
            </div>
            
            <!-- Team Section -->
            <div class="mb-8">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold mb-4 text-gray-800">Unser Ärzteteam</h2>
                    <div class="w-16 h-1 mx-auto mb-6 bg-primary"></div>
                    <p class="text-gray-600">Kompetente medizinische Betreuung durch erfahrene Internisten</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <!-- Dr. Gunter Riedmüller -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div class="text-center mb-6">
                            <div class="doctor-photo-container w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-xl bg-white border-4 border-white ring-2 ring-primary/20">
                                <img src="<?php echo get_template_directory_uri(); ?>/images/dr_riedmuller.png" 
                                     alt="Dr. Gunter Riedmüller - Facharzt für Innere Medizin in Gänserndorf" 
                                     class="doctor-photo w-full h-full object-cover"
                                     loading="lazy">
                            </div>
                            <h4 class="text-xl font-bold text-gray-800">Dr. Gunter Riedmüller</h4>
                            <p class="text-primary font-medium">Facharzt für Innere Medizin</p>
                        </div>
                        
                        <div class="space-y-3 text-gray-600">
                            <div class="flex items-start">
                                <i class="fas fa-graduation-cap text-primary mr-3 mt-1 text-sm"></i>
                                <span class="text-sm">Medizinstudium Universität Wien</span>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-certificate text-primary mr-3 mt-1 text-sm"></i>
                                <span class="text-sm">Facharztausbildung Innere Medizin</span>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-heart text-primary mr-3 mt-1 text-sm"></i>
                                <span class="text-sm">Spezialisierung: Kardiologie, Diabetes</span>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-clock text-primary mr-3 mt-1 text-sm"></i>
                                <span class="text-sm">Langjährige Erfahrung in der Allgemeinmedizin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4 text-gray-800">Unser Leistungsspektrum</h2>
                <div class="w-16 h-1 mx-auto mb-6 bg-warning"></div>
                <p class="text-lg max-w-3xl mx-auto text-gray-700">
                    Moderne medizinische Diagnostik und Behandlung in unserer Kassenordination. 
                    Alle Leistungen werden direkt mit Ihrer Krankenkasse abgerechnet.
                </p>
            </div>
            
            <!-- Flip Cards Container -->
            <div class="flip-cards-container">
                <?php 
                // Service Cards werden hier durch das bestehende HTML oder WordPress Custom Fields generiert
                // Die Flip-Card CSS-Stile sind bereits in der externen CSS-Datei verfügbar
                ?>
                
                <!-- Beispiel Service Card - diese werden dynamisch generiert -->
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div class="flex flex-col items-center justify-between h-full p-4">
                                <div class="flex justify-center w-full mb-2">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/imed2230_logo.png" 
                                         alt="imed2230 Praxis Logo - Herzultraschall" 
                                         class="w-28 h-14 object-contain opacity-75 hover:opacity-100 transition-opacity duration-300"
                                         loading="lazy">
                                </div>
                                <div class="flex flex-col items-center justify-center flex-grow">
                                    <i class="fas fa-heartbeat service-icon text-gray-600"></i>
                                    <h3 class="text-2xl font-bold text-gray-800">Herzultraschall</h3>
                                </div>
                                <div class="interaction-hint">
                                    <i class="fas fa-hand-pointer mr-1"></i>
                                    <span class="hint-text">Klicken für mehr Info</span>
                                </div>
                            </div>
                        </div>
                        <div class="flip-card-back bg-white border border-gray-200 shadow-sm">
                            <div class="flex flex-col justify-center h-full p-4">
                                <div class="border-l-4 border-blue-500 pl-4">
                                    <h4 class="text-lg font-bold mb-2 text-gray-800">Herzecho</h4>
                                    <p class="text-sm leading-relaxed text-gray-700">Schonende Herz- und Klappenfunktionsdiagnostik.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Weitere Service Cards hier... -->
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4 text-gray-800">Kontakt & Anfahrt</h2>
                <div class="w-16 h-1 mx-auto mb-6 bg-secondary"></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Contact Information -->
                <div class="space-y-8">
                    <div class="bg-gray-50 rounded-xl p-8">
                        <h3 class="text-2xl font-bold mb-6 text-gray-800">Kontaktinformationen</h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-primary mr-4 text-xl"></i>
                                <div>
                                    <p class="font-semibold text-gray-800">Adresse</p>
                                    <p class="text-gray-600"><?php echo esc_html(get_theme_mod('praxis_address', 'Brunnengasse 9, 2230 Gänserndorf')); ?></p>
                                </div>
                            </div>
                            
                            <div class="flex items-center">
                                <i class="fas fa-phone text-primary mr-4 text-xl"></i>
                                <div>
                                    <p class="font-semibold text-gray-800">Telefon</p>
                                    <a href="tel:<?php echo esc_attr(get_theme_mod('praxis_phone', '02282-52827')); ?>" 
                                       class="text-primary hover:underline">
                                        <?php echo esc_html(get_theme_mod('praxis_phone', '02282-52827')); ?>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="flex items-center">
                                <i class="fas fa-envelope text-primary mr-4 text-xl"></i>
                                <div>
                                    <p class="font-semibold text-gray-800">E-Mail</p>
                                    <a href="mailto:<?php echo esc_attr(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>" 
                                       class="text-primary hover:underline">
                                        <?php echo esc_html(get_theme_mod('praxis_email', 'office@imed2230.at')); ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Opening Hours -->
                    <div class="bg-primary/5 rounded-xl p-8">
                        <h3 class="text-2xl font-bold mb-6 text-gray-800">Ordinationszeiten</h3>
                        
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="font-medium text-gray-800">Montag</span>
                                <span class="text-gray-600">07:30-12:00, 14:00-17:00</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="font-medium text-gray-800">Dienstag</span>
                                <span class="text-gray-600">07:30-12:00, 14:00-17:00</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="font-medium text-gray-800">Mittwoch</span>
                                <span class="text-gray-600">07:30-12:00</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="font-medium text-gray-800">Donnerstag</span>
                                <span class="text-gray-600">07:30-12:00, 14:00-17:00</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="font-medium text-gray-800">Freitag</span>
                                <span class="text-gray-600">07:30-12:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Map or Image -->
                <div class="space-y-8">
                    <div class="ordination-photo-container rounded-lg overflow-hidden shadow-lg">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/practice_exterior.png" 
                             alt="Praxis imed2230 - Außenansicht der Ordination in Gänserndorf" 
                             class="ordination-photo w-full h-full object-cover aspect-video"
                             loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
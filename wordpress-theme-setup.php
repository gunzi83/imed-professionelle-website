<?php
/**
 * imed2230 WordPress Theme Integration
 * Basis für Custom Theme oder Child Theme
 */

// Theme Support aktivieren
function imed2230_theme_setup() {
    // HTML5 Support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Post Thumbnails
    add_theme_support('post-thumbnails');
    
    // Title Tag Support
    add_theme_support('title-tag');
    
    // Custom Logo
    add_theme_support('custom-logo', array(
        'height' => 80,
        'width' => 200,
        'flex-height' => true,
        'flex-width' => true,
    ));
}
add_action('after_setup_theme', 'imed2230_theme_setup');

// Styles und Scripts einbinden
function imed2230_enqueue_assets() {
    // TailwindCSS
    wp_enqueue_style('tailwindcss', 'https://cdn.tailwindcss.com');
    
    // FontAwesome
    wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    // Custom Theme Styles
    wp_enqueue_style('imed2230-style', get_template_directory_uri() . '/css/style.css', array(), '1.0.0');
    
    // Custom Scripts
    wp_enqueue_script('imed2230-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0.0', true);
    
    // WordPress Ajax für News System
    wp_localize_script('imed2230-script', 'imed_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'rest_url' => rest_url('imed/v1/'),
        'nonce' => wp_create_nonce('imed_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'imed2230_enqueue_assets');

// Custom Post Type für News (aus wordpress-functions.php)
require_once get_template_directory() . '/inc/news-system.php';

// Widget Areas
function imed2230_widgets_init() {
    register_sidebar(array(
        'name' => 'Footer Sidebar',
        'id' => 'footer-1',
        'description' => 'Erscheint im Footer-Bereich',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}
add_action('widgets_init', 'imed2230_widgets_init');

// SEO und Meta Tags
function imed2230_custom_meta() {
    if (is_front_page()) {
        ?>
        <!-- Custom Meta Tags für imed2230 -->
        <link rel="canonical" href="<?php echo home_url(); ?>">
        <meta name="robots" content="index, follow">
        <meta name="author" content="Dr. Gunter Riedm&uuml;ller">
        <meta name="geo.region" content="AT-N&Ouml;">
        <meta name="geo.placename" content="G&auml;nserndorf">
        <meta name="geo.position" content="48.3358;16.7144">
        
        <!-- Open Graph -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="<?php echo home_url(); ?>">
        <meta property="og:title" content="<?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>">
        <meta property="og:description" content="Kassenordination Dr. Gunter Riedmüller in Gänserndorf. Spezialisiert auf Diabetes und Herz-Kreislauf-Erkrankungen.">
        <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/images/practice_exterior.png">
        <meta property="og:locale" content="de_AT">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "imed2230 - Dr. Gunter Riedmüller",
            "image": "<?php echo get_template_directory_uri(); ?>/images/practice_exterior.png",
            "description": "Kassenordination für Innere Medizin in Gänserndorf. Spezialisiert auf Herz-Kreislauf-Erkrankungen, Diabetes und moderne Diagnostikverfahren.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Brunnengasse 9",
                "addressLocality": "Gänserndorf",
                "postalCode": "2230",
                "addressCountry": "AT"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.3358,
                "longitude": 16.7144
            },
            "url": "<?php echo home_url(); ?>",
            "telephone": "+43-2282-52827",
            "email": "office@imed2230.at",
            "medicalSpecialty": "Innere Medizin",
            "priceRange": "Kassenleistung",
            "paymentAccepted": ["Österreichische Krankenkassen", "Privatpatienten"],
            "currenciesAccepted": "EUR",
            "openingHours": [
                "Mo 07:30-12:00,14:00-17:00",
                "Di 07:30-12:00,14:00-17:00", 
                "Mi 07:30-12:00",
                "Do 07:30-12:00,14:00-17:00",
                "Fr 07:30-12:00"
            ],
            "founder": {
                "@type": "Person",
                "name": "Dr. Gunter Riedmüller",
                "jobTitle": "Facharzt für Innere Medizin"
            }
        }
        </script>
        <?php
    }
}
add_action('wp_head', 'imed2230_custom_meta');

// Theme Customizer
function imed2230_customize_register($wp_customize) {
    // Praxis Informationen Section
    $wp_customize->add_section('imed2230_info', array(
        'title' => 'Praxis Informationen',
        'priority' => 30,
    ));
    
    // Praxis Telefon
    $wp_customize->add_setting('praxis_phone', array(
        'default' => '02282-52827',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('praxis_phone', array(
        'label' => 'Telefonnummer',
        'section' => 'imed2230_info',
        'settings' => 'praxis_phone',
        'type' => 'text',
    ));
    
    // Praxis Email
    $wp_customize->add_setting('praxis_email', array(
        'default' => 'office@imed2230.at',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('praxis_email', array(
        'label' => 'E-Mail Adresse',
        'section' => 'imed2230_info',
        'settings' => 'praxis_email',
        'type' => 'email',
    ));
    
    // Praxis Adresse
    $wp_customize->add_setting('praxis_address', array(
        'default' => 'Brunnengasse 9, 2230 Gänserndorf',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('praxis_address', array(
        'label' => 'Praxis Adresse',
        'section' => 'imed2230_info',
        'settings' => 'praxis_address',
        'type' => 'textarea',
    ));
}
add_action('customize_register', 'imed2230_customize_register');

// Navigation Menus
function imed2230_menus() {
    register_nav_menus(array(
        'primary' => 'Hauptnavigation',
        'footer' => 'Footer Navigation',
    ));
}
add_action('init', 'imed2230_menus');

?>
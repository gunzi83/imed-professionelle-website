<?php
/**
 * imed2230 News System für WordPress
 * Separates Modul für News-Funktionalität
 */

// Custom Post Type für News
function imed2230_create_news_post_type() {
    register_post_type('imed_news',
        array(
            'labels' => array(
                'name' => 'Praxis News',
                'singular_name' => 'News',
                'add_new' => 'Neue News',
                'add_new_item' => 'Neue News hinzufügen',
                'edit_item' => 'News bearbeiten',
                'new_item' => 'Neue News',
                'view_item' => 'News anzeigen',
                'search_items' => 'News suchen',
                'not_found' => 'Keine News gefunden',
                'not_found_in_trash' => 'Keine News im Papierkorb gefunden'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'news'),
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail'),
            'menu_icon' => 'dashicons-megaphone',
            'show_in_rest' => true, // Für REST API und Gutenberg
        )
    );
}
add_action('init', 'imed2230_create_news_post_type');

// Custom Meta Fields für News
function imed2230_add_news_meta_boxes() {
    add_meta_box(
        'imed_news_details',
        'News Details',
        'imed2230_news_meta_box_callback',
        'imed_news',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'imed2230_add_news_meta_boxes');

function imed2230_news_meta_box_callback($post) {
    wp_nonce_field('imed2230_save_news_meta', 'imed2230_news_meta_nonce');
    
    $news_priority = get_post_meta($post->ID, '_imed_news_priority', true);
    $news_category = get_post_meta($post->ID, '_imed_news_category', true);
    $news_icon = get_post_meta($post->ID, '_imed_news_icon', true);
    $show_on_homepage = get_post_meta($post->ID, '_imed_show_on_homepage', true);
    ?>
    
    <table class="form-table">
        <tr>
            <th scope="row">Priorität</th>
            <td>
                <select name="imed_news_priority" style="width: 100%;">
                    <option value="normal" <?php selected($news_priority, 'normal'); ?>>Normal</option>
                    <option value="high" <?php selected($news_priority, 'high'); ?>>Hoch</option>
                    <option value="urgent" <?php selected($news_priority, 'urgent'); ?>>Dringend</option>
                </select>
            </td>
        </tr>
        <tr>
            <th scope="row">Kategorie</th>
            <td>
                <select name="imed_news_category" style="width: 100%;">
                    <option value="allgemein" <?php selected($news_category, 'allgemein'); ?>>Allgemein</option>
                    <option value="oeffnungszeiten" <?php selected($news_category, 'oeffnungszeiten'); ?>>Öffnungszeiten</option>
                    <option value="services" <?php selected($news_category, 'services'); ?>>Leistungen</option>
                    <option value="gesundheit" <?php selected($news_category, 'gesundheit'); ?>>Gesundheit</option>
                    <option value="termine" <?php selected($news_category, 'termine'); ?>>Termine</option>
                </select>
            </td>
        </tr>
        <tr>
            <th scope="row">Icon (FontAwesome)</th>
            <td>
                <input type="text" name="imed_news_icon" value="<?php echo esc_attr($news_icon); ?>" 
                       placeholder="z.B. fas fa-calendar" style="width: 100%;" />
                <p class="description">FontAwesome Icon Klasse (z.B. fas fa-calendar, fas fa-stethoscope)</p>
            </td>
        </tr>
        <tr>
            <th scope="row">Auf Startseite anzeigen</th>
            <td>
                <input type="checkbox" name="imed_show_on_homepage" value="1" <?php checked($show_on_homepage, '1'); ?> />
                <label>Diese News auf der Startseite hervorheben</label>
            </td>
        </tr>
    </table>
    <?php
}

function imed2230_save_news_meta($post_id) {
    if (!isset($_POST['imed2230_news_meta_nonce']) || 
        !wp_verify_nonce($_POST['imed2230_news_meta_nonce'], 'imed2230_save_news_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['imed_news_priority'])) {
        update_post_meta($post_id, '_imed_news_priority', sanitize_text_field($_POST['imed_news_priority']));
    }

    if (isset($_POST['imed_news_category'])) {
        update_post_meta($post_id, '_imed_news_category', sanitize_text_field($_POST['imed_news_category']));
    }

    if (isset($_POST['imed_news_icon'])) {
        update_post_meta($post_id, '_imed_news_icon', sanitize_text_field($_POST['imed_news_icon']));
    }

    $show_on_homepage = isset($_POST['imed_show_on_homepage']) ? '1' : '0';
    update_post_meta($post_id, '_imed_show_on_homepage', $show_on_homepage);
}
add_action('save_post', 'imed2230_save_news_meta');

// REST API Endpoints für News
function imed2230_register_news_api_routes() {
    register_rest_route('imed/v1', '/news', array(
        'methods' => 'GET',
        'callback' => 'imed2230_get_news_api',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('imed/v1', '/news/homepage', array(
        'methods' => 'GET',
        'callback' => 'imed2230_get_homepage_news_api',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'imed2230_register_news_api_routes');

function imed2230_get_news_api($request) {
    $args = array(
        'post_type' => 'imed_news',
        'post_status' => 'publish',
        'posts_per_page' => $request->get_param('per_page') ?: 10,
        'paged' => $request->get_param('page') ?: 1,
        'meta_key' => '_imed_news_priority',
        'orderby' => array(
            'meta_value' => 'DESC',
            'date' => 'DESC'
        ),
    );

    $category = $request->get_param('category');
    if ($category) {
        $args['meta_query'] = array(
            array(
                'key' => '_imed_news_category',
                'value' => $category,
                'compare' => '='
            )
        );
    }

    $posts = get_posts($args);
    $news_data = array();

    foreach ($posts as $post) {
        $news_data[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => apply_filters('the_content', $post->post_content),
            'excerpt' => $post->post_excerpt ?: wp_trim_words($post->post_content, 30),
            'date' => get_the_date('c', $post->ID),
            'date_formatted' => get_the_date('d.m.Y', $post->ID),
            'priority' => get_post_meta($post->ID, '_imed_news_priority', true) ?: 'normal',
            'category' => get_post_meta($post->ID, '_imed_news_category', true) ?: 'allgemein',
            'icon' => get_post_meta($post->ID, '_imed_news_icon', true) ?: 'fas fa-info-circle',
            'featured_image' => get_the_post_thumbnail_url($post->ID, 'medium'),
        );
    }

    return rest_ensure_response($news_data);
}

function imed2230_get_homepage_news_api($request) {
    $args = array(
        'post_type' => 'imed_news',
        'post_status' => 'publish',
        'posts_per_page' => 3,
        'meta_query' => array(
            array(
                'key' => '_imed_show_on_homepage',
                'value' => '1',
                'compare' => '='
            )
        ),
        'meta_key' => '_imed_news_priority',
        'orderby' => array(
            'meta_value' => 'DESC',
            'date' => 'DESC'
        ),
    );

    $posts = get_posts($args);
    $news_data = array();

    foreach ($posts as $post) {
        $news_data[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => apply_filters('the_content', $post->post_content),
            'excerpt' => $post->post_excerpt ?: wp_trim_words($post->post_content, 20),
            'date' => get_the_date('c', $post->ID),
            'date_formatted' => get_the_date('d.m.Y', $post->ID),
            'priority' => get_post_meta($post->ID, '_imed_news_priority', true) ?: 'normal',
            'category' => get_post_meta($post->ID, '_imed_news_category', true) ?: 'allgemein',
            'icon' => get_post_meta($post->ID, '_imed_news_icon', true) ?: 'fas fa-info-circle',
            'featured_image' => get_the_post_thumbnail_url($post->ID, 'medium'),
        );
    }

    return rest_ensure_response($news_data);
}

// Shortcode für News-Anzeige
function imed2230_news_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'count' => 3,
        'category' => '',
        'show_excerpt' => 'true',
        'show_date' => 'true',
    ), $atts);

    $args = array(
        'post_type' => 'imed_news',
        'post_status' => 'publish',
        'posts_per_page' => intval($attributes['count']),
        'meta_key' => '_imed_news_priority',
        'orderby' => array(
            'meta_value' => 'DESC',
            'date' => 'DESC'
        ),
    );

    if (!empty($attributes['category'])) {
        $args['meta_query'] = array(
            array(
                'key' => '_imed_news_category',
                'value' => $attributes['category'],
                'compare' => '='
            )
        );
    }

    $posts = get_posts($args);
    
    if (empty($posts)) {
        return '<p>Keine News verfügbar.</p>';
    }

    ob_start();
    ?>
    <div class="imed-news-container">
        <?php foreach ($posts as $post): ?>
            <?php
            $priority = get_post_meta($post->ID, '_imed_news_priority', true) ?: 'normal';
            $category = get_post_meta($post->ID, '_imed_news_category', true) ?: 'allgemein';
            $icon = get_post_meta($post->ID, '_imed_news_icon', true) ?: 'fas fa-info-circle';
            $priority_class = $priority === 'urgent' ? 'border-red-500 bg-red-50' : 
                             ($priority === 'high' ? 'border-orange-500 bg-orange-50' : 'border-blue-500 bg-blue-50');
            ?>
            <div class="imed-news-item bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 <?php echo $priority_class; ?>">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <i class="<?php echo esc_attr($icon); ?> text-2xl text-primary"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2"><?php echo esc_html($post->post_title); ?></h3>
                        
                        <?php if ($attributes['show_date'] === 'true'): ?>
                            <p class="text-sm text-gray-500 mb-3">
                                <?php echo get_the_date('d.m.Y', $post->ID); ?> | 
                                <span class="capitalize"><?php echo esc_html($category); ?></span>
                            </p>
                        <?php endif; ?>
                        
                        <?php if ($attributes['show_excerpt'] === 'true'): ?>
                            <div class="text-gray-700">
                                <?php 
                                if ($post->post_excerpt) {
                                    echo wp_kses_post($post->post_excerpt);
                                } else {
                                    echo wp_trim_words(strip_tags($post->post_content), 30);
                                }
                                ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('imed_news', 'imed2230_news_shortcode');

// Admin Spalten für News Overview
function imed2230_news_admin_columns($columns) {
    $columns['priority'] = 'Priorität';
    $columns['category'] = 'Kategorie';
    $columns['homepage'] = 'Startseite';
    return $columns;
}
add_filter('manage_imed_news_posts_columns', 'imed2230_news_admin_columns');

function imed2230_news_admin_column_content($column, $post_id) {
    switch ($column) {
        case 'priority':
            $priority = get_post_meta($post_id, '_imed_news_priority', true) ?: 'normal';
            $badge_class = $priority === 'urgent' ? 'error' : ($priority === 'high' ? 'warning' : 'success');
            echo '<span class="dashicons dashicons-flag" style="color: ' . 
                 ($priority === 'urgent' ? '#dc3545' : ($priority === 'high' ? '#ffc107' : '#28a745')) . 
                 ';"></span> ' . ucfirst($priority);
            break;
        case 'category':
            $category = get_post_meta($post_id, '_imed_news_category', true) ?: 'allgemein';
            echo ucfirst($category);
            break;
        case 'homepage':
            $show_on_homepage = get_post_meta($post_id, '_imed_show_on_homepage', true);
            echo $show_on_homepage ? '✓' : '—';
            break;
    }
}
add_action('manage_imed_news_posts_custom_column', 'imed2230_news_admin_column_content', 10, 2);

?>
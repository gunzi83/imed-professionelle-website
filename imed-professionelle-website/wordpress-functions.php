<?php
/**
 * WordPress Functions für imed2230 Praxis News System
 * 
 * Diese Datei in die functions.php Ihres WordPress Themes einfügen
 * oder als separates Plugin verwenden.
 */

// Verhindern direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Custom Post Type für Praxis-Neuigkeiten erstellen
 */
function create_imed_praxis_news_post_type() {
    $labels = array(
        'name'                  => 'Praxis Neuigkeiten',
        'singular_name'         => 'Neuigkeit',
        'menu_name'             => 'Praxis News',
        'name_admin_bar'        => 'Neuigkeit',
        'archives'              => 'News Archiv',
        'attributes'            => 'News Eigenschaften',
        'parent_item_colon'     => 'Übergeordnete Neuigkeit:',
        'all_items'             => 'Alle Neuigkeiten',
        'add_new_item'          => 'Neue Neuigkeit hinzufügen',
        'add_new'               => 'Hinzufügen',
        'new_item'              => 'Neue Neuigkeit',
        'edit_item'             => 'Neuigkeit bearbeiten',
        'update_item'           => 'Neuigkeit aktualisieren',
        'view_item'             => 'Neuigkeit anzeigen',
        'view_items'            => 'Neuigkeiten anzeigen',
        'search_items'          => 'Neuigkeiten suchen',
        'not_found'             => 'Keine Neuigkeiten gefunden',
        'not_found_in_trash'    => 'Keine Neuigkeiten im Papierkorb gefunden',
        'featured_image'        => 'Beitragsbild',
        'set_featured_image'    => 'Beitragsbild setzen',
        'remove_featured_image' => 'Beitragsbild entfernen',
        'use_featured_image'    => 'Als Beitragsbild verwenden',
        'insert_into_item'      => 'In Neuigkeit einfügen',
        'uploaded_to_this_item' => 'Zu dieser Neuigkeit hochgeladen',
        'items_list'            => 'Neuigkeiten Liste',
        'items_list_navigation' => 'Neuigkeiten Listennavigation',
        'filter_items_list'     => 'Neuigkeiten Liste filtern',
    );

    $args = array(
        'label'                 => 'Neuigkeit',
        'description'           => 'Neuigkeiten und Ankündigungen für die Praxis',
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'revisions'),
        'hierarchical'          => false,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-megaphone',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,  
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'show_in_rest'          => true, // Wichtig für REST API
        'rest_base'             => 'praxis-news',
        'capability_type'       => 'post',
    );

    register_post_type('imed_praxis_news', $args);
}
add_action('init', 'create_imed_praxis_news_post_type', 0);

/**
 * Meta Boxes für News-Einstellungen hinzufügen
 */
function add_imed_praxis_news_meta_boxes() {
    add_meta_box(
        'imed_praxis_news_settings',
        'News Einstellungen',
        'imed_praxis_news_settings_callback',
        'imed_praxis_news',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_imed_praxis_news_meta_boxes');

/**
 * Meta Box Callback - Anzeige der Eingabefelder
 */
function imed_praxis_news_settings_callback($post) {
    // Nonce für Sicherheit
    wp_nonce_field('imed_praxis_news_meta_nonce', 'imed_praxis_news_meta_nonce');
    
    // Aktuelle Werte abrufen
    $news_type = get_post_meta($post->ID, '_imed_news_type', true);
    $priority = get_post_meta($post->ID, '_imed_priority', true);
    $icon = get_post_meta($post->ID, '_imed_icon', true);
    $start_date = get_post_meta($post->ID, '_imed_start_date', true);
    $end_date = get_post_meta($post->ID, '_imed_end_date', true);
    $show_in_contact = get_post_meta($post->ID, '_imed_show_in_contact', true);
    $urgent_notification = get_post_meta($post->ID, '_imed_urgent_notification', true);
    
    // Standard-Werte setzen
    if (empty($news_type)) $news_type = 'general';
    if (empty($priority)) $priority = 'medium';
    if (empty($icon)) $icon = 'fa-info-circle';
    if (empty($start_date)) $start_date = date('Y-m-d');
    ?>
    
    <style>
        .imed-meta-table { width: 100%; border-collapse: collapse; }
        .imed-meta-table th { text-align: left; padding: 10px; width: 200px; font-weight: 600; }
        .imed-meta-table td { padding: 10px; }
        .imed-meta-table input[type="text"], 
        .imed-meta-table input[type="date"], 
        .imed-meta-table select { width: 100%; max-width: 300px; }
        .imed-description { font-style: italic; color: #666; margin-top: 5px; }
        .imed-preview { background: #f9f9f9; padding: 10px; border-left: 4px solid #0073aa; margin-top: 10px; }
    </style>
    
    <table class="imed-meta-table">
        <tr>
            <th><label for="imed_news_type">📋 News-Typ</label></th>
            <td>
                <select name="imed_news_type" id="imed_news_type">
                    <option value="general" <?php selected($news_type, 'general'); ?>>🔵 Allgemein</option>
                    <option value="vacation" <?php selected($news_type, 'vacation'); ?>>🟠 Urlaub</option>
                    <option value="hours" <?php selected($news_type, 'hours'); ?>>🔵 Öffnungszeiten</option>
                    <option value="service" <?php selected($news_type, 'service'); ?>>🟢 Neue Leistung</option>
                </select>
                <div class="imed-description">Bestimmt die Farbe und Kategorie der Neuigkeit</div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_priority">⭐ Priorität</label></th>
            <td>
                <select name="imed_priority" id="imed_priority">
                    <option value="low" <?php selected($priority, 'low'); ?>>🟢 Niedrig</option>
                    <option value="medium" <?php selected($priority, 'medium'); ?>>🟡 Mittel</option>
                    <option value="high" <?php selected($priority, 'high'); ?>>🔴 Hoch (wird hervorgehoben)</option>
                </select>
                <div class="imed-description">Hohe Priorität wird rot markiert und oben angezeigt</div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_icon">🎨 FontAwesome Icon</label></th>
            <td>
                <input type="text" name="imed_icon" id="imed_icon" value="<?php echo esc_attr($icon); ?>" placeholder="fa-info-circle" />
                <div class="imed-description">
                    <strong>Beliebte Icons:</strong> fa-plane (Urlaub), fa-clock (Zeit), fa-heartbeat (Medizin), fa-plus-circle (Neu), fa-exclamation-triangle (Warnung)
                </div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_start_date">📅 Startdatum</label></th>
            <td>
                <input type="date" name="imed_start_date" id="imed_start_date" value="<?php echo esc_attr($start_date); ?>" />
                <div class="imed-description">Ab wann soll die Neuigkeit angezeigt werden?</div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_end_date">📅 Enddatum (optional)</label></th>
            <td>
                <input type="date" name="imed_end_date" id="imed_end_date" value="<?php echo esc_attr($end_date); ?>" />
                <div class="imed-description">Leer lassen für permanente Anzeige</div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_show_in_contact">📞 In Kontakt-Sektion</label></th>
            <td>
                <label>
                    <input type="checkbox" name="imed_show_in_contact" id="imed_show_in_contact" value="1" <?php checked($show_in_contact, '1'); ?> />
                    Zusätzlich in der Kontakt-Sektion bei den Öffnungszeiten anzeigen
                </label>
                <div class="imed-description">Empfohlen für Urlaub und geänderte Öffnungszeiten</div>
            </td>
        </tr>
        <tr>
            <th><label for="imed_urgent_notification">🚨 Dringende Benachrichtigung</label></th>
            <td>
                <label>
                    <input type="checkbox" name="imed_urgent_notification" id="imed_urgent_notification" value="1" <?php checked($urgent_notification, '1'); ?> />
                    Als dringende Benachrichtigung oben auf der Seite anzeigen (rot blinkend)
                </label>
                <div class="imed-description">Nur für sehr wichtige Mitteilungen (Notfälle, kurzfristige Schließungen)</div>
            </td>
        </tr>
    </table>
    
    <div class="imed-preview">
        <strong>💡 Tipp:</strong> Nach dem Veröffentlichen erscheint die Neuigkeit automatisch auf der Website. 
        Verwenden Sie <strong>HTML-Tags</strong> im Inhalt für Formatierung (z.B. &lt;strong&gt;fett&lt;/strong&gt;).
    </div>
    <?php
}

/**
 * Meta Daten speichern
 */
function save_imed_praxis_news_meta($post_id) {
    // Sicherheitsprüfungen
    if (!isset($_POST['imed_praxis_news_meta_nonce']) || 
        !wp_verify_nonce($_POST['imed_praxis_news_meta_nonce'], 'imed_praxis_news_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    // Felder speichern
    $fields = [
        'imed_news_type' => 'sanitize_text_field',
        'imed_priority' => 'sanitize_text_field', 
        'imed_icon' => 'sanitize_text_field',
        'imed_start_date' => 'sanitize_text_field',
        'imed_end_date' => 'sanitize_text_field',
        'imed_show_in_contact' => 'sanitize_text_field',
        'imed_urgent_notification' => 'sanitize_text_field'
    ];
    
    foreach ($fields as $field => $sanitize_func) {
        $value = isset($_POST[$field]) ? $sanitize_func($_POST[$field]) : '';
        update_post_meta($post_id, '_' . $field, $value);
    }
}
add_action('save_post', 'save_imed_praxis_news_meta');

/**
 * REST API Endpoint für aktive News
 */
function get_imed_praxis_news_api($request) {
    $today = date('Y-m-d');
    
    $args = array(
        'post_type' => 'imed_praxis_news',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_imed_start_date',
                'value' => $today,
                'compare' => '<='
            )
        )
    );
    
    $posts = get_posts($args);
    $news_data = array();
    
    foreach ($posts as $post) {
        $end_date = get_post_meta($post->ID, '_imed_end_date', true);
        
        // Prüfen ob News noch aktiv ist
        if (!empty($end_date) && strtotime($end_date) < time()) {
            continue;
        }
        
        $news_item = array(
            'id' => 'wp-' . $post->ID,
            'type' => get_post_meta($post->ID, '_imed_news_type', true) ?: 'general',
            'title' => $post->post_title,
            'content' => apply_filters('the_content', $post->post_content),
            'startDate' => get_post_meta($post->ID, '_imed_start_date', true),
            'endDate' => get_post_meta($post->ID, '_imed_end_date', true),
            'priority' => get_post_meta($post->ID, '_imed_priority', true) ?: 'medium',
            'icon' => get_post_meta($post->ID, '_imed_icon', true) ?: 'fa-info-circle',
            'showInContact' => get_post_meta($post->ID, '_imed_show_in_contact', true) === '1',
            'urgentNotification' => get_post_meta($post->ID, '_imed_urgent_notification', true) === '1',
            'publishDate' => $post->post_date,
            'modifiedDate' => $post->post_modified
        );
        
        $news_data[] = $news_item;
    }
    
    // Nach Priorität und Datum sortieren
    usort($news_data, function($a, $b) {
        $priority_order = ['high' => 3, 'medium' => 2, 'low' => 1];
        $a_priority = $priority_order[$a['priority']] ?? 2;
        $b_priority = $priority_order[$b['priority']] ?? 2;
        
        if ($a_priority !== $b_priority) {
            return $b_priority - $a_priority;
        }
        
        return strtotime($b['startDate']) - strtotime($a['startDate']);
    });
    
    return rest_ensure_response($news_data);
}

/**
 * REST API Route registrieren
 */
function register_imed_praxis_news_api_routes() {
    register_rest_route('imed/v1', '/news', array(
        'methods' => 'GET',
        'callback' => 'get_imed_praxis_news_api',
        'permission_callback' => '__return_true',
        'args' => array(
            'limit' => array(
                'default' => -1,
                'sanitize_callback' => 'absint',
            ),
            'type' => array(
                'default' => '',
                'sanitize_callback' => 'sanitize_text_field',
            )
        )
    ));
    
    // Separate Route für dringende Benachrichtigungen
    register_rest_route('imed/v1', '/urgent-notifications', array(
        'methods' => 'GET',
        'callback' => 'get_imed_urgent_notifications_api',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_imed_praxis_news_api_routes');

/**
 * API für dringende Benachrichtigungen
 */
function get_imed_urgent_notifications_api($request) {
    $today = date('Y-m-d');
    
    $args = array(
        'post_type' => 'imed_praxis_news',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => '_imed_start_date',
                'value' => $today,
                'compare' => '<='
            ),
            array(
                'key' => '_imed_urgent_notification',
                'value' => '1',
                'compare' => '='
            )
        )
    );
    
    $posts = get_posts($args);
    
    if (empty($posts)) {
        return rest_ensure_response(null);
    }
    
    $post = $posts[0];
    $end_date = get_post_meta($post->ID, '_imed_end_date', true);
    
    // Prüfen ob noch aktiv
    if (!empty($end_date) && strtotime($end_date) < time()) {
        return rest_ensure_response(null);
    }
    
    $notification = array(
        'id' => 'urgent-' . $post->ID,
        'title' => $post->post_title,
        'message' => wp_strip_all_tags($post->post_content),
        'type' => 'urgent',
        'icon' => get_post_meta($post->ID, '_imed_icon', true) ?: 'fa-exclamation-circle'
    );
    
    return rest_ensure_response($notification);
}

/**
 * Admin-Spalten für News-Übersicht anpassen
 */
function imed_praxis_news_admin_columns($columns) {
    $new_columns = array();
    
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        
        if ($key === 'title') {
            $new_columns['news_type'] = '📋 Typ';
            $new_columns['priority'] = '⭐ Priorität';
            $new_columns['active_period'] = '📅 Aktiv';
            $new_columns['status_flags'] = '🏷️ Status';
        }
    }
    
    return $new_columns;
}
add_filter('manage_imed_praxis_news_posts_columns', 'imed_praxis_news_admin_columns');

/**
 * Inhalt für Custom Admin-Spalten
 */
function imed_praxis_news_admin_column_content($column, $post_id) {
    switch ($column) {
        case 'news_type':
            $type = get_post_meta($post_id, '_imed_news_type', true);
            $type_labels = [
                'general' => '🔵 Allgemein',
                'vacation' => '🟠 Urlaub', 
                'hours' => '🔵 Öffnungszeiten',
                'service' => '🟢 Service'
            ];
            echo $type_labels[$type] ?? '🔵 Allgemein';
            break;
            
        case 'priority':
            $priority = get_post_meta($post_id, '_imed_priority', true);
            $priority_labels = [
                'low' => '🟢 Niedrig',
                'medium' => '🟡 Mittel',
                'high' => '🔴 Hoch'
            ];
            echo $priority_labels[$priority] ?? '🟡 Mittel';
            break;
            
        case 'active_period':
            $start_date = get_post_meta($post_id, '_imed_start_date', true);
            $end_date = get_post_meta($post_id, '_imed_end_date', true);
            
            if ($start_date) {
                echo 'Ab: ' . date('d.m.Y', strtotime($start_date));
                if ($end_date) {
                    echo '<br>Bis: ' . date('d.m.Y', strtotime($end_date));
                } else {
                    echo '<br><em>Unbegrenzt</em>';
                }
            }
            break;
            
        case 'status_flags':
            $flags = array();
            
            if (get_post_meta($post_id, '_imed_show_in_contact', true) === '1') {
                $flags[] = '📞 Kontakt';
            }
            
            if (get_post_meta($post_id, '_imed_urgent_notification', true) === '1') {
                $flags[] = '🚨 Dringend';
            }
            
            // Aktiv-Status prüfen
            $start_date = get_post_meta($post_id, '_imed_start_date', true);
            $end_date = get_post_meta($post_id, '_imed_end_date', true);
            $today = date('Y-m-d');
            
            if ($start_date && $start_date <= $today && (empty($end_date) || $end_date >= $today)) {
                $flags[] = '✅ Aktiv';
            } elseif ($start_date && $start_date > $today) {
                $flags[] = '⏳ Geplant';
            } elseif ($end_date && $end_date < $today) {
                $flags[] = '❌ Abgelaufen';
            }
            
            echo implode('<br>', $flags);
            break;
    }
}
add_action('manage_imed_praxis_news_posts_custom_column', 'imed_praxis_news_admin_column_content', 10, 2);

/**
 * Admin-Hinweise für bessere Benutzerführung
 */
function imed_praxis_news_admin_notices() {
    $screen = get_current_screen();
    
    if ($screen->post_type === 'imed_praxis_news') {
        ?>
        <div class="notice notice-info">
            <p>
                <strong>💡 Tipp:</strong> 
                Neuigkeiten werden automatisch basierend auf dem Start-/Enddatum angezeigt. 
                Für dringende Mitteilungen aktivieren Sie "Dringende Benachrichtigung".
                <a href="<?php echo admin_url('edit.php?post_type=imed_praxis_news'); ?>" style="margin-left: 10px;">Alle News anzeigen</a>
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'imed_praxis_news_admin_notices');

/**
 * Dashboard Widget für aktuelle News
 */
function imed_praxis_news_dashboard_widget() {
    wp_add_dashboard_widget(
        'imed_praxis_news_widget',
        '📢 Aktuelle Praxis-News',
        'imed_praxis_news_dashboard_widget_content'
    );
}
add_action('wp_dashboard_setup', 'imed_praxis_news_dashboard_widget');

function imed_praxis_news_dashboard_widget_content() {
    $today = date('Y-m-d');
    
    $args = array(
        'post_type' => 'imed_praxis_news',
        'post_status' => 'publish',
        'posts_per_page' => 5,
        'meta_query' => array(
            array(
                'key' => '_imed_start_date',
                'value' => $today,
                'compare' => '<='
            )
        )
    );
    
    $posts = get_posts($args);
    
    if (empty($posts)) {
        echo '<p>Derzeit keine aktiven Neuigkeiten.</p>';
        echo '<p><a href="' . admin_url('post-new.php?post_type=imed_praxis_news') . '" class="button button-primary">Neue Neuigkeit erstellen</a></p>';
        return;
    }
    
    echo '<ul>';
    foreach ($posts as $post) {
        $end_date = get_post_meta($post->ID, '_imed_end_date', true);
        $priority = get_post_meta($post->ID, '_imed_priority', true);
        $type = get_post_meta($post->ID, '_imed_news_type', true);
        
        // Aktiv-Status prüfen
        $is_active = empty($end_date) || strtotime($end_date) >= time();
        $status_icon = $is_active ? '✅' : '❌';
        
        $priority_icon = $priority === 'high' ? '🔴' : ($priority === 'medium' ? '🟡' : '🟢');
        
        echo '<li style="margin-bottom: 8px;">';
        echo $status_icon . ' ' . $priority_icon . ' <strong>' . esc_html($post->post_title) . '</strong>';
        echo ' <small>(' . ucfirst($type) . ')</small>';
        echo '<br><small>' . wp_trim_words(strip_tags($post->post_content), 15) . '</small>';
        echo ' <a href="' . get_edit_post_link($post->ID) . '">Bearbeiten</a>';
        echo '</li>';
    }
    echo '</ul>';
    
    echo '<p><a href="' . admin_url('edit.php?post_type=imed_praxis_news') . '">Alle News verwalten</a> | ';
    echo '<a href="' . admin_url('post-new.php?post_type=imed_praxis_news') . '" class="button button-primary">Neue Neuigkeit</a></p>';
}

// Ende der Datei
?>
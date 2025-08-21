# 🌐 WordPress Integration - News & Benachrichtigungssystem

## 🎯 Übersicht

Wenn Sie die imed2230 Website auf WordPress übertragen, gibt es mehrere professionelle Wege, um das Neuigkeitensystem zu integrieren. Hier sind die **3 besten Lösungen**, von einfach bis professionell:

---

## 🥇 **Lösung 1: WordPress REST API + Custom Post Type (EMPFOHLEN)**

### **Vorteile:**
✅ Professionelles WordPress-Dashboard für News-Verwaltung  
✅ Automatische API-Integration  
✅ Versionskontrolle und Benutzerrollen  
✅ SEO-optimiert  
✅ Backup-Integration  

### **WordPress Setup:**

#### 1. Custom Post Type erstellen (functions.php):
```php
<?php
// Custom Post Type für Praxis-Neuigkeiten
function create_praxis_news_post_type() {
    register_post_type('praxis_news',
        array(
            'labels' => array(
                'name' => 'Praxis Neuigkeiten',
                'singular_name' => 'Neuigkeit',
                'add_new' => 'Neue Neuigkeit',
                'add_new_item' => 'Neue Neuigkeit hinzufügen',
                'edit_item' => 'Neuigkeit bearbeiten',
                'new_item' => 'Neue Neuigkeit',
                'view_item' => 'Neuigkeit anzeigen',
                'search_items' => 'Neuigkeiten suchen',
                'not_found' => 'Keine Neuigkeiten gefunden',
                'menu_name' => 'Praxis News'
            ),
            'public' => true,
            'has_archive' => false,
            'publicly_queryable' => false,
            'show_in_rest' => true, // Wichtig für REST API
            'menu_icon' => 'dashicons-megaphone',
            'supports' => array('title', 'editor', 'custom-fields'),
            'menu_position' => 5
        )
    );
}
add_action('init', 'create_praxis_news_post_type');

// Custom Fields für News-Metadaten
function add_praxis_news_meta_boxes() {
    add_meta_box(
        'praxis_news_meta',
        'News Einstellungen',
        'praxis_news_meta_callback',
        'praxis_news',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_praxis_news_meta_boxes');

function praxis_news_meta_callback($post) {
    wp_nonce_field('praxis_news_meta_nonce', 'praxis_news_meta_nonce');
    
    $news_type = get_post_meta($post->ID, '_news_type', true);
    $priority = get_post_meta($post->ID, '_priority', true);
    $icon = get_post_meta($post->ID, '_icon', true);
    $start_date = get_post_meta($post->ID, '_start_date', true);
    $end_date = get_post_meta($post->ID, '_end_date', true);
    $show_in_contact = get_post_meta($post->ID, '_show_in_contact', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label for="news_type">News-Typ</label></th>
            <td>
                <select name="news_type" id="news_type">
                    <option value="general" <?php selected($news_type, 'general'); ?>>Allgemein</option>
                    <option value="vacation" <?php selected($news_type, 'vacation'); ?>>Urlaub</option>
                    <option value="hours" <?php selected($news_type, 'hours'); ?>>Öffnungszeiten</option>
                    <option value="service" <?php selected($news_type, 'service'); ?>>Neue Leistung</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="priority">Priorität</label></th>
            <td>
                <select name="priority" id="priority">
                    <option value="low" <?php selected($priority, 'low'); ?>>Niedrig</option>
                    <option value="medium" <?php selected($priority, 'medium'); ?>>Mittel</option>
                    <option value="high" <?php selected($priority, 'high'); ?>>Hoch</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="icon">FontAwesome Icon</label></th>
            <td>
                <input type="text" name="icon" id="icon" value="<?php echo esc_attr($icon); ?>" placeholder="fa-info-circle" />
                <p class="description">Z.B.: fa-plane, fa-clock, fa-heartbeat, fa-info-circle</p>
            </td>
        </tr>
        <tr>
            <th><label for="start_date">Startdatum</label></th>
            <td><input type="date" name="start_date" id="start_date" value="<?php echo esc_attr($start_date); ?>" /></td>
        </tr>
        <tr>
            <th><label for="end_date">Enddatum (optional)</label></th>
            <td><input type="date" name="end_date" id="end_date" value="<?php echo esc_attr($end_date); ?>" /></td>
        </tr>
        <tr>
            <th><label for="show_in_contact">In Kontakt-Sektion anzeigen</label></th>
            <td><input type="checkbox" name="show_in_contact" id="show_in_contact" value="1" <?php checked($show_in_contact, '1'); ?> /></td>
        </tr>
    </table>
    <?php
}

function save_praxis_news_meta($post_id) {
    if (!isset($_POST['praxis_news_meta_nonce']) || !wp_verify_nonce($_POST['praxis_news_meta_nonce'], 'praxis_news_meta_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    $fields = ['news_type', 'priority', 'icon', 'start_date', 'end_date', 'show_in_contact'];
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'save_praxis_news_meta');

// REST API Endpoint für News
function get_praxis_news_api() {
    $args = array(
        'post_type' => 'praxis_news',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => '_start_date',
                'value' => date('Y-m-d'),
                'compare' => '<='
            )
        )
    );
    
    $posts = get_posts($args);
    $news_data = array();
    
    foreach ($posts as $post) {
        $end_date = get_post_meta($post->ID, '_end_date', true);
        
        // Prüfen ob News noch aktiv ist
        if ($end_date && strtotime($end_date) < time()) {
            continue;
        }
        
        $news_data[] = array(
            'id' => 'wp-' . $post->ID,
            'type' => get_post_meta($post->ID, '_news_type', true) ?: 'general',
            'title' => $post->post_title,
            'content' => apply_filters('the_content', $post->post_content),
            'startDate' => get_post_meta($post->ID, '_start_date', true),
            'endDate' => get_post_meta($post->ID, '_end_date', true),
            'priority' => get_post_meta($post->ID, '_priority', true) ?: 'medium',
            'icon' => get_post_meta($post->ID, '_icon', true) ?: 'fa-info-circle',
            'showInContact' => get_post_meta($post->ID, '_show_in_contact', true) === '1'
        );
    }
    
    return rest_ensure_response($news_data);
}

// REST API Route registrieren
function register_praxis_news_api_route() {
    register_rest_route('praxis/v1', '/news', array(
        'methods' => 'GET',
        'callback' => 'get_praxis_news_api',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_praxis_news_api_route');
?>
```

#### 2. JavaScript für WordPress-Integration (script.js ersetzen):
```javascript
/**
 * WordPress-Integration für News System
 */
function getNewsConfiguration() {
    // Diese Funktion wird durch WordPress REST API ersetzt
    return []; // Leer lassen
}

/**
 * Load News from WordPress REST API
 */
async function loadNewsFromWordPress() {
    try {
        const response = await fetch('/wp-json/praxis/v1/news');
        if (!response.ok) {
            throw new Error('News API nicht verfügbar');
        }
        
        const newsData = await response.json();
        return newsData;
        
    } catch (error) {
        console.error('Fehler beim Laden der News:', error);
        // Fallback zu lokaler Konfiguration
        return getNewsConfiguration();
    }
}

/**
 * Load and Display News Items (WordPress Version)
 */
async function loadNews() {
    const newsItems = await loadNewsFromWordPress();
    
    const container = document.getElementById('news-container');
    const noNewsMessage = document.getElementById('no-news-message');
    
    if (!container) return;
    
    if (newsItems.length === 0) {
        container.style.display = 'none';
        if (noNewsMessage) noNewsMessage.style.display = 'block';
        return;
    }
    
    // Show news container and hide no-news message
    container.style.display = 'block';
    if (noNewsMessage) noNewsMessage.style.display = 'none';
    
    // Sort by priority and date
    newsItems.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.startDate) - new Date(a.startDate);
    });
    
    // Generate HTML for news items
    container.innerHTML = newsItems.map(item => generateNewsCardHTML(item)).join('');
}

/**
 * Load Hours Alert from WordPress
 */
async function loadHoursAlert() {
    const hoursAlert = document.getElementById('hours-alert');
    const hoursAlertText = document.getElementById('hours-alert-text');
    
    if (!hoursAlert || !hoursAlertText) return;
    
    try {
        const newsItems = await loadNewsFromWordPress();
        const hoursAlerts = newsItems.filter(item => 
            item.type === 'hours' && item.showInContact
        );
        
        if (hoursAlerts.length > 0) {
            const alert = hoursAlerts[0];
            hoursAlertText.innerHTML = alert.content;
            hoursAlert.style.display = 'block';
        }
    } catch (error) {
        console.error('Fehler beim Laden der Öffnungszeiten-Alerts:', error);
    }
}
```

---

## 🥈 **Lösung 2: WordPress Custom Fields (Einfacher)**

### **Für weniger technische Benutzer:**

#### 1. WordPress-Plugin installieren:
- **Advanced Custom Fields (ACF)** - Kostenlos
- Oder **Meta Box** - Alternative

#### 2. Custom Fields erstellen:
```
Feldgruppe: "Praxis Neuigkeiten"
- Titel (Text)
- Nachricht (WYSIWYG Editor)  
- Typ (Select: Urlaub, Öffnungszeiten, Service, Allgemein)
- Priorität (Select: Hoch, Mittel, Niedrig)
- Startdatum (Date Picker)
- Enddatum (Date Picker)
- Icon (Text)
- In Kontakt anzeigen (True/False)
```

#### 3. Einfache JavaScript-Integration:
```javascript
// WordPress Custom Fields über AJAX laden
function loadWordPressNews() {
    jQuery.post(ajaxurl, {
        action: 'get_praxis_news'
    }, function(response) {
        if (response.success) {
            displayNews(response.data);
        }
    });
}
```

---

## 🥉 **Lösung 3: WordPress Plugin Integration**

### **Existierende Plugins nutzen:**

#### **Option A: WP Announcements Pro**
- Drag & Drop Editor
- Zeitgesteuerte Anzeige
- Responsive Design

#### **Option B: Ultimate Member + Announcements**
- Benutzergruppen-spezifische Nachrichten
- E-Mail Integration

#### **Option C: Custom Post Type UI + Elementor**
- Visueller Editor
- Drag & Drop Design

---

## 📋 **WordPress Dashboard - So sieht es aus:**

```
WordPress Admin → Praxis News
├── Alle Neuigkeiten (Liste aller News)
├── Neue Neuigkeit hinzufügen
│   ├── Titel: "Winterurlaub Dr. Riedmüller"
│   ├── Inhalt: [WYSIWYG Editor]
│   ├── News-Typ: [Dropdown] Urlaub
│   ├── Priorität: [Dropdown] Hoch  
│   ├── Icon: fa-plane
│   ├── Startdatum: 2024-02-01
│   ├── Enddatum: 2024-02-29
│   └── ☑ In Kontakt-Sektion anzeigen
└── Veröffentlichen [Button]
```

---

## 🎯 **Praktische Verwendung im WordPress Dashboard:**

### **Urlaubszeit hinzufügen:**
1. **WordPress Admin** → **Praxis News** → **Neue Neuigkeit hinzufügen**
2. **Titel:** "Winterurlaub Dr. Riedmüller"  
3. **Inhalt:** "Die Ordination ist vom **15. bis 29. Februar 2024** geschlossen..."
4. **News-Typ:** Urlaub
5. **Priorität:** Hoch
6. **Startdatum:** 2024-02-01 (wann die Meldung erscheinen soll)
7. **Enddatum:** 2024-02-29 (wann sie verschwinden soll)
8. **Icon:** fa-plane
9. ✅ **In Kontakt-Sektion anzeigen** aktivieren
10. **Veröffentlichen** klicken

### **Neue Leistung ankündigen:**
1. **Neue Neuigkeit hinzufügen**
2. **Titel:** "Neu: 24h-Blutdruckmessung"
3. **News-Typ:** Service  
4. **Priorität:** Mittel
5. **Enddatum:** Leer lassen (permanent)
6. **Icon:** fa-heartbeat

### **Dringende Mitteilung:**
1. **News-Typ:** Allgemein
2. **Priorität:** Hoch
3. **Startdatum:** Heute
4. **Enddatum:** Morgen

---

## 🔧 **Migration Checkliste:**

### **1. WordPress Theme Anpassung:**
```php
// In der functions.php des Themes
function enqueue_praxis_news_scripts() {
    wp_enqueue_script('praxis-news', get_template_directory_uri() . '/js/praxis-news.js', array('jquery'), '1.0', true);
    wp_localize_script('praxis-news', 'praxis_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('praxis_news_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_praxis_news_scripts');
```

### **2. HTML Template integrieren:**
```php
// In Ihrem WordPress Template (z.B. index.php oder front-page.php)
<!-- News Section HTML aus der aktuellen Website hier einfügen -->
<section id="news" class="py-16 bg-gray-50">
    <!-- Existing HTML structure -->
</section>
```

### **3. CSS & JavaScript:**
- Aktuelle `css/style.css` → WordPress Theme CSS
- Angepasste `js/script.js` → WordPress Theme JS  

---

## 🎉 **Vorteile der WordPress-Integration:**

✅ **Benutzerfreundlich** - Einfaches Dashboard-Interface  
✅ **Zeitgesteuert** - Automatisches Ein-/Ausblenden  
✅ **Versionskontrolle** - Revisionen und Backups  
✅ **Mehrbenutzer** - Verschiedene Redakteure  
✅ **SEO-optimiert** - Automatische Meta-Tags  
✅ **Mobile-friendly** - Responsive Admin-Interface  
✅ **Backup-Integration** - Automatische Sicherungen  
✅ **Plugin-Ecosystem** - Erweiterbar  

---

## 📞 **Support & Implementierung:**

**Empfohlener Workflow:**
1. **Lösung 1** für professionelle WordPress-Entwicklung  
2. **Lösung 2** für einfache Implementierung mit Plugins
3. **Lösung 3** für schnelle Plugin-basierte Integration

**Alle Lösungen ermöglichen es Ihnen, News über das vertraute WordPress-Dashboard zu verwalten, ohne Code zu bearbeiten!**
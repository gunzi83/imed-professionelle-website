/**
 * WordPress-Integration für imed2230 News System
 * 
 * Diese Datei ersetzt die loadNews() und loadHoursAlert() Funktionen
 * in der bestehenden script.js für WordPress-Integration
 */

/**
 * WordPress REST API Integration für News System
 */
class ImedWordPressNews {
    constructor() {
        this.apiUrl = '/wp-json/imed/v1/news';
        this.urgentApiUrl = '/wp-json/imed/v1/urgent-notifications';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 Minuten Cache
    }

    /**
     * Load News from WordPress REST API
     */
    async loadNewsFromWordPress() {
        const cacheKey = 'praxis_news';
        const cached = this.cache.get(cacheKey);
        
        // Cache prüfen
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(this.apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const newsData = await response.json();
            
            // In Cache speichern
            this.cache.set(cacheKey, {
                data: newsData,
                timestamp: Date.now()
            });
            
            console.log('✅ WordPress News geladen:', newsData.length, 'Einträge');
            return newsData;
            
        } catch (error) {
            console.error('❌ Fehler beim Laden der WordPress News:', error);
            
            // Fallback zu lokaler Konfiguration
            console.log('🔄 Fallback zu lokaler Konfiguration');
            return getNewsConfiguration();
        }
    }

    /**
     * Load Urgent Notifications from WordPress
     */
    async loadUrgentNotification() {
        try {
            const response = await fetch(this.urgentApiUrl);
            
            if (!response.ok) {
                return null;
            }
            
            const notification = await response.json();
            return notification;
            
        } catch (error) {
            console.error('❌ Fehler beim Laden der dringenden Benachrichtigung:', error);
            return null;
        }
    }

    /**
     * Show urgent notification if available
     */
    async showUrgentNotificationIfAvailable() {
        const notification = await this.loadUrgentNotification();
        
        if (notification && notification.message) {
            showNotification(notification.message, notification.type || 'urgent', notification.icon);
        }
    }
}

// Globale Instanz erstellen
const imedWpNews = new ImedWordPressNews();

/**
 * WordPress-kompatible loadNews Funktion
 * Ersetzt die ursprüngliche loadNews() Funktion
 */
async function loadNews() {
    const newsItems = await imedWpNews.loadNewsFromWordPress();
    
    const container = document.getElementById('news-container');
    const noNewsMessage = document.getElementById('no-news-message');
    
    if (!container) {
        console.warn('⚠️ News-Container nicht gefunden');
        return;
    }
    
    // Filtern nur aktiver News (WordPress macht bereits Server-seitige Filterung)
    const activeNews = newsItems.filter(item => {
        // Zusätzliche Client-seitige Überprüfung
        const now = new Date();
        const startDate = new Date(item.startDate);
        const endDate = item.endDate ? new Date(item.endDate) : null;
        
        return now >= startDate && (!endDate || now <= endDate);
    });
    
    if (activeNews.length === 0) {
        container.style.display = 'none';
        if (noNewsMessage) {
            noNewsMessage.style.display = 'block';
        }
        console.log('ℹ️ Keine aktiven News gefunden');
        return;
    }
    
    // Show news container and hide no-news message
    container.style.display = 'block';
    if (noNewsMessage) {
        noNewsMessage.style.display = 'none';
    }
    
    // Sortierung (WordPress macht bereits Server-seitige Sortierung, aber zur Sicherheit)
    activeNews.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        const aPriority = priorityOrder[a.priority] || 2;
        const bPriority = priorityOrder[b.priority] || 2;
        
        if (aPriority !== bPriority) {
            return bPriority - aPriority;
        }
        
        return new Date(b.startDate) - new Date(a.startDate);
    });
    
    // Generate HTML for news items
    container.innerHTML = activeNews.map(item => generateNewsCardHTML(item)).join('');
    
    console.log('✅ News erfolgreich angezeigt:', activeNews.length, 'Einträge');
}

/**
 * WordPress-kompatible loadHoursAlert Funktion
 * Ersetzt die ursprüngliche loadHoursAlert() Funktion
 */
async function loadHoursAlert() {
    const hoursAlert = document.getElementById('hours-alert');
    const hoursAlertText = document.getElementById('hours-alert-text');
    
    if (!hoursAlert || !hoursAlertText) {
        console.warn('⚠️ Hours-Alert Elemente nicht gefunden');
        return;
    }
    
    try {
        const newsItems = await imedWpNews.loadNewsFromWordPress();
        
        // Filter für Öffnungszeiten-Alerts
        const hoursAlerts = newsItems.filter(item => 
            (item.type === 'hours' || item.type === 'vacation') && 
            item.showInContact === true
        );
        
        if (hoursAlerts.length > 0) {
            // Wichtigste Alert anzeigen (höchste Priorität, neuestes Datum)
            const alert = hoursAlerts[0];
            hoursAlertText.innerHTML = alert.content;
            hoursAlert.style.display = 'block';
            
            console.log('✅ Öffnungszeiten-Alert angezeigt:', alert.title);
        } else {
            hoursAlert.style.display = 'none';
            console.log('ℹ️ Keine Öffnungszeiten-Alerts aktiv');
        }
        
    } catch (error) {
        console.error('❌ Fehler beim Laden der Öffnungszeiten-Alerts:', error);
        hoursAlert.style.display = 'none';
    }
}

/**
 * WordPress News System initialisieren
 * Ersetzt die ursprüngliche initializeNewsSystem() Funktion
 */
function initializeNewsSystem() {
    console.log('🚀 WordPress News System wird initialisiert...');
    
    // News laden
    loadNews();
    
    // Öffnungszeiten-Alerts laden
    loadHoursAlert();
    
    // Dringende Benachrichtigungen prüfen
    imedWpNews.showUrgentNotificationIfAvailable();
    
    // Auto-Refresh alle 5 Minuten für neue/geänderte News
    setInterval(() => {
        console.log('🔄 Auto-Refresh: WordPress News werden aktualisiert...');
        imedWpNews.cache.clear(); // Cache leeren für frische Daten
        loadNews();
        loadHoursAlert();
        imedWpNews.showUrgentNotificationIfAvailable();
    }, 5 * 60 * 1000);
    
    console.log('✅ WordPress News System erfolgreich initiated');
}

/**
 * WordPress Admin Bar Integration (falls Benutzer eingeloggt ist)
 */
function addWordPressAdminShortcuts() {
    // Prüfen ob WordPress Admin Bar vorhanden ist
    const adminBar = document.getElementById('wpadminbar');
    if (!adminBar) return;
    
    // Quick-Edit Button für News hinzufügen
    const quickEditStyle = document.createElement('style');
    quickEditStyle.textContent = `
        .imed-admin-quickedit {
            position: fixed;
            top: 32px;
            right: 20px;
            z-index: 99999;
            background: #0073aa;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .imed-admin-quickedit:hover {
            background: #005a87;
            color: white;
        }
    `;
    document.head.appendChild(quickEditStyle);
    
    // Quick-Edit Link hinzufügen
    const quickEditLink = document.createElement('a');
    quickEditLink.href = '/wp-admin/post-new.php?post_type=imed_praxis_news';
    quickEditLink.className = 'imed-admin-quickedit';
    quickEditLink.innerHTML = '📢 Neue Praxis-News';
    quickEditLink.target = '_blank';
    document.body.appendChild(quickEditLink);
    
    console.log('✅ WordPress Admin-Shortcuts hinzugefügt');
}

/**
 * WordPress-spezifische Initialisierung
 */
document.addEventListener('DOMContentLoaded', function() {
    // WordPress-spezifische Funktionen nur ausführen wenn WordPress erkannt wird
    if (typeof wp !== 'undefined' || document.querySelector('body.wordpress')) {
        console.log('✅ WordPress-Umgebung erkannt');
        
        // Admin-Shortcuts hinzufügen (falls Admin eingeloggt)
        if (document.querySelector('#wpadminbar')) {
            addWordPressAdminShortcuts();
        }
        
        // WordPress-spezifisches Event Handling
        window.addEventListener('load', function() {
            // Nach vollständigem Laden nochmals News prüfen
            setTimeout(() => {
                loadNews();
                loadHoursAlert();
            }, 1000);
        });
    }
});

/**
 * Fallback getNewsConfiguration für Rückwärtskompatibilität
 * Falls WordPress API nicht verfügbar ist
 */
function getNewsConfiguration() {
    console.log('⚠️ Fallback zu lokaler News-Konfiguration');
    
    // Hier können Sie weiterhin lokale News eintragen als Fallback
    return [
        // Beispiel für Fallback-News:
        /*
        {
            id: 'fallback-info',
            type: 'general',
            title: 'WordPress Integration verfügbar',
            content: 'Neuigkeiten können nun über das WordPress-Dashboard verwaltet werden.',
            startDate: '2024-01-01',
            endDate: null,
            priority: 'medium',
            icon: 'fa-wordpress',
            showInContact: false
        }
        */
    ];
}

/**
 * Utility-Funktionen für WordPress-Integration
 */

// WordPress REST API Error Handling
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && event.reason.message.includes('wp-json')) {
        console.warn('⚠️ WordPress REST API Problem:', event.reason.message);
        console.log('🔄 Versuche lokale Konfiguration...');
        
        // Lokale Fallback-News laden
        const fallbackNews = getNewsConfiguration();
        if (fallbackNews.length > 0) {
            // Fallback-News anzeigen
            displayNews(fallbackNews);
        }
        
        event.preventDefault();
    }
});

// WordPress Media Library Integration (falls benötigt)
function openWordPressMediaLibrary() {
    if (typeof wp !== 'undefined' && wp.media) {
        const mediaLibrary = wp.media({
            title: 'Bild für News auswählen',
            multiple: false,
            library: { type: 'image' }
        });
        
        mediaLibrary.open();
        return mediaLibrary;
    }
    return null;
}

// Global verfügbare WordPress-Funktionen
window.imedWordPressNews = {
    loadNews: loadNews,
    loadHoursAlert: loadHoursAlert,
    reloadCache: () => imedWpNews.cache.clear(),
    showUrgentNotification: () => imedWpNews.showUrgentNotificationIfAvailable(),
    openMediaLibrary: openWordPressMediaLibrary
};

console.log(`
📢 WordPress News System für imed2230 geladen
🔗 API Endpoint: /wp-json/imed/v1/news
🚨 Urgent API: /wp-json/imed/v1/urgent-notifications
⚡ Auto-Refresh: 5 Minuten
💾 Cache: 5 Minuten

Verwendung im WordPress Dashboard:
1. Praxis News → Neue Neuigkeit hinzufügen
2. Inhalt eingeben und Einstellungen konfigurieren
3. Veröffentlichen → Erscheint automatisch auf der Website

Entwickler-Funktionen:
- window.imedWordPressNews.loadNews() - News neu laden
- window.imedWordPressNews.reloadCache() - Cache leeren
- window.imedWordPressNews.showUrgentNotification() - Dringende Benachrichtigungen prüfen
`);
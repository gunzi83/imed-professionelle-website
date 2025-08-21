# 🚀 WordPress Quick Setup - imed2230 News System

## ⚡ Schnellstart-Anleitung für WordPress

### 📋 **Was Sie brauchen:**
✅ WordPress Website (lokal oder online)  
✅ Admin-Zugang zum WordPress Dashboard  
✅ Möglichkeit, Code in `functions.php` einzufügen  
✅ 5-10 Minuten Zeit  

---

## 🎯 **3-Schritte Installation:**

### **Schritt 1: WordPress Backend einrichten (2 Min)**

1. **WordPress Admin** → **Design** → **Theme-Editor** öffnen
2. **`functions.php`** auswählen
3. **Den kompletten Code aus `wordpress-functions.php`** am Ende der Datei einfügen
4. **Datei aktualisieren** klicken

**✅ Fertig!** Sie sehen jetzt "Praxis News" im WordPress-Menü.

---

### **Schritt 2: Frontend integrieren (3 Min)**

#### **Option A: Einfache Integration**
1. **Design** → **Customizer** → **Zusätzliches CSS** 
2. CSS-Styles aus der `index.html` (Notification System Styles) kopieren
3. JavaScript aus `wordpress-script.js` in die Footer-Sektion einfügen

#### **Option B: Theme-Dateien bearbeiten**  
1. HTML-Struktur aus `index.html` in Ihr Theme kopieren:
   - News-Sektion zwischen Hero und About
   - Notification Banner nach Header
   - Hours Alert in Kontakt-Sektion
2. `wordpress-script.js` als Theme-Asset einbinden

---

### **Schritt 3: Erste News erstellen (1 Min)**

1. **WordPress Admin** → **Praxis News** → **Neue Neuigkeit hinzufügen**
2. **Titel:** "Testmeldung - System funktioniert!"
3. **Inhalt:** "Das neue News-System ist erfolgreich eingerichtet."
4. **Einstellungen:**
   - News-Typ: Allgemein
   - Priorität: Mittel  
   - Startdatum: Heute
5. **Veröffentlichen** klicken

**🎉 Geschafft!** Die News erscheint automatisch auf Ihrer Website.

---

## 📱 **So verwenden Sie das System:**

### **Urlaubszeit eintragen:**
```
Titel: Winterurlaub Dr. Riedmüller
Typ: 🟠 Urlaub  
Priorität: 🔴 Hoch
Inhalt: Die Ordination ist vom **15. bis 29. Februar 2024** geschlossen. 
        Vertretung: Dr. Mustermann (Tel: 02282-12345)
Startdatum: 2024-02-01 (wann die Meldung erscheinen soll)
Enddatum: 2024-02-29 (wann sie verschwinden soll)
Icon: fa-plane
☑ In Kontakt-Sektion anzeigen
☐ Dringende Benachrichtigung
```

### **Geänderte Öffnungszeiten:**
```
Titel: Geänderte Öffnungszeiten  
Typ: 🔵 Öffnungszeiten
Priorität: 🟡 Mittel
Inhalt: Am **Donnerstag, 25. Januar** nur von 10:00-12:00 Uhr geöffnet.
Icon: fa-clock
☑ In Kontakt-Sektion anzeigen
```

### **Neue Leistung:**
```
Titel: Neu: 24h-Blutdruckmessung
Typ: 🟢 Neue Leistung  
Priorität: 🟡 Mittel
Inhalt: Ab sofort verfügbar. Termine unter 02282-52827.
Enddatum: (leer lassen für permanent)
Icon: fa-heartbeat
☐ In Kontakt-Sektion anzeigen
```

### **Dringende Mitteilung:**
```
Titel: Praxis heute geschlossen
Typ: 🔵 Allgemein
Priorität: 🔴 Hoch  
Inhalt: Aufgrund eines Notfalls bleibt die Praxis heute geschlossen.
☑ Dringende Benachrichtigung (erscheint als roter Banner oben)
```

---

## 🎨 **Anpassungen & Styling:**

### **Farben ändern:**
```css
/* In WordPress → Design → Customizer → Zusätzliches CSS */

/* News-Typ Farben anpassen */
.news-type-vacation { background: #FEF3C7; color: #92400E; }  /* Urlaub */
.news-type-hours { background: #DBEAFE; color: #1E40AF; }     /* Öffnungszeiten */
.news-type-service { background: #D1FAE5; color: #065F46; }   /* Service */

/* Notification Banner Farben */
.notification-banner.urgent {
    background: linear-gradient(90deg, #DC2626 0%, #B91C1C 100%);
}
```

### **Icons ändern:**
Verwenden Sie **FontAwesome Icons**:
- `fa-plane` - Flugzeug (Urlaub)
- `fa-clock` - Uhr (Öffnungszeiten)
- `fa-heartbeat` - Herzschlag (Medizin)
- `fa-plus-circle` - Plus (Neu)
- `fa-exclamation-triangle` - Warnung
- `fa-info-circle` - Information
- [Vollständige Icon-Liste](https://fontawesome.com/icons)

---

## 🔧 **API Endpoints (Automatisch verfügbar):**

Nach der Installation sind diese URLs verfügbar:

- **Alle News:** `/wp-json/imed/v1/news`
- **Dringende Benachrichtigungen:** `/wp-json/imed/v1/urgent-notifications`

Sie können diese URLs direkt im Browser testen.

---

## 📊 **WordPress Dashboard Features:**

### **News-Übersicht:**
```
Praxis News → Alle Neuigkeiten
├── 📋 Typ (Urlaub, Öffnungszeiten, Service, Allgemein)
├── ⭐ Priorität (Hoch, Mittel, Niedrig)  
├── 📅 Aktiv-Zeitraum (Von/Bis wann angezeigt)
├── 🏷️ Status (Aktiv, Geplant, Abgelaufen)
└── Schnellaktionen (Bearbeiten, Löschen)
```

### **Dashboard Widget:**
Im WordPress-Hauptbereich sehen Sie ein **"📢 Aktuelle Praxis-News"** Widget mit:
- Übersicht aktiver News
- Quick-Links zum Bearbeiten
- "Neue Neuigkeit erstellen" Button

---

## ✅ **Sofort einsatzbereit:**

Nach der Installation haben Sie:

🎯 **Professionelles News-Management** über WordPress Dashboard  
📱 **Responsive Design** für alle Geräte  
⏰ **Zeitgesteuerte Anzeige** mit automatischem Ein-/Ausblenden  
🔔 **Dringende Benachrichtigungen** mit rotem Alarm-Banner  
📊 **Übersichtliches Dashboard** mit Status-Anzeigen  
🔄 **Automatisches Caching** für bessere Performance  
🎨 **Anpassbares Design** über WordPress Customizer  
👥 **Mehrbenutzerfähig** mit WordPress-Benutzerrollen  

---

## 🆘 **Support & Troubleshooting:**

### **Problem: News erscheinen nicht**
✅ Prüfen Sie das Startdatum (muss heute oder früher sein)  
✅ Status auf "Veröffentlicht" setzen  
✅ Browser-Cache leeren (Strg+F5)  

### **Problem: API funktioniert nicht**
✅ WordPress Permalinks neu speichern: **Einstellungen** → **Permalinks** → **Speichern**  
✅ REST API aktiviert: **Einstellungen** → **Lesen** → REST API nicht deaktiviert  

### **Problem: Styling fehlt**
✅ CSS-Styles in **Design** → **Customizer** → **Zusätzliches CSS** einfügen  
✅ JavaScript in Theme einbinden oder über Plugin hinzufügen  

---

**🎉 Ihr professionelles News-System ist jetzt einsatzbereit!**

*Alle News werden automatisch basierend auf Datum und Priorität angezeigt. Für weitere Anpassungen siehe `WORDPRESS_INTEGRATION.md`*
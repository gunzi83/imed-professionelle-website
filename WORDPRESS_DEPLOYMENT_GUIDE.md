# WordPress Deployment Guide für imed2230

## 📋 Übersicht

Diese Anleitung zeigt Ihnen **3 verschiedene Wege**, wie Sie Ihre optimierte imed2230 Website mit WordPress veröffentlichen können:

1. **🚀 WordPress.com Hosting** (Einfachste Lösung)
2. **🏢 Professionelles Shared Hosting** (Empfohlen)  
3. **⚙️ Custom Theme Installation** (Für Entwickler)

---

## 🚀 Option 1: WordPress.com Hosting (Einfachste Lösung)

### Voraussetzungen
- WordPress.com Account
- Premium/Business Plan (für Custom Themes)

### Schritte

#### 1. WordPress.com Account erstellen
```bash
# Gehen Sie zu: https://wordpress.com/
# Erstellen Sie einen Account
# Wählen Sie einen Plan (Business Plan empfohlen)
```

#### 2. Theme-Dateien vorbereiten
Die folgenden Dateien sind bereits für Sie erstellt:
- `wordpress-header.php` → `header.php`
- `wordpress-footer.php` → `footer.php`
- `wordpress-template-index.php` → `index.php`
- `wordpress-theme-setup.php` → `functions.php`
- `wordpress-news-system.php` → `inc/news-system.php`
- `css/style.css` → bleibt unverändert
- `images/` → alle Bilder kopieren

#### 3. Theme-Struktur erstellen
```
imed2230-theme/
├── style.css (Theme Header + CSS aus css/style.css)
├── index.php (aus wordpress-template-index.php)
├── header.php (aus wordpress-header.php)
├── footer.php (aus wordpress-footer.php)
├── functions.php (aus wordpress-theme-setup.php)
├── inc/
│   └── news-system.php (aus wordpress-news-system.php)
├── css/
│   └── style.css (Original CSS-Datei)
├── js/
│   └── script.js (falls vorhanden)
└── images/
    └── (alle Bilder aus images/ Ordner)
```

#### 4. style.css Header erstellen
```css
/*
Theme Name: imed2230 - Dr. Gunter Riedmüller
Description: Professionelles WordPress Theme für die Kassenordination Dr. Gunter Riedmüller in Gänserndorf
Version: 1.0
Author: imed2230
*/

@import url('./css/style.css');
```

---

## 🏢 Option 2: Professionelles Shared Hosting (Empfohlen)

### Hosting-Anbieter Empfehlungen (Österreich)
- **World4You** (österreichisch, sehr gut)
- **Hosting.at** (österreichisch)
- **SiteGround** (international, WordPress-spezialisiert)
- **Webgo** (deutsch, günstig)

### Schritte

#### 1. Hosting buchen
```bash
# Wählen Sie ein WordPress Hosting Paket
# Mindestens: 1 GB Speicher, MySQL Datenbank, SSL
# Domain: imed2230.at oder imed-gaenserndorf.at
```

#### 2. WordPress installieren
```bash
# Meistens 1-Click Installation verfügbar
# Oder manuell: wordpress.org Download
# Database + wp-config.php konfigurieren
```

#### 3. Theme hochladen
```bash
# Via FTP oder Hosting Control Panel
# Theme-Ordner nach /wp-content/themes/
# Theme aktivieren im WordPress Admin
```

#### 4. Inhalte konfigurieren
```bash
# WordPress Admin → Erscheinungsbild → Customizer
# Praxis-Informationen eingeben:
# - Telefon: 02282-52827
# - Email: office@imed2230.at
# - Adresse: Brunnengasse 9, 2230 Gänserndorf
```

---

## ⚙️ Option 3: Custom Theme Installation (Für Entwickler)

### Für lokale Entwicklung

#### 1. WordPress lokal installieren
```bash
# XAMPP, MAMP oder Local by Flywheel
# WordPress herunterladen und installieren
```

#### 2. Theme-Dateien kopieren
```bash
# Alle Theme-Dateien nach:
# /wp-content/themes/imed2230/

# Dateistruktur:
wp-content/themes/imed2230/
├── style.css
├── index.php  
├── header.php
├── footer.php
├── functions.php
├── inc/news-system.php
├── css/style.css
├── images/ (alle Bilder)
└── js/ (JavaScript falls vorhanden)
```

#### 3. Theme aktivieren
```bash
# WordPress Admin → Erscheinungsbild → Themes
# "imed2230" Theme aktivieren
```

---

## 🔧 Detaillierte Setup-Schritte

### A) Theme-Dateien zusammenstellen

#### 1. Haupt-Theme-Dateien erstellen
```bash
# In WordPress Themes Ordner:
mkdir imed2230-theme
cd imed2230-theme

# Kopieren Sie die folgenden Dateien:
# wordpress-header.php → header.php
# wordpress-footer.php → footer.php  
# wordpress-template-index.php → index.php
# wordpress-theme-setup.php → functions.php
```

#### 2. style.css mit Theme Header
```css
/*
Theme Name: imed2230 - Dr. Gunter Riedmüller
Description: Kassenordination für Innere Medizin in Gänserndorf. Moderne WordPress-Website mit Fokus auf Herz-Kreislauf-Erkrankungen und Diabetes.
Version: 1.0.0
Author: Dr. Gunter Riedmüller
Author URI: https://imed2230.at
License: GPL v2 or later
Text Domain: imed2230
Domain Path: /languages
Tags: medical, healthcare, responsive, modern
Requires at least: 5.0
Tested up to: 6.3
Requires PHP: 7.4
*/

/* Import der Original CSS-Datei */
@import url('./css/style.css');
```

#### 3. News-System einrichten
```bash
mkdir inc
# wordpress-news-system.php → inc/news-system.php kopieren
```

### B) WordPress Konfiguration

#### 1. Customizer Einstellungen
Im WordPress Admin unter **Erscheinungsbild → Customizer → Praxis Informationen**:
- **Telefon**: 02282-52827
- **E-Mail**: office@imed2230.at  
- **Adresse**: Brunnengasse 9, 2230 Gänserndorf

#### 2. Menüs erstellen
**Erscheinungsbild → Menüs**:
```
Hauptmenü (Primary):
- Start (#home)
- Leistungen (#services) 
- Über uns (#about)
- Kontakt (#contact)
- Aktuelles (#news)

Footer Menü:
- Datenschutz
- Impressum
- AGB
```

#### 3. News-System nutzen
**Dashboard → Praxis News → Neue News**:
- Titel eingeben
- Inhalt schreiben
- Priorität wählen (Normal/Hoch/Dringend)
- Kategorie wählen
- Icon festlegen (z.B. "fas fa-calendar")
- "Auf Startseite anzeigen" aktivieren

### C) SEO & Performance

#### 1. SEO Plugin installieren
```bash
# Empfohlene Plugins:
# - Yoast SEO (kostenlos)
# - RankMath (kostenlos, sehr gut)
```

#### 2. Performance Optimierung
```bash
# Empfohlene Plugins:
# - W3 Total Cache (Caching)
# - Smush (Bild-Optimierung)
# - Autoptimize (CSS/JS Minimierung)
```

#### 3. Backup Plugin
```bash
# Empfohlene Plugins:
# - UpdraftPlus (kostenlos)
# - BackWPup (kostenlos)
```

---

## 📱 Mobile & Responsiv

### Automatische Features
- ✅ Vollständig responsive Design
- ✅ Mobile Navigation
- ✅ Touch-optimierte Buttons
- ✅ Retina-Display Support

### Test-Geräte
```bash
# Desktop: 1920x1080, 1366x768
# Tablet: 768x1024 (iPad)
# Mobile: 375x667 (iPhone), 360x640 (Android)
```

---

## 🔍 SEO Features (bereits integriert)

### Automatische SEO-Elemente
- ✅ Structured Data (Schema.org MedicalBusiness)
- ✅ Open Graph Tags
- ✅ Meta Description & Keywords
- ✅ Canonical URLs
- ✅ Lokale SEO (Gänserndorf, Niederösterreich)
- ✅ Mobile-optimiert
- ✅ Schnelle Ladezeiten

### Google My Business Integration
```bash
# Empfehlung: Google My Business Profil erstellen
# - Name: imed2230 - Dr. Gunter Riedmüller
# - Kategorie: Arzt / Internist
# - Adresse: Brunnengasse 9, 2230 Gänserndorf
# - Telefon: +43-2282-52827
# - Website: Ihre WordPress URL
# - Öffnungszeiten wie im Footer angegeben
```

---

## 🚀 Go-Live Checklist

### Vor dem Launch
- [ ] WordPress installiert und konfiguriert
- [ ] Theme hochgeladen und aktiviert
- [ ] Praxis-Informationen in Customizer eingegeben
- [ ] Menüs erstellt und zugewiesen
- [ ] SSL-Zertifikat aktiviert (https://)
- [ ] Test-News erstellt
- [ ] Mobile Darstellung getestet
- [ ] Kontaktformular getestet
- [ ] Backup eingerichtet

### Nach dem Launch
- [ ] Google Analytics einrichten
- [ ] Google Search Console registrieren
- [ ] Google My Business Profil erstellen
- [ ] Social Media Links hinzufügen
- [ ] Regelmäßige Updates planen

---

## 📞 Support & Wartung

### Regelmäßige Aufgaben
- **Wöchentlich**: News und Inhalte aktualisieren
- **Monatlich**: WordPress Core & Plugin Updates
- **Quartalsweise**: Backup-Test und Performance-Check

### Wichtige URLs nach Installation
```bash
# WordPress Admin: ihre-domain.at/wp-admin
# Theme Customizer: Admin → Erscheinungsbild → Customizer
# News Verwaltung: Admin → Praxis News
# Menü Verwaltung: Admin → Erscheinungsbild → Menüs
```

---

## ⚡ Schnellstart für Hosting-Anbieter

### World4You (Österreich)
1. **Paket wählen**: WordPress Hosting Standard (ab €4,90/Monat)
2. **Domain**: imed2230.at registrieren
3. **WordPress installieren**: 1-Click Installation nutzen
4. **Theme hochladen**: Via File Manager oder FTP
5. **Konfigurieren**: Customizer-Einstellungen vornehmen

### SiteGround (International)  
1. **Paket wählen**: StartUp Plan (ab €2,99/Monat)
2. **WordPress installieren**: Automatisch beim Setup
3. **Theme hochladen**: Site Tools → File Manager
4. **Staging**: Test-Umgebung für Updates nutzen

---

## 🎯 Fazit

**Empfehlung für Dr. Riedmüller:**
1. **Für Einsteiger**: WordPress.com Business Plan
2. **Für Professionelle Lösung**: Österreichisches Hosting (World4You) + Custom Theme
3. **Für maximale Kontrolle**: Eigenes Hosting + vollständige Theme-Installation

Alle notwendigen Dateien sind bereits erstellt und optimiert. Die Website ist vollständig responsive, SEO-optimiert und bereit für den professionellen Einsatz.

**Nächste Schritte**: Wählen Sie eine Option und folgen Sie der entsprechenden Anleitung. Bei Fragen können die WordPress-Community oder professionelle WordPress-Entwickler helfen.
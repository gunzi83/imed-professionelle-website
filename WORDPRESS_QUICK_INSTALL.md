# 🚀 WordPress Quick Install für imed2230

## ⚡ Schnellste Lösung: 5-Minuten Setup

### 📋 Was Sie brauchen
- [ ] WordPress Hosting (z.B. World4You, SiteGround)
- [ ] FTP Zugang oder File Manager
- [ ] Diese vorbereiteten Theme-Dateien

### 📁 Theme-Dateien Liste
```
imed2230-wordpress-theme/
├── style.css          ← wordpress-style.css (mit WordPress Header)
├── index.php          ← wordpress-template-index.php  
├── header.php         ← wordpress-header.php
├── footer.php         ← wordpress-footer.php
├── functions.php      ← wordpress-theme-setup.php
├── inc/
│   └── news-system.php ← wordpress-news-system.php
├── css/
│   └── style.css      ← css/style.css (Original CSS)
├── js/
│   └── script.js      ← js/script.js (falls vorhanden)
└── images/
    ├── practice_exterior.png
    ├── dr-koudelka-photo.jpg
    └── (alle anderen Bilder)
```

---

## 🏃‍♂️ 3-Schritte Installation

### Schritt 1: WordPress Theme Ordner erstellen
```bash
# In Ihrem WordPress Installation:
# /wp-content/themes/imed2230/
```

### Schritt 2: Dateien kopieren
**Wichtig**: Dateien UMBENENNEN beim Kopieren:
- `wordpress-style.css` → `style.css`
- `wordpress-template-index.php` → `index.php`
- `wordpress-header.php` → `header.php`
- `wordpress-footer.php` → `footer.php`
- `wordpress-theme-setup.php` → `functions.php`
- `wordpress-news-system.php` → `inc/news-system.php`

### Schritt 3: Theme aktivieren
1. WordPress Admin → **Erscheinungsbild** → **Themes**
2. **imed2230** Theme auswählen
3. **Aktivieren** klicken

---

## 🛠️ Konfiguration (2 Minuten)

### Customizer Einstellungen
**WordPress Admin → Erscheinungsbild → Customizer → Praxis Informationen**

```bash
Telefonnummer: 02282-52827
E-Mail Adresse: office@imed2230.at  
Praxis Adresse: Brunnengasse 9, 2230 Gänserndorf
```

### Menü erstellen
**WordPress Admin → Erscheinungsbild → Menüs**

**Hauptmenü (Primary):**
- Start → Link zu: #home
- Leistungen → Link zu: #services
- Über uns → Link zu: #about  
- Kontakt → Link zu: #contact
- Aktuelles → Link zu: #news

**Menü zuweisen**: Hauptnavigation

---

## 📝 News-System Setup

### Erste Test-News erstellen
**WordPress Admin → Praxis News → Neue News**

```yaml
Titel: "Herzlich Willkommen in unserer Praxis"
Inhalt: "Wir freuen uns, Sie in unserer modernen Kassenordination begrüßen zu dürfen. Vereinbaren Sie gerne einen Termin."
Priorität: Normal
Kategorie: Allgemein  
Icon: fas fa-heart
☑️ Auf Startseite anzeigen
```

### Zweite News - Öffnungszeiten
```yaml
Titel: "Unsere Öffnungszeiten"
Inhalt: "Mo-Di, Do: 07:30-12:00 & 14:00-17:00 | Mi, Fr: 07:30-12:00 | Termine nach Vereinbarung"
Priorität: Hoch
Kategorie: Öffnungszeiten
Icon: fas fa-clock
☑️ Auf Startseite anzeigen  
```

---

## 🎨 Sofort einsatzbereit

### ✅ Was automatisch funktioniert
- **Responsive Design** für alle Geräte
- **SEO Optimierung** (Schema.org, Meta Tags)
- **Kontakt-Buttons** (Telefon klickbar)
- **Smooth Scrolling** Navigation
- **News-System** mit Admin-Interface
- **Google Maps** Integration vorbereitet
- **Social Media** Meta Tags

### 🔧 Optional: Plugins installieren
```bash
# WordPress Admin → Plugins → Installieren

# SEO (wählen Sie EINS):
- Yoast SEO (beliebt)
- RankMath (empfohlen)

# Performance:
- W3 Total Cache (Caching)
- Smush (Bild-Komprimierung)  

# Backup:
- UpdraftPlus (kostenlos)

# Kontaktformular:  
- Contact Form 7 (kostenlos)
- WPForms (Premium)
```

---

## 🌐 Domain & SSL Setup

### Domain Empfehlungen
```bash
# Hauptdomain Optionen:
imed2230.at                    # Kurz & prägnant  
praxis-riedmueller.at         # Name-basiert
internist-gaenserndorf.at     # SEO-optimiert  
kassenordination-gaenserndorf.at # Beschreibend
```

### SSL Zertifikat
```bash
# Bei den meisten Hosting-Anbietern kostenlos:
# → Hosting Control Panel → SSL → Let's Encrypt aktivieren
# → Automatische Weiterleitung von HTTP zu HTTPS aktivieren
```

---

## 📱 Mobile Testing

### Test URLs nach Installation
```bash
# Desktop: https://ihre-domain.at
# Mobile Simulator: Chrome DevTools (F12 → Mobile Icon)  
# Online Test: https://search.google.com/test/mobile-friendly
```

### Checklist Mobile
- [ ] Navigation funktioniert
- [ ] Telefonnummer klickbar  
- [ ] Alle Texte lesbar
- [ ] Buttons groß genug
- [ ] Ladezeit unter 3 Sekunden

---

## 🚀 Go-Live Checklist

### Vor Veröffentlichung
- [ ] Theme installiert & aktiviert
- [ ] Praxis-Daten in Customizer eingegeben
- [ ] Mindestens 2-3 Test-News erstellt
- [ ] Menü erstellt & zugewiesen  
- [ ] SSL aktiviert (https://)
- [ ] Mobile Darstellung getestet
- [ ] Telefonnummer-Link getestet

### Nach Go-Live  
- [ ] Google Search Console anmelden
- [ ] Google My Business Profil erstellen
- [ ] Backup Plugin installiert
- [ ] Performance optimiert
- [ ] SEO Plugin konfiguriert

---

## 📞 Hosting Empfehlungen Österreich

### 🥇 World4You (Österreichisch)
```bash
Paket: WordPress Hosting Standard  
Preis: ab €4,90/Monat
Domain: .at Domain inkludiert
Support: Deutsch, telefonisch
Installation: 1-Click WordPress Setup
SSL: Kostenlos (Let's Encrypt)
```

### 🥈 Hosting.at (Österreichisch)  
```bash
Paket: WordPress Professional
Preis: ab €8,90/Monat  
Domain: .at Domain inkludiert
Support: Deutsch, sehr gut
Installation: Automatisch
SSL: Kostenlos
```

### 🥉 SiteGround (International)
```bash  
Paket: StartUp Plan
Preis: ab €2,99/Monat (Einführungspreis)
Domain: Extra Kosten
Support: Englisch, 24/7  
Installation: Automatisch
SSL: Kostenlos
Besonderheit: Sehr schnell, WordPress-spezialisiert
```

---

## ⚡ Express Setup (10 Minuten)

### Hosting buchen → Theme installieren → Konfigurieren → Online!

1. **Hosting buchen** (World4You empfohlen) ⏱️ 5 Min
2. **WordPress installieren** (1-Click) ⏱️ 2 Min  
3. **Theme hochladen** (FTP/File Manager) ⏱️ 2 Min
4. **Grundkonfiguration** (Customizer) ⏱️ 1 Min

**Ergebnis**: Professionelle Praxis-Website online!

---

## 🎯 Sofort-Hilfe

### WordPress Admin Zugang vergessen?
```bash
# wp-config.php bearbeiten, folgende Zeile hinzufügen:
define('WP_DEBUG', true);

# Oder über Hosting Control Panel: 
# "WordPress Admin Passwort zurücksetzen"
```

### Theme aktivieren nicht möglich?
```bash
# Dateiberechtigungen prüfen:
# Ordner: 755 (rwxr-xr-x)  
# Dateien: 644 (rw-r--r--)

# Oder via FTP alle Dateien neu hochladen
```

### Website nicht erreichbar?
```bash
# DNS Propagation prüfen: https://dnschecker.org
# Kann bis zu 24h dauern bei neuen Domains
# SSL Zertifikat kann 5-10 Min brauchen
```

---

## 🎉 Fertig!

Ihre professionelle Praxis-Website ist jetzt online und einsatzbereit!

**URL Struktur nach Installation:**
```bash
https://imed2230.at/               # Startseite
https://imed2230.at/wp-admin/      # WordPress Admin
https://imed2230.at/news/          # News Archiv (automatisch)
```

**Nächste Schritte:**
1. Mehr News-Artikel erstellen
2. Google My Business Profil einrichten  
3. SEO Plugin installieren & konfigurieren
4. Regelmäßige Updates & Backups planen

**🎊 Ihre moderne Praxis-Website ist online!**
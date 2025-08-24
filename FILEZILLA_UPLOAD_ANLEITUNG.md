# 🚀 FileZilla Upload Anleitung - imed2230 Website

## 📋 Inhaltsverzeichnis
1. [Vorbereitung](#vorbereitung)
2. [FileZilla Einrichtung](#filezilla-einrichtung)
3. [Upload-Prozess](#upload-prozess)
4. [Dateienübersicht](#dateienübersicht)
5. [Nachbearbeitung](#nachbearbeitung)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Vorbereitung

### ✅ Deployment-Paket bereit
Alle wichtigen Dateien wurden in das `deployment-package` Verzeichnis kopiert:

```
deployment-package/
├── index.html          (115K) - Hauptwebsite
├── favicon.ico         (23B)  - Website-Icon
├── css/
│   └── style.css       (38K)  - Komplette CSS-Styles
├── js/
│   └── script.js       (24K)  - JavaScript-Funktionalität
└── images/
    ├── dr_riedmuller.png        (1.9M) - Arztfoto
    ├── dr_riedmuller_hero.jpg   (30K)  - Hero-Bild
    ├── heart_logo.png           (1.4M) - Herz-Logo groß
    ├── heart_original.png       (11K)  - Herz-Logo original
    ├── heart_symbol.svg         (581B) - Herz-Symbol SVG
    ├── heart_symbol_original.png (11K) - Herz-Symbol PNG
    ├── heart_transparent.svg    (689B) - Transparentes Herz SVG
    ├── imed2230_logo.png        (2.9K) - Praxis-Logo
    └── practice_exterior.png    (120K) - Praxis-Außenansicht
```

**Gesamtgröße:** ~3.7 MB

---

## 🔧 FileZilla Einrichtung

### 1. FileZilla Download & Installation
- Laden Sie FileZilla von der offiziellen Website herunter: https://filezilla-project.org/
- Installieren Sie die Software auf Ihrem Computer

### 2. Serververbindung einrichten

#### Option A: Schnellverbindung
1. Öffnen Sie FileZilla
2. Geben Sie Ihre Server-Daten in der oberen Leiste ein:
   - **Host/Server:** `ftp.ihr-hosting-provider.com` (oder IP-Adresse)
   - **Benutzername:** `ihr-ftp-benutzername`
   - **Passwort:** `ihr-ftp-passwort`
   - **Port:** `21` (FTP) oder `22` (SFTP)
3. Klicken Sie auf "Verbinden"

#### Option B: Site Manager (Empfohlen)
1. Klicken Sie auf **Datei** → **Site-Manager**
2. Klicken Sie auf **Neue Site**
3. Geben Sie einen Namen ein (z.B. "imed2230-website")
4. Konfigurieren Sie folgende Einstellungen:

```
Protokoll: FTP oder SFTP
Host: Ihre Server-Adresse
Port: 21 (FTP) oder 22 (SFTP)
Verschlüsselung: Explizites FTP über TLS (bei FTP)
Anmeldeart: Normal
Benutzer: Ihr FTP-Benutzername
Passwort: Ihr FTP-Passwort
```

5. Klicken Sie auf **Verbinden**

---

## 📤 Upload-Prozess

### Schritt 1: Verzeichnisstruktur prüfen
1. **Lokale Ansicht (links):** Navigieren Sie zu `/home/user/webapp/deployment-package/`
2. **Remote-Ansicht (rechts):** Navigieren Sie zum Website-Hauptverzeichnis Ihres Servers
   - Meist: `public_html/` oder `www/` oder `htdocs/`

### Schritt 2: Upload-Reihenfolge (Empfohlen)

#### 2.1 Hauptdateien hochladen
```
1. index.html        ← Hauptseite (zuerst)
2. favicon.ico       ← Website-Icon
```

#### 2.2 Stylesheets und Scripts
```
3. css/ (Ordner)     ← Kompletten Ordner hochladen
   └── style.css     ← CSS-Styles
4. js/ (Ordner)      ← Kompletten Ordner hochladen
   └── script.js     ← JavaScript
```

#### 2.3 Bilder (kann parallel laufen)
```
5. images/ (Ordner)  ← Kompletten Ordner hochladen
   ├── dr_riedmuller.png
   ├── dr_riedmuller_hero.jpg
   ├── heart_logo.png
   ├── heart_original.png
   ├── heart_symbol.svg
   ├── heart_symbol_original.png
   ├── heart_transparent.svg
   ├── imed2230_logo.png
   └── practice_exterior.png
```

### Schritt 3: Upload-Methoden

#### Methode A: Drag & Drop (Einfachste)
1. Markieren Sie alle Dateien im lokalen Bereich (links)
2. Ziehen Sie sie per Drag & Drop in den Remote-Bereich (rechts)
3. Bestätigen Sie den Upload

#### Methode B: Rechtsklick-Upload
1. Markieren Sie Dateien im lokalen Bereich
2. Rechtsklick → **Upload** oder **Hochladen**
3. Warten Sie auf die Übertragung

#### Methode C: Ordner-Upload
1. Rechtsklick auf den kompletten `deployment-package` Ordner
2. Wählen Sie **Upload** → Der gesamte Ordner wird hochgeladen

---

## 📊 Dateienübersicht für Upload

### 🔥 Kritische Dateien (müssen zuerst hochgeladen werden)
- **index.html** - Hauptwebsite
- **css/style.css** - Komplette Styles
- **js/script.js** - Website-Funktionalität

### 🎨 Design-Assets
- **favicon.ico** - Browser-Tab-Icon
- **images/imed2230_logo.png** - Hauptlogo (2.9K)
- **images/heart_logo.png** - Herz-Logo (1.4M)

### 👨‍⚕️ Praxis-Medien
- **images/dr_riedmuller.png** - Arztfoto (1.9M)
- **images/dr_riedmuller_hero.jpg** - Hero-Sektion Bild (30K)
- **images/practice_exterior.png** - Praxis-Außenansicht (120K)

### 🔧 Zusätzliche Assets
- **images/heart_symbol.svg** - SVG-Icons (581B)
- **images/heart_transparent.svg** - Transparente Icons (689B)
- **images/heart_original.png** - Backup-Icons (11K)
- **images/heart_symbol_original.png** - Original-Icons (11K)

---

## ⚡ Upload-Optimierung

### Reihenfolge für schnelle Website-Verfügbarkeit:
1. **Sofort sichtbar:** `index.html` → Website ist sofort erreichbar
2. **Design funktional:** `css/style.css` → Website sieht korrekt aus
3. **Interaktivität:** `js/script.js` → Alle Funktionen arbeiten
4. **Vollständige Optik:** `images/` → Alle Bilder werden angezeigt

### Transfer-Einstellungen optimieren:
```
Übertragungsart: Binär (für Bilder)
Gleichzeitige Übertragungen: 2-3
Wiederholung bei Fehler: 3x
Timeout: 20 Sekunden
```

---

## 🔍 Nachbearbeitung

### 1. Upload-Verifizierung
Nach dem Upload prüfen Sie:

**Datei-Integrität checken:**
- Alle Dateien vollständig hochgeladen?
- Dateigrößen stimmen überein?
- Ordnerstruktur korrekt?

**Website-Test:**
```
✅ Website erreichbar unter: www.ihre-domain.com
✅ CSS wird korrekt geladen (Design stimmt)
✅ JavaScript funktioniert (Buttons, Animationen)
✅ Alle Bilder werden angezeigt
✅ Favicon erscheint im Browser-Tab
```

### 2. Berechtigungen setzen (falls nötig)
Manchmal müssen Sie Dateiberechtigungen anpassen:
```
Dateien: 644 (rw-r--r--)
Ordner: 755 (rwxr-xr-x)
```

### 3. Cache leeren
- Browser-Cache leeren
- Server-Cache leeren (falls vorhanden)
- CDN-Cache leeren (falls verwendet)

---

## 🚨 Troubleshooting

### Häufige Upload-Probleme:

#### Problem: "Verbindung fehlgeschlagen"
**Lösung:**
- Server-Daten nochmals prüfen
- Firewall-Einstellungen überprüfen
- Passives/Aktives FTP umschalten
- SFTP statt FTP versuchen

#### Problem: "Upload schlägt fehl"
**Lösung:**
- Dateigröße prüfen (Limit überschritten?)
- Serverspeicher verfügbar?
- Berechtigungen im Zielordner korrekt?
- Dateinamen auf Sonderzeichen prüfen

#### Problem: "Bilder werden nicht angezeigt"
**Lösung:**
- Dateiberechtigungen auf 644 setzen
- Pfade in HTML prüfen (Groß-/Kleinschreibung)
- Bildformate unterstützt? (PNG, JPG, SVG)

#### Problem: "CSS wird nicht geladen"
**Lösung:**
- `css/style.css` Pfad korrekt?
- Datei vollständig hochgeladen?
- MIME-Type korrekt eingestellt?

---

## 📞 Support & Kontakt

**Bei Problemen wenden Sie sich an:**
- Ihren Hosting-Provider (technische Server-Probleme)
- Webentwickler (Code-/Design-Probleme)

**Website-Informationen:**
- **Domain:** www.imed2230.at
- **Praxis:** Dr. Gunter Riedmüller
- **Kontakt:** office@imed2230.at
- **Telefon:** 02282-52827

---

## ✅ Upload-Checkliste

**Vor dem Upload:**
- [ ] Server-Zugangsdaten verfügbar
- [ ] FileZilla installiert und konfiguriert
- [ ] Deployment-Package erstellt
- [ ] Backup der aktuellen Website erstellt (falls vorhanden)

**Während des Uploads:**
- [ ] index.html zuerst hochgeladen
- [ ] css/ Ordner komplett übertragen
- [ ] js/ Ordner komplett übertragen  
- [ ] images/ Ordner komplett übertragen
- [ ] favicon.ico übertragen

**Nach dem Upload:**
- [ ] Website im Browser getestet
- [ ] Alle Links funktionieren
- [ ] Bilder werden korrekt angezeigt
- [ ] Responsive Design funktioniert (Handy/Tablet testen)
- [ ] Kontaktformular getestet (falls vorhanden)
- [ ] Google Maps Integration funktioniert

---

*Erstellt am: 24. August 2025*  
*Status: Upload-Ready ✅*  
*Gesamtdateigröße: ~3.7 MB*
# 🚀 FileZilla Upload - Schnellreferenz

## 📦 Was hochladen?

**Verwenden Sie das `deployment-package` Verzeichnis:**
```
/home/user/webapp/deployment-package/
├── index.html          (115K)
├── favicon.ico         (23B)
├── css/style.css       (38K)
├── js/script.js        (24K)
└── images/ (9 Dateien) (~3.6M)
```

## ⚡ Schnell-Upload in 5 Schritten:

### 1. FileZilla öffnen
- Server: `ftp.ihr-provider.com`
- User: `ihr-username`  
- Passwort: `ihr-passwort`
- Port: `21` (FTP) oder `22` (SFTP)

### 2. Zielordner finden
Navigieren Sie zu:
- `public_html/` oder
- `www/` oder  
- `htdocs/`

### 3. Upload-Reihenfolge
1. **index.html** ← Zuerst! (Website sofort verfügbar)
2. **css/** ← Ordner komplett
3. **js/** ← Ordner komplett  
4. **images/** ← Ordner komplett
5. **favicon.ico** ← Browser-Icon

### 4. Drag & Drop
- Markieren Sie alle Dateien links
- Ziehen Sie sie nach rechts
- Warten Sie auf "Transfer abgeschlossen"

### 5. Test
Öffnen Sie: `www.ihre-domain.com`

## 🎯 Upload-Prioritäten

### 🔥 SOFORT (für funktionierende Website):
```
✅ index.html
✅ css/style.css  
✅ js/script.js
```

### 🎨 DANACH (für vollständige Optik):
```
✅ images/ (kompletter Ordner)
✅ favicon.ico
```

## 📊 Dateigrößen im Überblick
- **Gesamt:** ~3.7 MB
- **Größte Datei:** dr_riedmuller.png (1.9M)
- **Upload-Zeit:** 2-5 Minuten (je nach Verbindung)

## 🚨 Häufige Fehler vermeiden
- ❌ Nicht einzelne Dateien aus `images/` vergessen
- ❌ Nicht in falschen Server-Ordner hochladen
- ❌ CSS/JS-Ordner nicht vergessen
- ✅ Immer komplette Ordnerstruktur beibehalten

## 📞 Nach Upload testen:
- Website erreichbar? ✅
- Design korrekt? ✅  
- Bilder sichtbar? ✅
- Buttons funktionieren? ✅

---
**Bei Problemen:** Siehe detaillierte Anleitung in `FILEZILLA_UPLOAD_ANLEITUNG.md`
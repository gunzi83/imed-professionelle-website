# 🛠️ Entwicklungsanleitung - imed2230 Website

## 🚀 **Nie wieder manuell online stellen!**

Sie haben jetzt **zwei verschiedene Server** zur Verfügung:

### 1. 🔧 **Entwicklungsserver (Live-Reload)**
**Port 8080:** https://8080-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev
- **Automatische Aktualisierung** bei Dateiänderungen
- **Sofortige Vorschau** Ihrer Änderungen
- **Perfekt für Entwicklung**

### 2. 🌐 **Produktionsserver (Stabil)**
**Port 3000:** https://3000-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev
- **Stabile Version** für Besucher
- **Optimierte Performance**
- **Für finale Website**

---

## 📝 **So arbeiten Sie ab jetzt:**

### **Schritt 1: Datei bearbeiten**
```bash
# Bearbeiten Sie eine Datei (z.B. index.html, css/style.css, js/script.js)
nano index.html
# oder verwenden Sie Ihren bevorzugten Editor
```

### **Schritt 2: Änderung sofort sehen**
- **Öffnen Sie:** https://8080-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev
- **Speichern Sie** die Datei
- **Browser aktualisiert automatisch** (Live-Reload)
- **Keine manuelle Aktion nötig!**

### **Schritt 3: Wenn zufrieden → Produktionsserver aktualisieren**
```bash
npm run pm2:restart
```

---

## 🎯 **Praktisches Beispiel:**

### **Beispiel: Text auf der Homepage ändern**

1. **Datei öffnen:**
```bash
cd /home/user/webapp
nano index.html
```

2. **Text ändern** (z.B. in der Hero-Section)

3. **Speichern** (Strg+X, Y, Enter)

4. **Sofort sehen:** Browser auf Port 8080 aktualisiert automatisch!

5. **Gefällt Ihnen die Änderung?**
   - Ja → `npm run pm2:restart` (Produktionsserver aktualisieren)
   - Nein → Weiter bearbeiten und testen

---

## 🛠️ **Verfügbare Befehle:**

### **Entwicklung:**
```bash
# Entwicklungsserver starten
npm run dev

# Entwicklungsserver stoppen  
npm run dev:stop

# Entwicklungsserver neu starten
npm run dev:restart

# Status aller Server anzeigen
npm run pm2:status

# Logs anzeigen
npm run pm2:logs
```

### **Datei-Bearbeitung:**
```bash
# HTML bearbeiten
nano index.html

# CSS bearbeiten  
nano css/style.css

# JavaScript bearbeiten
nano js/script.js
```

---

## 📱 **Live-Reload Features:**

### ✅ **Was funktioniert automatisch:**
- HTML-Änderungen → Sofortige Aktualisierung
- CSS-Änderungen → Styles werden neu geladen
- JavaScript-Änderungen → Seite wird neu geladen
- Neue Dateien → Automatisch verfügbar

### 🔄 **Workflow:**
1. **Bearbeiten** → Datei ändern und speichern
2. **Testen** → Automatische Aktualisierung auf Port 8080
3. **Iterieren** → Weitere Änderungen machen
4. **Finalisieren** → Produktionsserver aktualisieren

---

## 🌐 **URLs im Überblick:**

| Zweck | URL | Verwendung |
|-------|-----|------------|
| **Entwicklung** | https://8080-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev | Live-Reload für Änderungen |
| **Produktion** | https://3000-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev | Finale Website für Besucher |

---

## 💡 **Profi-Tipps:**

### **1. Mehrere Browser-Tabs:**
- Tab 1: Entwicklungsserver (Port 8080) - für Änderungen
- Tab 2: Produktionsserver (Port 3000) - für finalen Check

### **2. Schnelle Änderungen:**
- Kleine Textänderungen → Nur auf Entwicklungsserver testen
- Große Änderungen → Erst ausgiebig testen, dann übernehmen

### **3. Backup vor großen Änderungen:**
```bash
# Backup erstellen
cp index.html index.html.backup
cp css/style.css css/style.css.backup
```

### **4. Fehlersuche:**
```bash
# Server-Status prüfen
npm run pm2:status

# Logs bei Problemen anzeigen  
npm run pm2:logs
```

---

## 🎉 **Das wars!**

**Nie wieder manuell online stellen!** Ihre Entwicklungsumgebung ist jetzt perfekt eingerichtet für effizientes Arbeiten.

**Happy Coding! 🚀**
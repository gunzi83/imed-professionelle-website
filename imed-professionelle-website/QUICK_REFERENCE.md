# 🚀 Quick Reference: imed2230 Website Management

## 🛡️ **SICHERHEIT ZUERST - Immer Backup machen!**

```bash
# Backup erstellen BEVOR Sie ändern
cd /home/user/webapp && ./backup.sh create
```

---

## 📝 **Häufigste Änderungs-Szenarien:**

### **1. 🕐 Ordinationszeiten ändern**
```bash
# 1. Backup erstellen
./backup.sh create

# 2. Datei bearbeiten
nano index.html
# Suchen nach "Ordinationszeiten" oder "opening-hours"

# 3. Testen auf: https://8080-...e2b.dev
# 4. Wenn OK: Speichern und pushen
./backup.sh save "Ordinationszeiten aktualisiert"
```

### **2. 📞 Kontaktdaten ändern**
```bash
# 1. Backup erstellen
./backup.sh create

# 2. Datei bearbeiten
nano index.html
# Suchen nach "02282-52827" oder "office@imed2230.at"

# 3. Testen und speichern
./backup.sh save "Kontaktdaten aktualisiert"
```

### **3. 📋 Leistungsspektrum erweitern**
```bash
# 1. Backup erstellen
./backup.sh create

# 2. Services-Sektion bearbeiten
nano index.html
# Suchen nach 'id="services"'

# 3. Testen und speichern
./backup.sh save "Neue Leistung hinzugefügt"
```

---

## ❌ **Wenn etwas schief geht:**

### **Stufe 1: Noch nicht gespeichert**
```bash
# Einfach Editor schließen ohne speichern
# Oder Strg+Z im Editor
```

### **Stufe 2: Gespeichert, aber noch nicht committed**
```bash
cd /home/user/webapp
./backup.sh emergency
# Oder manuell:
git checkout -- .
```

### **Stufe 3: Schon committed, aber Website kaputt**
```bash
cd /home/user/webapp

# Verfügbare Backups anzeigen
./backup.sh list

# Zu funktionierendem Backup zurück
./backup.sh restore backup-20241220-143022
```

### **Stufe 4: Alles kaputt - Notfall-Reset**
```bash
cd /home/user/webapp

# Zurück zum letzten funktionierenden Commit
git reset --hard HEAD~1

# Server neu starten
npm run pm2:restart
```

---

## 🔧 **Backup-Tool Befehle:**

```bash
cd /home/user/webapp

# Backup erstellen
./backup.sh create

# Alle Backups anzeigen  
./backup.sh list

# Backup wiederherstellen
./backup.sh restore backup-20241220-143022

# Notfall-Reset (alle Änderungen löschen)
./backup.sh emergency

# Schnell speichern und deployen
./backup.sh save "Meine Änderung"
```

---

## 🌐 **Wichtige URLs:**

| Zweck | URL |
|-------|-----|
| **Development (Live-Reload)** | https://8080-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev |
| **Production (Stabil)** | https://3000-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev |
| **GitHub Repository** | https://github.com/gunzi83/imed-professionelle-website |

---

## 📋 **Typischer Workflow:**

### **✅ Sichere Änderung machen:**
1. `./backup.sh create` - Backup erstellen
2. `nano index.html` - Datei bearbeiten  
3. Testen auf Development URL (Port 8080)
4. `./backup.sh save "Beschreibung"` - Speichern und deployen

### **❌ Änderung rückgängig machen:**
1. `./backup.sh list` - Verfügbare Backups anzeigen
2. `./backup.sh restore backup-YYYYMMDD-HHMMSS` - Backup wiederherstellen
3. Fertig! 🎉

---

## 🎯 **Pro-Tipps:**

### **1. Immer zuerst testen**
- Development Server (Port 8080) lädt automatisch neu
- Erst testen, dann committen

### **2. Kleine Schritte**
- Eine Änderung nach der anderen
- Nach jeder Änderung Backup

### **3. Aussagekräftige Backup-Namen**
```bash
# Gut:
./backup.sh save "Ordinationszeiten Do bis 19 Uhr erweitert"

# Schlecht:
./backup.sh save "Update"
```

### **4. Regelmäßig ausmisten**
```bash
# Alte Backups löschen (optional)
git branch -D backup-20241201-120000
```

---

## 🆘 **Notfall-Kontakte:**

Wenn gar nichts mehr geht:
- GitHub Repository: https://github.com/gunzi83/imed-professionelle-website
- Dort ist immer die letzte funktionierende Version gespeichert

---

## 📱 **Mobile Bearbeitung:**

Falls Sie mobil arbeiten:
```bash
# SSH in Terminal-App
ssh user@your-server

# Zu Website-Verzeichnis
cd /home/user/webapp

# Backup und bearbeiten
./backup.sh create
nano index.html
```

---

**🛡️ Mit diesem System können Sie sicher experimentieren und jederzeit zurück! 🚀**
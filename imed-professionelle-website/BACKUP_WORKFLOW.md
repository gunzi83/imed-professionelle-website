# 🛡️ Backup-Workflow für sichere Website-Änderungen

## 🎯 **Immer VOR Änderungen ausführen:**

### **Schritt 1: Aktuellen Stand sichern**
```bash
cd /home/user/webapp

# Backup-Branch erstellen
git checkout -b backup-$(date +%Y%m%d-%H%M%S)

# Zurück zu main für Bearbeitung
git checkout main

# Status prüfen
git status
```

### **Schritt 2: Änderungen machen**
```bash
# Ihre Änderungen durchführen...
nano index.html
# oder andere Dateien bearbeiten
```

### **Schritt 3: Testen auf Development Server**
```bash
# Changes sind automatisch auf Development Server sichtbar
# Testen auf: https://8080-ijiaq6cllpyr91fgungq5-6532622b.e2b.dev
```

---

## ✅ **Wenn Änderungen GUT sind:**

```bash
cd /home/user/webapp

# Änderungen committen
git add .
git commit -m "Beschreibung der Änderung"

# Zu GitHub pushen
git push origin main

# Produktionsserver aktualisieren
npm run pm2:restart

# Backup-Branch löschen (optional)
git branch -D backup-20241220-143022
```

---

## ❌ **Wenn Änderungen SCHLECHT sind:**

### **Option A: Noch nicht committed**
```bash
cd /home/user/webapp

# Alle Änderungen rückgängig machen
git checkout -- .

# Status prüfen (sollte "clean" sein)
git status
```

### **Option B: Bereits committed, aber nicht gepusht**
```bash
cd /home/user/webapp

# Commit rückgängig machen (Änderungen bleiben)
git reset --soft HEAD~1

# Oder: Commit komplett löschen
git reset --hard HEAD~1

# Status prüfen
git status
```

### **Option C: Zurück zum Backup-Branch**
```bash
cd /home/user/webapp

# Zum funktionierenden Backup wechseln
git checkout backup-20241220-143022

# Als neuen main-Branch setzen
git checkout -b main-restored
git branch -D main
git branch -m main

# Produktionsserver aktualisieren
npm run pm2:restart
```

---

## 🔍 **Nützliche Git-Befehle zum Analysieren:**

### **Was wurde geändert?**
```bash
# Änderungen seit letztem Commit anzeigen
git diff

# Änderungen in einer Datei
git diff index.html

# Commit-Historie anzeigen
git log --oneline -10
```

### **Backup-Branches anzeigen**
```bash
# Alle Branches auflisten
git branch -a

# Zu einem Backup wechseln
git checkout backup-20241220-143022
```

---

## 📋 **Checkliste für sichere Änderungen:**

### **Vor der Änderung:**
- [ ] `git status` - Clean working directory?
- [ ] `git checkout -b backup-$(date +%Y%m%d-%H%M%S)` - Backup erstellt?
- [ ] `git checkout main` - Zurück zu main branch?

### **Nach der Änderung:**
- [ ] Development Server testen (Port 8080)
- [ ] Zufrieden mit den Änderungen?
- [ ] `git add . && git commit -m "..."` - Committen?
- [ ] `git push origin main` - Pushen?
- [ ] `npm run pm2:restart` - Produktionsserver aktualisieren?

### **Bei Problemen:**
- [ ] `git checkout -- .` - Uncommitted changes rückgängig?
- [ ] `git reset --hard HEAD~1` - Letzten commit löschen?
- [ ] `git checkout backup-YYYYMMDD-HHMMSS` - Backup wiederherstellen?

---

## 🎯 **Beispiel-Workflow:**

```bash
# 1. Backup vor Änderungen
cd /home/user/webapp
git checkout -b backup-$(date +%Y%m%d-%H%M%S)
git checkout main

# 2. Änderung machen
nano index.html
# "Ordinationszeiten geändert"

# 3. Testen (automatisch auf Port 8080 sichtbar)
# Browser öffnen und prüfen

# 4A. Gefällt mir → Committen und pushen
git add .
git commit -m "Update: Ordinationszeiten aktualisiert"
git push origin main
npm run pm2:restart

# 4B. Gefällt mir NICHT → Rückgängig machen
git checkout -- .
# Oder zurück zum Backup:
git checkout backup-20241220-143022
```

---

## 💡 **Pro-Tipps:**

### **1. Kleine Änderungen machen**
- Nicht alles auf einmal ändern
- Eine Sektion nach der anderen
- Nach jeder Änderung testen

### **2. Aussagekräftige Commit-Messages**
```bash
# Gut:
git commit -m "Update Ordinationszeiten: Mo-Fr 8-18 Uhr"

# Schlecht:
git commit -m "Update"
```

### **3. Regelmäßig pushen**
- Nicht zu lange warten mit dem Push
- GitHub ist Ihr externes Backup

### **4. Branch-Namen mit Datum**
```bash
# Automatisches Datum im Branch-Namen
git checkout -b backup-$(date +%Y%m%d-%H%M%S)
# Ergebnis: backup-20241220-143045
```

---

**Mit diesem Workflow sind Ihre Änderungen immer sicher! 🛡️**
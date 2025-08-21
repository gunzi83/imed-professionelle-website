# 📢 News & Benachrichtigungssystem - Benutzerhandbuch

## 🎯 Übersicht

Das imed2230 Website verfügt über ein integriertes System für aktuelle Informationen und Benachrichtigungen. Es gibt **4 verschiedene Bereiche** für Mitteilungen:

---

## 📍 **1. Notification Banner (Dringende Mitteilungen)**

**Wo:** Direkt unter dem Header, über der Hero-Section  
**Verwendung:** Sofortige, wichtige Mitteilungen  
**Beispiele:** Praxisschließungen, Notfälle, COVID-Updates  

### So aktivieren Sie eine Benachrichtigung:

1. Öffnen Sie die Browser-Entwicklerkonsole (F12)
2. Geben Sie ein:
```javascript
showNotification('Ihre Nachricht hier', 'urgent', 'fa-exclamation-circle');
```

**Benachrichtigungstypen:**
- `'info'` - Blaue Info-Benachrichtigung
- `'warning'` - Orange Warnung  
- `'success'` - Grüne Erfolgsmeldung
- `'urgent'` - Rote dringende Mitteilung (blinkt)

---

## 📰 **2. News & Aktuelles Sektion**

**Wo:** Zwischen "Herzlich Willkommen" und "Über uns"  
**Verwendung:** Regelmäßige Updates, neue Leistungen, längere Mitteilungen  

### News hinzufügen/bearbeiten:

1. Öffnen Sie `js/script.js`
2. Finden Sie die Funktion `getNewsConfiguration()`
3. Fügen Sie neue Einträge hinzu:

```javascript
function getNewsConfiguration() {
    return [
        {
            id: 'urlaub-2024-winter',
            type: 'vacation',
            title: 'Winterurlaub Dr. Riedmüller',
            content: 'Die Ordination ist vom <strong>15. Februar bis 29. Februar 2024</strong> geschlossen. Vertretung: Dr. Mustermann (Tel: 02282-12345)',
            startDate: '2024-02-01',
            endDate: '2024-02-29',
            priority: 'high',
            icon: 'fa-plane',
            showInContact: true
        }
    ];
}
```

**News-Typen:**
- `vacation` - Urlaubszeiten (Orange)
- `hours` - Öffnungszeiten (Blau)  
- `service` - Neue Leistungen (Grün)
- `general` - Allgemeine Infos (Grau)

**Prioritäten:**
- `high` - Rot markiert, oben angezeigt
- `medium` - Orange Markierung
- `low` - Grüne Markierung

---

## 🕒 **3. Öffnungszeiten-Alert (Kontakt-Sektion)**

**Wo:** In der Kontakt-Sektion, über den regulären Öffnungszeiten  
**Verwendung:** Geänderte Öffnungszeiten, temporäre Änderungen  

### Aktivierung:
Setzen Sie bei News-Einträgen `showInContact: true` und `type: 'hours'`

---

## 🎈 **4. Hero-Section Info-Widget** 

**Wo:** Neben dem "Alle Kassen" Badge  
**Verwendung:** Kurze, wichtige Mitteilungen die prominent sichtbar sein sollen  

---

## 📝 **Schritt-für-Schritt Anleitung**

### Urlaubszeit hinzufügen:
1. Öffnen Sie `js/script.js`
2. Fügen Sie in `getNewsConfiguration()` hinzu:
```javascript
{
    id: 'urlaub-sommer-2024',
    type: 'vacation',
    title: 'Sommerurlaub 2024',
    content: 'Ordination geschlossen vom <strong>15. Juli bis 5. August 2024</strong>. Vertretung: Dr. Beispiel (Tel: 02282-99999)',
    startDate: '2024-07-01',  // Ab wann die Meldung angezeigt wird
    endDate: '2024-08-05',    // Bis wann die Meldung angezeigt wird
    priority: 'high',
    icon: 'fa-plane',
    showInContact: true       // Zeigt auch Alert in Kontakt-Sektion
}
```

### Neue Leistung bekannt geben:
```javascript
{
    id: 'neue-leistung-2024',
    type: 'service', 
    title: 'Neu: Diabetes-Sprechstunde',
    content: 'Ab sofort bieten wir jeden Mittwoch eine spezielle Diabetes-Sprechstunde an. Termine unter 02282-52827.',
    startDate: '2024-03-01',
    endDate: null,  // null = unbegrenzt gültig
    priority: 'medium',
    icon: 'fa-plus-circle',
    showInContact: false
}
```

### Dringende Mitteilung:
Für sofortige Mitteilungen verwenden Sie die Browser-Konsole:
```javascript
showNotification('Aufgrund eines Notfalls bleibt die Praxis heute geschlossen', 'urgent');
```

---

## 🔧 **Technische Details**

### Automatische Features:
- ✅ News werden automatisch nach Datum gefiltert
- ✅ Abgelaufene News verschwinden automatisch  
- ✅ Sortierung nach Priorität und Datum
- ✅ Responsive Design für alle Geräte
- ✅ Accessibility-konform (Screenreader-freundlich)

### Dateiformate:
- **Datum:** `YYYY-MM-DD` (z.B. `2024-12-25`)
- **HTML:** Erlaubt in `content` für Formatierung (`<strong>`, `<em>`, etc.)
- **Icons:** FontAwesome Klassen (z.B. `fa-plane`, `fa-heartbeat`)

---

## 🚀 **Änderungen aktivieren**

Nach dem Bearbeiten von `js/script.js`:

1. Speichern Sie die Datei
2. Der Entwicklungsserver (Port 8080) zeigt Änderungen sofort
3. Der Produktionsserver (Port 3000) muss eventuell neu gestartet werden

**PM2 Server neu starten:**
```bash
cd /home/user/webapp/imed-professionelle-website
pm2 restart all
```

---

## 📞 **Beispiele für verschiedene Situationen**

### Kurzfristiger Ausfall:
```javascript
// In Browser-Konsole (F12):
showNotification('Aufgrund technischer Probleme sind wir heute ab 14:00 nicht erreichbar', 'warning');
```

### Geplanter Urlaub:
```javascript
// In js/script.js getNewsConfiguration():
{
    id: 'osterurlaub-2024',
    type: 'vacation',
    title: 'Osterferien',
    content: 'Ordination geschlossen von 29. März bis 8. April 2024',
    startDate: '2024-03-20',
    endDate: '2024-04-08', 
    priority: 'high',
    icon: 'fa-egg',
    showInContact: true
}
```

### Neue Öffnungszeiten:
```javascript
{
    id: 'neue-zeiten-2024',
    type: 'hours',
    title: 'Erweiterte Öffnungszeiten',
    content: 'Ab sofort auch Freitag 8:00-12:00 geöffnet!',
    startDate: '2024-04-01',
    endDate: null,
    priority: 'medium', 
    icon: 'fa-clock',
    showInContact: true
}
```

---

**💡 Tipp:** Testen Sie Änderungen immer zuerst auf dem Entwicklungsserver (Port 8080) bevor Sie sie live schalten!
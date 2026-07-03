# 🔒 Configuration HTTPS - La SicRoom

## 📊 Statut Actuel

✅ **HTTPS configuré** avec certificat auto-signé pour `lasicroom.duckdns.org`
- Certificat valide jusqu'au: **3 juillet 2027**
- Protocoles SSL/TLS: **TLSv1.2, TLSv1.3**
- Ciphers: **ECDHE (Forward Secrecy)**
- HTTP/2 activé pour performances

⚠️ **Certificat auto-signé** (car domaine DuckDNS non accessible de l'extérieur)
- ✅ Fonctionnel localement
- ⚠️ Avertissement de navigateur en production (certificat non reconnu)
- 📝 À remplacer par Let's Encrypt quand le domaine sera accessible

---

## 🚀 Migration vers Let's Encrypt

### Prérequis
- Domaine `lasicroom.duckdns.org` accessible depuis Internet
- Ports 80 (HTTP) et 443 (HTTPS) ouverts et accessibles
- Firewall externe configuré pour autoriser ces ports

### Étapes de migration

#### 1️⃣ Vérifier l'accessibilité du domaine
```bash
# De n'importe quel serveur sur Internet
curl -I http://lasicroom.duckdns.org/
# Doit répondre avec HTTP 200 ou 301
```

#### 2️⃣ Générer le certificat Let's Encrypt
```bash
sudo certbot certonly --nginx -d lasicroom.duckdns.org
```

#### 3️⃣ Mettre à jour la configuration Nginx
```bash
# Remplacer dans /etc/nginx/sites-available/lasicroom:
# De:
ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

# À:
ssl_certificate /etc/letsencrypt/live/lasicroom.duckdns.org/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/lasicroom.duckdns.org/privkey.pem;
```

#### 4️⃣ Redémarrer Nginx
```bash
sudo systemctl restart nginx
```

#### 5️⃣ Vérifier le renouvellement automatique
```bash
# Certbot configure automatiquement le renouvellement via cron
sudo crontab -l | grep certbot
```

---

## 🔐 En-têtes de Sécurité Configurés

| Header | Valeur | Effet |
|--------|--------|-------|
| **HSTS** | max-age=31536000 | Force HTTPS pendant 1 an |
| **CSP** | Politique stricte | Prévention XSS/Injection |
| **X-Content-Type** | nosniff | Prévention MIME sniffing |
| **X-Frame** | DENY | Prévention Clickjacking |
| **X-XSS** | 1; mode=block | Protection XSS navigateur |
| **Referrer-Policy** | strict-origin | Confidentialité |
| **Permissions** | Restrictive | Accès mic/caméra refusé |
| **COOP** | same-origin | Isolation de contexte |
| **CORP** | same-origin | Protection partage ressources |

---

## 📅 Renouvellement Certificat Auto-Signé

Script disponible: `/usr/local/bin/renew-cert.sh`

Pour activer le renouvellement automatique:
```bash
sudo crontab -e

# Ajouter cette ligne (renouvellement le 1er de chaque mois à minuit):
0 0 1 * * /usr/local/bin/renew-cert.sh
```

Consulter les logs:
```bash
sudo tail -f /var/log/cert-renewal.log
```

---

## 🧪 Tests Locaux

### Accès HTTPS
```bash
curl -k https://localhost/api/concerts
```

### Vérifier les en-têtes de sécurité
```bash
curl -k -I https://localhost/
```

### Vérifier le certificat
```bash
openssl s_client -connect localhost:443 -servername localhost
```

### Redirection HTTP → HTTPS
```bash
curl -I http://localhost/
# Doit retourner 301 Moved Permanently
```

---

## 🆘 Troubleshooting

### "SSL certificate verification failed"
→ Normal avec certificat auto-signé. Utiliser `-k` avec curl ou ajouter exception navigateur.

### "timeout during connect" (lors de Let's Encrypt)
→ Le domaine n'est pas accessible de l'extérieur. Vérifier firewall/NAT/DuckDNS.

### "Certbot failed to authenticate"
→ Vérifier que les ports 80/443 sont ouverts ET accessibles depuis Internet.

---

## 📝 Configuration Nginx

Fichier: `/etc/nginx/sites-available/lasicroom`

Points clés:
- ✅ HTTP/2 activé
- ✅ TLS 1.2+ seulement
- ✅ Forward Secrecy (ECDHE)
- ✅ Cache des assets statiques (31536000 sec)
- ✅ Proxy vers API Node.js sur localhost:3001


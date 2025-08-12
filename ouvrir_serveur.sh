#!/bin/bash

echo "🚀 Démarrage de Nginx et ouverture des ports 80 et 443..."

# Autoriser les ports HTTP et HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Activer nginx au démarrage
sudo systemctl enable nginx

# Démarrer nginx
sudo systemctl start nginx

echo "✅ Nginx est lancé et les ports 80/443 sont ouverts."

# Construire le front React
echo "🔨 Construction du front React..."
cd /home/arnaud/Bureau/lasicroom_projet_fil_rouge/lasicroom_front || { echo "Dossier front non trouvé !"; exit 1; }
npm install
npm run build

echo "✅ Front React construit."

# Lancer le back Node.js
echo "▶️ Lancement du serveur Node.js..."
cd /home/arnaud/Bureau/lasicroom_projet_fil_rouge/lasicroom_back || { echo "Dossier back non trouvé !"; exit 1; }
npm install
npm run dev &

echo "✅ Serveur Node.js lancé en arrière-plan."

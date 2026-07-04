#!/bin/bash

# Couleurs pour le terminal
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
NC="\033[0m" # Reset

echo -e "${YELLOW}🚀 Démarrage de Nginx et ouverture des ports 80 et 443...${NC}"

# Autoriser les ports HTTP et HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Activer nginx au démarrage et le démarrer si non actif
sudo systemctl enable nginx
sudo systemctl restart nginx

# Vérifier que Nginx fonctionne
if ! systemctl is-active --quiet nginx; then
    echo -e "${RED}❌ Nginx n'a pas pu démarrer.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Nginx est lancé et les ports 80/443 sont ouverts.${NC}"

# Construire le front React
FRONT_DIR="/home/dev_arnaud/Documents/github_repos/lasicroom/lasicroom_front"
echo -e "${YELLOW}🔨 Construction du front React...${NC}"
cd "$FRONT_DIR" || { echo -e "${RED}❌ Dossier front non trouvé !${NC}"; exit 1; }

npm install
if ! npm run build; then
    echo -e "${RED}❌ La build React a échoué.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Front React construit.${NC}"

# Lancer le back Node.js
BACK_DIR=""
echo -e "${YELLOW}▶️ Lancement du serveur Node.js...${NC}"
cd "$BACK_DIR" || { echo -e "${RED}❌ Dossier back non trouvé !${NC}"; exit 1; }

npm install
# Lancer en arrière-plan avec nohup et logging (production use node directement, pas npm run dev)
nohup node app.js > back.log 2>&1 &

echo -e "${GREEN}✅ Serveur Node.js lancé en arrière-plan. Logs: $BACK_DIR/back.log${NC}"

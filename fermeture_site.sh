#!/bin/bash

# Couleurs pour le terminal
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
NC="\033[0m" # Reset

echo -e "${YELLOW}🛑 Arrêt de Nginx...${NC}"

# Arrêter Nginx
if sudo systemctl stop nginx; then
    echo -e "${GREEN}✅ Nginx arrêté.${NC}"
else
    echo -e "${RED}❌ Impossible d'arrêter Nginx.${NC}"
fi

echo -e "${YELLOW}🛑 Arrêt du serveur Node.js...${NC}"

# Trouver tous les PID des processus node dans le dossier back
BACK_DIR="/home/dev_arnaud/Documents/github_repos/lasicroom/lasicroom_back"
NODE_PIDS=$(pgrep -f "node.*$BACK_DIR")

if [ -z "$NODE_PIDS" ]; then
    echo -e "${YELLOW}⚠️ Aucun serveur Node.js trouvé.${NC}"
else
    for PID in $NODE_PIDS; do
        echo -e "⏹ Kill du processus Node.js (PID: $PID)..."
        kill $PID
        # Attendre 5 secondes, puis forcer si nécessaire
        sleep 5
        if kill -0 $PID 2>/dev/null; then
            echo -e "${RED}⚠️ Le processus $PID ne s'est pas arrêté. Kill -KILL...${NC}"
            kill -9 $PID
        fi
        echo -e "${GREEN}✅ Processus Node.js $PID arrêté.${NC}"
    done
fi

echo -e "${GREEN}🛑 Tous les services ont été arrêtés.${NC}"

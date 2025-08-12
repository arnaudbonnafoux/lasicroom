#!/bin/bash

echo "🛑 Arrêt de Nginx..."

# Arrêter nginx
sudo systemctl stop nginx

echo "✅ Nginx arrêté."

echo "🛑 Arrêt du serveur Node.js..."

# Trouver le PID du processus node lancé avec 'npm run dev'
# Ici on cherche le processus 'node' qui tourne dans ton dossier back
NODE_PID=$(pgrep -f "node.*/home/arnaud/Bureau/lasicroom_projet_fil_rouge/lasicroom_back")

if [ -z "$NODE_PID" ]; then
  echo "⚠️ Serveur Node.js non trouvé."
else
  echo "Kill du processus Node.js (PID: $NODE_PID)..."
  kill $NODE_PID
  echo "✅ Serveur Node.js arrêté."
fi

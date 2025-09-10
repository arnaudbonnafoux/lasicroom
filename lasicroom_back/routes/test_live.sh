#!/bin/bash

# URL de l'API via Nginx HTTPS (port 443)
URL="https://localhost/api/live"

echo "👉 Test de la route GET $URL"
echo "--------------------------------"

# Appel avec curl
# -k : ignore certificat auto-signé
# -s : silencieux
# -o response.json : stocke la réponse
# -w "%{http_code}" : récupère le code HTTP
HTTP_CODE=$(curl -k -s -o response.json -w "%{http_code}" -X GET "$URL")

# Affiche le code HTTP
echo "Code HTTP : $HTTP_CODE"
echo "--------------------------------"

# Affiche le JSON joliment si jq est installé
if command -v jq > /dev/null; then
  jq . response.json
else
  cat response.json
fi

# Nettoyage
rm -f response.json

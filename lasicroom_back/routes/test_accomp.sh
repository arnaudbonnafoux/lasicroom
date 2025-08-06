#!/bin/bash

# 🔧 Configuration
URL="https://lasicroom.local"
LOGIN_ENDPOINT="/api/connexions"
ACCOMP_ENDPOINT="/api/accompagnements"
EMAIL="alice@example.com"
PASSWORD="alice123"

# 1. Connexion pour obtenir le token JWT
echo "🔐 1. Connexion d'Alice pour obtenir le token..."
TOKEN=$(curl -sk -X POST "$URL$LOGIN_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"mot_de_passe\":\"$PASSWORD\"}" | jq -r '.token')

if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
  echo "❌ Erreur : impossible de récupérer un token pour Alice"
  exit 1
fi

echo "✅ Token obtenu : $TOKEN"

# 2. Test GET /api/accompagnements (liste des demandes)
echo -e "\n📥 2. Récupération des demandes d'accompagnement..."
curl -sk -X GET "$URL$ACCOMP_ENDPOINT" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json" | jq

# 3. Test POST /api/accompagnements (création d'une demande)
echo -e "\n📝 3. Création d'une nouvelle demande (publique)..."
curl -sk -X POST "$URL$ACCOMP_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "nom_artiste": "Test Bash",
    "email_artiste": "test@example.com",
    "style_musical": "Bashcore",
    "message": "Ceci est un test automatique."
  }' | jq

# 4. Test DELETE /api/accompagnements/:id (protégé, supprimera la dernière demande créée)
echo -e "\n🗑️ 4. Suppression de la dernière demande (admin seulement)..."
LAST_ID=$(curl -sk -X GET "$URL$ACCOMP_ENDPOINT" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.[0].id_demande')

if [[ -z "$LAST_ID" || "$LAST_ID" == "null" ]]; then
  echo "⚠️  Aucune demande à supprimer."
else
  curl -sk -X DELETE "$URL$ACCOMP_ENDPOINT/$LAST_ID" \
    -H "Authorization: Bearer $TOKEN" | jq
fi

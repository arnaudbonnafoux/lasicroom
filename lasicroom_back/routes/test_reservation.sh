#!/bin/bash
API_URL="https://localhost/api/reservations"
LOGIN_URL="$API_URL/connexions"
EMAIL="alice@example.com"
MOT_DE_PASSE="alice123"

echo "🔐 Connexion d'Alice (admin)..."
REPONSE=$(curl -s -X POST "$API_URL/connexions" -H "Content-Type: application/json" -d "{\"email\": \"$EMAIL\", \"mot_de_passe\": \"$MOT_DE_PASSE\"}")

TOKEN=$(echo "$REPONSE" | jq -r '.token')
if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Échec de l'authentification."
  exit 1
fi
echo "✅ Token reçu."

# Créer une réservation (publique)
echo "🎫 Création d'une réservation (publique)..."
REPONSE_CREATION=$(curl -s -X POST "$API_URL/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "id_utilisateur": 1,
    "id_concert": 1,
    "type_tarif": "plein",
    "montant": 20.00
  }')

echo "$REPONSE_CREATION" | jq

ID_RESERVATION=$(echo "$REPONSE_CREATION" | jq -r '.id_reservation')
if [ "$ID_RESERVATION" = "null" ]; then
  echo "❌ La réservation n'a pas pu être créée."
  exit 1
fi

# Obtenir les réservations (protégé)
echo "📋 Récupération des réservations..."
curl -s -X GET "$API_URL/reservations" \
  -H "Authorization: Bearer $TOKEN" | jq

# Supprimer la réservation (protégé)
echo "🗑️ Suppression de la réservation $ID_RESERVATION..."
curl -s -X DELETE "$API_URL/reservations/$ID_RESERVATION" \
  -H "Authorization: Bearer $TOKEN" | jq

echo "✅ Test terminé."

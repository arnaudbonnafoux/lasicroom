#!/bin/bash

API_URL="https://localhost/api/concerts"
LOGIN_URL="https://localhost/api/connexions"
EMAIL="alice@example.com"
MOT_DE_PASSE="alice123"  # à adapter si nécessaire

echo "🔐 Connexion d'Alice (admin)..."
TOKEN=$(curl -sk -X POST "$LOGIN_URL" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"mot_de_passe\": \"$MOT_DE_PASSE\"}" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Échec de l'authentification."
  exit 1
fi
echo "✅ Token obtenu : $TOKEN"
echo

echo "📥 Liste des concerts (GET public)..."
curl -sk "$API_URL" | jq .
echo

# 🔍 Récupère un id_artiste existant pour créer un concert valide
ID_ARTISTE=$(curl -sk https://localhost/api/artistes | jq -r '.[0].id_artiste')
if [ -z "$ID_ARTISTE" ] || [ "$ID_ARTISTE" == "null" ]; then
  echo "❌ Aucun artiste trouvé. Impossible de créer un concert."
  exit 1
fi

# 🔧 Données pour le concert
TITRE="Concert Bash"
DESCRIPTION="Créé automatiquement par script"
DATE_CONCERT=$(date -d "+7 days" +"%Y-%m-%d")
NB_PLACES=100
TARIF_PLEIN=20
TARIF_ABONNE=15

echo "📝 Création d’un concert (POST)..."
REPONSE_CREATION=$(curl -sk -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"titre\": \"$TITRE\",
    \"description\": \"$DESCRIPTION\",
    \"date_concert\": \"$DATE_CONCERT\",
    \"nb_places_total\": $NB_PLACES,
    \"tarif_plein\": $TARIF_PLEIN,
    \"tarif_abonne\": $TARIF_ABONNE,
    \"id_artiste\": $ID_ARTISTE
  }")

echo "$REPONSE_CREATION" | jq .

ID_CONCERT=$(echo "$REPONSE_CREATION" | jq -r '.id_concert')
if [ -z "$ID_CONCERT" ] || [ "$ID_CONCERT" == "null" ]; then
  echo "❌ Échec de la création du concert."
  exit 1
fi
echo "✅ Concert créé avec ID : $ID_CONCERT"
echo

echo "✏️ Mise à jour du concert (PUT)..."
curl -sk -X PUT "$API_URL/$ID_CONCERT" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"titre\": \"Concert Bash Modifié\",
    \"description\": \"Mise à jour automatique\",
    \"date_concert\": \"$DATE_CONCERT\",
    \"nb_places_total\": 120,
    \"tarif_plein\": 25,
    \"tarif_abonne\": 18,
    \"id_artiste\": $ID_ARTISTE
  }" | jq .
echo

echo "🗑️ Suppression du concert (DELETE)..."
curl -sk -X DELETE "$API_URL/$ID_CONCERT" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo

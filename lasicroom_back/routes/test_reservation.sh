#!/bin/bash

# ✅ CONFIG
BASE_URL="https://lasicroom.local/api/reservations"
AUTH_URL="https://lasicroom.local/api/connexions"
TMP_FILE="tmp_reservation_id.txt"

# 🔐 1. Connexion de l'admin Alice
echo "🔐 Connexion d'Alice..."
TOKEN=$(curl -sk -X POST "$AUTH_URL" -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","mot_de_passe":"alice123"}' | jq -r .token)

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Erreur : impossible de récupérer un token."
  exit 1
fi
echo "✅ Token obtenu."

# 🎯 2. Choix du concert
ID_CONCERT=5
TARIF="plein"
MONTANT=20.00

# 📝 3. Création d’une réservation
echo -e "\n📝 Création d’une réservation pour le concert $ID_CONCERT..."
REPONSE=$(curl -sk -X POST "$BASE_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"id_concert\": $ID_CONCERT,
    \"type_tarif\": \"$TARIF\",
    \"montant\": $MONTANT
  }" | tee /dev/tty)

ID_RESERVATION=$(echo "$REPONSE" | jq -r .id_reservation)

if [ "$ID_RESERVATION" == "null" ] || [ -z "$ID_RESERVATION" ]; then
  echo "❌ Erreur : réservation non créée."
  exit 1
fi
echo "$ID_RESERVATION" > "$TMP_FILE"
echo "✅ Réservation créée avec l'ID : $ID_RESERVATION"

# 📋 4. Consultation des réservations de l'utilisateur connecté (/mine)
echo -e "\n📋 Récupération des réservations de l'utilisateur connecté..."
curl -sk -H "Authorization: Bearer $TOKEN" "$BASE_URL/mine" | jq .

# 📋 5. Consultation de toutes les réservations (admin)
echo -e "\n📋 Récupération de toutes les réservations (GET)..."
curl -sk -H "Authorization: Bearer $TOKEN" "$BASE_URL" | jq .

# 🗑️ 6. Suppression de la réservation
echo -e "\n🗑️ Suppression de la réservation $ID_RESERVATION..."
curl -sk -X DELETE "$BASE_URL/$ID_RESERVATION" \
  -H "Authorization: Bearer $TOKEN" | jq .

# 🧹 7. Nettoyage
rm -f "$TMP_FILE"

echo -e "\n✅ Tests terminés."

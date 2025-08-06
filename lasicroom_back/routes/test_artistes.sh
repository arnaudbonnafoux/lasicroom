#!/bin/bash

# 🔧 Config
BASE_URL="https://lasicroom.local/api/artistes"
AUTH_URL="https://lasicroom.local/api/connexions"
PHOTO_PATH="../photos_artistes/photo_test.jpg" # Mets une vraie image à cet emplacement
TMP_ID_FILE="tmp_artiste_id.txt"

# 🔐 1. Connexion de l'admin Alice
echo "🔐 Connexion d'Alice..."
TOKEN=$(curl -sk -X POST "$AUTH_URL" -H "Content-Type: application/json" -d '{"email":"alice@example.com","mot_de_passe":"alice123"}' | jq -r .token)

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Erreur : impossible de récupérer un token."
  exit 1
fi
echo "✅ Token obtenu : $TOKEN"

# 📥 2. Obtenir la liste publique
echo -e "\n📥 Liste des artistes (GET public)..."
curl -sk "$BASE_URL" | jq .

# 📝 3. Création d’un artiste
echo -e "\n📝 Création d’un artiste (POST)..."
REPONSE=$(curl -sk -X POST "$BASE_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -F "nom_artiste=Artiste Bash" \
  -F "style_musical=Rock Bashé" \
  -F "description=Artiste créé par script bash" \
  -F "lien_video=https://youtube.com/bash" \
  -F "photo=@$PHOTO_PATH" \
  | tee /dev/tty)

ID=$(echo "$REPONSE" | jq -r .id_artiste)
echo "$ID" > "$TMP_ID_FILE"

if [ "$ID" == "null" ] || [ -z "$ID" ]; then
  echo "❌ Erreur : artiste non créé."
  exit 1
fi
echo "✅ Artiste créé avec ID : $ID"

# ✏️ 4. Mise à jour de l’artiste
echo -e "\n✏️ Mise à jour de l’artiste (PUT)..."
curl -sk -X PUT "$BASE_URL/$ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nom_artiste": "Artiste Bash Modifié",
    "style_musical": "Electro",
    "description": "Mise à jour automatique",
    "lien_video": "https://youtube.com/update"
  }' | jq .

# 🗑️ 5. Suppression de l’artiste
echo -e "\n🗑️ Suppression de l’artiste (DELETE)..."
curl -sk -X DELETE "$BASE_URL/$ID" \
  -H "Authorization: Bearer $TOKEN" \
  | jq .

# Nettoyage
rm -f "$TMP_ID_FILE"

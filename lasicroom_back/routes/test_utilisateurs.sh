#!/bin/bash

# Config
BASE_URL="https://lasicroom.local/api/utilisateurs"
AUTH_URL="https://lasicroom.local/api/connexions"
ADMIN_EMAIL="alice@example.com"
ADMIN_PASS="alice123"

# Connexion admin pour obtenir un token
echo "🔐 Connexion admin..."
TOKEN=$(curl -sk -X POST "$AUTH_URL" -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"mot_de_passe\":\"$ADMIN_PASS\"}" | jq -r .token)

if [[ -z "$TOKEN" || "$TOKEN" == "null" ]]; then
  echo "❌ Échec connexion admin, arrêt du script."
  exit 1
fi
echo "✅ Token admin obtenu."

# 1) Test POST création utilisateur
echo -e "\n📝 Test création utilisateur (POST)..."
NOM="TestUser$(date +%s)"
EMAIL="testuser$(date +%s)@example.com"
MDP="test123"
ROLE="utilisateur"

REPONSE=$(curl -sk -X POST "$BASE_URL" -H "Content-Type: application/json" \
  -d "{\"nom\":\"$NOM\", \"email\":\"$EMAIL\", \"mot_de_passe\":\"$MDP\", \"role\":\"$ROLE\"}")

echo "$REPONSE" | jq .

# Récupérer l'id_utilisateur créé
ID_UTILISATEUR=$(echo "$REPONSE" | jq -r '.utilisateur.id_utilisateur')

if [[ -z "$ID_UTILISATEUR" || "$ID_UTILISATEUR" == "null" ]]; then
  echo "❌ Échec création utilisateur."
  exit 1
fi
echo "✅ Utilisateur créé avec id: $ID_UTILISATEUR"

# 2) Test GET liste utilisateurs (protégé)
echo -e "\n📋 Test récupération liste utilisateurs (GET)..."
curl -sk -H "Authorization: Bearer $TOKEN" "$BASE_URL" | jq .

# 3) Test GET utilisateur par id (protégé)
echo -e "\n📋 Test récupération utilisateur par id (GET)..."
curl -sk -H "Authorization: Bearer $TOKEN" "$BASE_URL/$ID_UTILISATEUR" | jq .

echo -e "\n✅ Tests terminés."

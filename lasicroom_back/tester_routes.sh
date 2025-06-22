#!/bin/bash

URL_BASE="http://localhost:3000/api/concerts"

echo "🔍 Test GET /concerts"
curl -s -w "\nStatus HTTP: %{http_code}\n" "$URL_BASE" | jq

echo -e "\n➡️ Test POST /concerts"
RESPONSE_POST=$(curl -s -w "\n%{http_code}" -X POST "$URL_BASE" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Concert Test Script",
    "description": "Description test",
    "date_concert": "2025-12-01T20:00:00",
    "nb_places_total": 100,
    "lien_video": "https://youtu.be/testscript",
    "tarif_plein": 25.00,
    "tarif_abonne": 20.00
  }')

HTTP_CODE_POST=$(echo "$RESPONSE_POST" | tail -n1)
BODY_POST=$(echo "$RESPONSE_POST" | head -n -1)

echo "$BODY_POST" | jq
echo "Status HTTP: $HTTP_CODE_POST"

if [ "$HTTP_CODE_POST" != "201" ]; then
  echo "❌ POST a échoué, arrêt des tests."
  exit 1
fi

# Récupérer l'id du concert créé pour PUT et DELETE
ID_CONCERT=$(echo "$BODY_POST" | jq '.id_concert')
echo -e "\n🎯 ID du concert créé : $ID_CONCERT"

echo -e "\n➡️ Test PUT /concerts/$ID_CONCERT"
RESPONSE_PUT=$(curl -s -w "\n%{http_code}" -X PUT "$URL_BASE/$ID_CONCERT" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Concert Modifié Script",
    "description": "Description modifiée",
    "date_concert": "2025-12-02T20:30:00",
    "nb_places_total": 120,
    "lien_video": "https://youtu.be/testscriptmod",
    "tarif_plein": 30.00,
    "tarif_abonne": 25.00
  }')

HTTP_CODE_PUT=$(echo "$RESPONSE_PUT" | tail -n1)
BODY_PUT=$(echo "$RESPONSE_PUT" | head -n -1)

echo "$BODY_PUT" | jq
echo "Status HTTP: $HTTP_CODE_PUT"

echo -e "\n➡️ Test DELETE /concerts/$ID_CONCERT"
RESPONSE_DELETE=$(curl -s -w "\n%{http_code}" -X DELETE "$URL_BASE/$ID_CONCERT")

HTTP_CODE_DELETE=$(echo "$RESPONSE_DELETE" | tail -n1)
BODY_DELETE=$(echo "$RESPONSE_DELETE" | head -n -1)

echo "$BODY_DELETE"
echo "Status HTTP: $HTTP_CODE_DELETE"

echo -e "\n✅ Tests terminés."

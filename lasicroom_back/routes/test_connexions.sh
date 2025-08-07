#!/bin/bash

URL="https://lasicroom.local/api/connexions"

echo "🔐 Test de connexion pour Alice..."
curl -sk -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com", "mot_de_passe":"alice123"}' | jq .

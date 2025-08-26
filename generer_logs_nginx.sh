#!/bin/bash

# Dossier où seront stockés les logs archivés
LOGS_DIR="./nginx_logs"
mkdir -p "$LOGS_DIR"

# Date et heure pour le nom du fichier
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Fichiers logs Nginx (adapter si ton chemin est différent)
ACCESS_LOG="/var/log/nginx/access.log"
ERROR_LOG="/var/log/nginx/error.log"

# Fichier de sortie dans ton projet
OUTPUT_FILE="$LOGS_DIR/nginx_logs_$DATE.txt"

# Vérifier que les fichiers logs existent
if [[ ! -f "$ACCESS_LOG" || ! -f "$ERROR_LOG" ]]; then
    echo "Erreur : un ou plusieurs fichiers logs Nginx sont introuvables."
    exit 1
fi

# Copier les logs dans un seul fichier
{
    echo "=== Nginx Access Log ==="
    cat "$ACCESS_LOG"
    echo
    echo "=== Nginx Error Log ==="
    cat "$ERROR_LOG"
} > "$OUTPUT_FILE"

echo "Logs Nginx archivés dans : $OUTPUT_FILE"

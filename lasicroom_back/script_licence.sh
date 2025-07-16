#!/bin/bash

# Auteur : duanrA
# Description : Ajoute un en-tête de licence non-commerciale dans tous les fichiers source
# Extensions ciblées
EXTENSIONS=("js" "html" "css" "sh")
# Dossiers à exclure
EXCLUSIONS=("node_modules" "dist" ".git")

# En-tête commun
read -r -d '' HEADER <<'EOF'
/*
 * Copyright (c) 2025 duanrA
 *
 * Ce fichier fait partie d'un projet libre distribué sous une licence personnalisée :
 * - Utilisation, modification et distribution autorisées
 * - À condition de conserver cette notice
 * - L’usage commercial est strictement interdit
 *
 * Licence complète dans le fichier LICENSE à la racine du projet.
 */
EOF

# Fonction pour vérifier si le fichier est dans un dossier à exclure
is_excluded() {
    for excl in "${EXCLUSIONS[@]}"; do
        if [[ "$1" == *"/$excl/"* ]]; then
            return 0
        fi
    done
    return 1
}

# Fonction principale
ajouter_entete() {
    local fichier="$1"
    # Vérifie si l'en-tête est déjà présent
    if grep -q "Copyright (c) 2025 duanrA" "$fichier"; then
        echo "[SKIP] $fichier (déjà modifié)"
    else
        echo "[MODIF] $fichier"
        # Crée un fichier temporaire avec l'en-tête + le contenu original
        TMPFILE=$(mktemp)
        echo "$HEADER" > "$TMPFILE"
        echo "" >> "$TMPFILE"
        cat "$fichier" >> "$TMPFILE"
        mv "$TMPFILE" "$fichier"
    fi
}

# Parcourt tous les fichiers correspondant aux extensions
find . -type f \( $(printf -- '-name "*.%s" -o ' "${EXTENSIONS[@]}" | sed 's/ -o $//') \) | while read -r fichier; do
    if ! is_excluded "$fichier"; then
        ajouter_entete "$fichier"
    fi
done

echo "✅ En-têtes ajoutés avec succès."

#!/bin/bash

# Nom du fichier de sortie
OUTPUT="structure.txt"

# Dossiers à exclure
EXCLUDE="node_modules|.git|dist"

# Profondeur maximale
DEPTH=2

echo "📂 Génération de l'arborescence du projet..."
tree -L $DEPTH -I "$EXCLUDE" > $OUTPUT

echo "✅ Arborescence enregistrée dans '$OUTPUT'"

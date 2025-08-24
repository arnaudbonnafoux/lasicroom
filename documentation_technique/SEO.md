# 🔎 SEO – Optimisation du site *La SicRoom*

## 1. Métadonnées HTML
- Ajout des balises `<meta>` essentielles dans `public/index.html` :  
  - `meta name="description"` → description claire du site.  
  - `meta name="keywords"` → mots-clés liés à la musique, concerts, billetterie.  
  - `meta name="author"` → auteur du site.  
  - `meta name="viewport"` → affichage responsive sur mobile.  
  - `meta name="theme-color"` → personnalisation de l’affichage mobile.  

- Utilisation d’un titre unique et pertinent :  
  ```html
  <title>La SicRoom – Salle de concerts SMAC</title>

---

## 2. Accessibilité SEO

* Attribut `lang="fr-FR"` défini dans `<html>`.
* Liens et boutons accessibles (ajout des `aria-label` et des `for` corrects dans les labels React).
* Contraste des couleurs vérifié avec **axe DevTools** et corrigé.
* Structure sémantique améliorée avec des balises logiques (`<header>`, `<main>`, `<footer>`, `<nav>`).

---

## 3. Indexation par les moteurs de recherche

* Création d’un fichier **`robots.txt`** dans `public/` :

  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://90.0.91.102/sitemap.xml
  ```

* Ce fichier contrôle l’accès des robots aux pages du site et indique l’emplacement du sitemap.

---

## 4. Sitemap

* Génération d’un fichier **`sitemap.xml`** (placé dans `public/`) listant les pages principales :

  * Accueil
  * Agenda
  * Billetterie
  * Conditions d’utilisation
  * Mentions légales
  * Connexion / Inscription

* Permet d’améliorer l’indexation et la visibilité du site sur Google.

---

## 5. Performances et bonnes pratiques

* Optimisation des images via scripts `optimiser_images.sh` (compression).
* Utilisation d’`alt` descriptifs sur toutes les images.
* Navigation claire avec une **barre de menu** cohérente.
* Vérification avec des outils :

  * **axe DevTools** (accessibilité)
  * **Lighthouse** (SEO & performances).

---

## 6. Points à prévoir pour la mise en production

* Remplacer l’IP publique (`https://90.0.91.102/`) par le **futur nom de domaine**.
* Vérifier le sitemap et le robots.txt après la mise en ligne.
* Éventuellement ajouter l’intégration de **Google Search Console** pour suivre l’indexation.

---

✅ Résultat : le site est désormais **SEO-friendly, accessible, et prêt pour l’indexation** une fois en production avec un vrai domaine.


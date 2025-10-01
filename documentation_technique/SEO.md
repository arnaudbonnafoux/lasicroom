# 🔎 SEO – Optimisation du site *La SicRoom* avec Helmet

## 1. Métadonnées HTML

* Ajout des balises `<meta>` essentielles dans `public/index.html` (globales) :

  * `meta name="viewport"` → affichage responsive sur mobile.
  * `meta name="theme-color"` → personnalisation de l’affichage mobile.
  * Favicon, manifest, charset, robots et langue (`lang="fr-FR"`).
* Les balises spécifiques à chaque page (titre, description, Open Graph, Twitter Card) **sont gérées dynamiquement via Helmet** côté React.

### Exemple d’utilisation dans une page React :

```jsx
import React from 'react';
import HelmetWrapper from '../composants/HelmetWrapper';

function Accueil() {
  return (
    <>
      <HelmetWrapper
        title="Accueil - La Sicroom"
        description="Découvrez la programmation musicale de la SicRoom et réservez vos places en ligne."
      />
      <main>
        {/* Contenu de la page */}
      </main>
    </>
  );
}

export default Accueil;
```

* `HelmetWrapper` permet de définir un `<title>` et `<meta name="description">` propres à chaque page.
* Facilement extensible pour Open Graph et Twitter Card.

---

## 2. Accessibilité SEO

* Attribut `lang="fr-FR"` défini dans `<html>`.
* Liens et boutons accessibles (ajout des `aria-label` et des `for` corrects dans les labels React).
* Contraste des couleurs vérifié avec **axe DevTools** et corrigé.
* Structure sémantique améliorée avec des balises logiques (`<header>`, `<main>`, `<footer>`, `<nav>`).
* Helmet ne remplace pas l’accessibilité, mais permet que les titres et descriptions soient correctement lus par les lecteurs d’écran et moteurs de recherche.

---

## 3. Indexation par les moteurs de recherche

* Fichier **`robots.txt`** dans `public/` :

```txt
User-agent: *
Allow: /

Sitemap: https://ip/sitemap.xml
```

* Contrôle l’accès des robots et indique l’emplacement du sitemap.
* Les titres et descriptions définis via Helmet sont dynamiques, ce qui améliore la pertinence SEO des pages individuelles.

---

## 4. Sitemap

* Fichier **`sitemap.xml`** listant les pages principales :

  * Accueil
  * Agenda
  * Billetterie
  * Conditions d’utilisation
  * Mentions légales
  * Connexion / Inscription
* Les titres des pages dans le sitemap peuvent correspondre aux `<title>` définis via Helmet pour la cohérence SEO.

---

## 5. Performances et bonnes pratiques

* Optimisation des images via scripts `optimiser_images.sh` (compression).
* Utilisation d’`alt` descriptifs sur toutes les images.
* Navigation claire avec une **barre de menu** cohérente.
* Vérification avec des outils :

  * **axe DevTools** (accessibilité)
  * **Lighthouse** (SEO & performances)
* Helmet permet une mise à jour **instantanée des balises meta** lorsque l’utilisateur navigue entre les pages sans recharger le site (SPA).

---

## 6. Points à prévoir pour la mise en production

* Remplacer l’IP publique (`https://ip/`) par le **futur nom de domaine**.
* Vérifier le sitemap et le robots.txt après la mise en ligne.
* Intégrer **Google Search Console** pour suivre l’indexation.
* Vérifier que les titres et descriptions dynamiques définis via Helmet sont correctement pris en compte par les moteurs de recherche.

---

✅ **Résultat :**
Le site est désormais **SEO-friendly, accessible, et prêt pour l’indexation**, avec des balises meta dynamiques gérées via Helmet côté React.
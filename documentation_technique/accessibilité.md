# ♿ Accessibilité du projet LASICROOM

## 1. Objectifs

* Garantir que l’application soit utilisable par tous, y compris les personnes ayant des handicaps visuels, auditifs ou moteurs.
* Respecter les bonnes pratiques des **WCAG 2.1** (Web Content Accessibility Guidelines).
* Améliorer l’expérience utilisateur grâce à une navigation claire et cohérente.

---

## 2. Audit automatisé (axe DevTools – Firefox)

Un audit complet a été réalisé avec **axe DevTools**.
Les principaux problèmes identifiés étaient :

* **Contraste insuffisant** sur certains textes (ex. #e994a9 sur #f4f9ff).
* **Absence d’association explicite entre `label` et `input`**.
* **Champs de formulaire sans description explicite pour les lecteurs d’écran**.
* **Attributs ARIA manquants ou inutilisés**.

---

## 3. Corrections apportées

* **Contraste des couleurs**

  * Les couleurs de texte et de fond ont été corrigées pour atteindre un ratio minimal de **4.5:1** (WCAG AA).
  * Exemple : le texte en rose clair (#e994a9) a été assombri pour garantir un meilleur contraste.

* **Formulaires accessibles**

  * Chaque champ `<input>` est désormais lié à un `<label>` via l’attribut `htmlFor` (React).
  * Exemple :

    ```jsx
    <label htmlFor="email_artiste">Email :</label>
    <input type="email" id="email_artiste" name="email_artiste" ... />
    ```

* **Attributs ARIA**

  * Ajout de rôles et d’`aria-label` pour mieux décrire les boutons et zones interactives si nécessaire.
  * Exemple : bouton d’envoi de formulaire → `<button type="submit" aria-label="Envoyer le formulaire">`.

* **Navigation clavier**

  * Vérification que tous les éléments interactifs sont accessibles avec **Tab / Entrée / Espace**.
  * Ordre logique de tabulation respecté.

* **Alternatives textuelles**

  * Ajout d’attributs `alt` pertinents pour toutes les images décoratives et illustratives.
  * Les images purement décoratives reçoivent `alt=""`.

---

## 4. Tests manuels

* **Navigation clavier** : tous les formulaires et boutons sont utilisables sans souris.
* **Compatibilité lecteurs d’écran** : test effectué avec **Orca (Linux)** → les champs et boutons sont correctement annoncés.
* **Responsive design** : lisibilité vérifiée sur mobile et desktop.

---

## 5. Limites et améliorations futures

* **Tests utilisateurs réels** non effectués → prévoir une phase avec des retours de personnes en situation de handicap.
* **Audit continu** : chaque nouvelle fonctionnalité devra être auditée avec axe DevTools.
* **Compatibilité ARIA avancée** : certains composants (modals, menus dynamiques) pourraient être enrichis avec des rôles ARIA plus précis.

---

✅ **Conclusion** :
Le projet **LASICROOM** respecte désormais les critères principaux d’accessibilité (contraste, navigation clavier, ARIA basique, formulaires accessibles).
Des améliorations futures sont prévues pour atteindre un niveau encore plus conforme aux WCAG 2.1.
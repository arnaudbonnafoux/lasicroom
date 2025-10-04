# Présentation générale  

🎶 *LasicRoom se veut une solution simple, efficace et adaptée aux structures locales, afin de mettre en valeur la richesse musicale de leur territoire.*

---

**LasicRoom** est le site officiel d’une **S.M.A.C.** (Salle de Musiques Actuelles), un lieu dédié à la découverte et à la diffusion des musiques actuelles.  

Grâce à la plateforme, les visiteurs peuvent :  
- découvrir la salle et son identité,  
- consulter la programmation du trimestre en cours,  
- accéder à un formulaire réservé aux musiciens locaux souhaitant être accompagnés dans leur parcours de professionnalisation.

[lasicRoom dev](https://lasicroom.local/)

[LasicRoom auto-prod](https://90.0.94.33/)

---

### Fonctionnalités principales  

- **Billetterie en ligne** : pour acheter un billet, l’utilisateur doit créer un compte ou se connecter.  
- **Espace personnel** : chaque utilisateur connecté dispose d’un tableau de bord lui permettant de consulter ses réservations.  
- **Simplicité et accessibilité** : l’application a été pensée pour les ERP de petite taille, avec une jauge n’excédant pas 300 places.  
- **Administration** : une interface dédiée permet aux responsables de gérer facilement la billetterie et l’organisation des événements.  

---

### Technologies, ressources pédagogiques et paradigme de programmation

[Cahier des charges](/documentation_technique/Projet%20-%20Développement%20du%20site%20web%20de%20La%20sicRoom%20–%20Salle%20de%20concert%20SMAC.pdf)

Pour le développement de cette application, nous avons choisi :  
- **Node.js** et **Express** pour le backend  
- **React** pour le frontend  
- **PostgreSQL** pour la gestion de la base de données  
- **Nginx** comme serveur et proxy  

    [Config Nginx](./configuration_nginx)

- **ChatGPT (sans abonnement)** Génération et correction de code avec commentaires didactiques.
- **Copilot (sans abonnement)** auto-complétion
- [Site MDN](https://developer.mozilla.org/fr/)
- [Site Tout JavaScript](https://www.toutjavascript.com/livre/scripts.php)
- [Plateforme W3School](https://profile.w3schools.com)

Le paradigme de programmation est basé sur le **modèle MVC** :  
- **Model** : gestion des données avec PostgreSQL  
- **Controller** : logique métier avec Express  
- **View** : interface utilisateur avec React (côté client)  

---

### Structure du projet ###

[Structure de LasicRoom](../structure_générale.md) 

[Dépôt Github](https://github.com/Ilaria-Digital-School/Projet.Arnaud.Bonnafoux.2025.git)

---

### Critères d'évaluation ###

[Critères d'évaluation](/documentation_technique/⚠️%20Critères%20d_évaluation%20-%20Webecom%20REFERENTIEL%20de%20compétences%20-%20France%20Compétences.pdf)

---

### Parcours (démo)

[Parcours utilisateur](./parcours_utilisateur.md)

[Parcdours admin](./parcours_admin.md)




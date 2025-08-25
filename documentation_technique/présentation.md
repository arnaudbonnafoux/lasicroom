# Présentation générale  

[Structure de LasicRoom](./structure_générale.md)  

**LasicRoom** est le site officiel d’une **S.M.A.C.** (Salle de Musiques Actuelles), un lieu dédié à la découverte et à la diffusion des musiques actuelles.  

Grâce à la plateforme, les visiteurs peuvent :  
- découvrir la salle et son identité,  
- consulter la programmation du trimestre en cours,  
- accéder à un formulaire réservé aux musiciens locaux souhaitant être accompagnés dans leur parcours de professionnalisation.  

---

### Fonctionnalités principales  

- **Billetterie en ligne** : pour acheter un billet, l’utilisateur doit créer un compte ou se connecter.  
- **Espace personnel** : chaque utilisateur connecté dispose d’un tableau de bord lui permettant de gérer ses réservations.  
- **Simplicité et accessibilité** : l’application a été pensée pour les ERP de petite taille, avec une jauge n’excédant pas 300 places.  
- **Administration** : une interface dédiée permet aux responsables de gérer facilement la billetterie et l’organisation des événements.  

---

### Technologies et paradigme de programmation

Pour le développement de cette application, nous avons choisi :  
- **Node.js** et **Express** pour le backend  
- **React** pour le frontend  
- **PostgreSQL** pour la gestion de la base de données  
- **Nginx** comme serveur et proxy  

Le paradigme de programmation est basé sur le **modèle MVC** :  
- **Model** : gestion des données avec PostgreSQL  
- **Controller** : logique métier avec Express  
- **View** : interface utilisateur avec React (côté client)  

---

🎶 *LasicRoom se veut une solution simple, efficace et adaptée aux structures locales, afin de mettre en valeur la richesse musicale de leur territoire.*

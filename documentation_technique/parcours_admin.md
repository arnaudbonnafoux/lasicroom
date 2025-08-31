### Parcours admin 

*Présantation du site La sicRoom (démo)*

1. Page Accueil (footer) 👉 Lien admin 👉 connexion 

    [Page accueil](https://lasicroom.local)

3. Page Concerts 👉 Actions :

    [Page Concert](https://lasicroom.local/admin/concerts) 👉 Rediriger vers la page /admin/connexion

    [code frontend](../lasicroom_front/src/pages/admin/gestion_concerts.js)

- Ajouter un concert
- Modifier un concert
- Obtenir la liste des concerts
- Supprimer un concert

    [Contrôleur](../lasicroom_back/controleurs/concert_controleur.js)

    [Module Route](../lasicroom_back/routes/concerts.js)

    [Test](../lasicroom_back/routes/test_concerts.sh)

    [app.js](../lasicroom_back/app.js)

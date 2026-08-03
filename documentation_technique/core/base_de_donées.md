# 🎟 Fonctionnement de la billetterie

[Backup BD](/documentation_technique/backup_lasicroom2.sql)

## 🔄 Parcours utilisateur

1. L’utilisateur consulte **l’agenda** via le site (affichage des concerts à venir).  
2. Il choisit un concert et clique sur **"Réserver"**.  
3. Avant d'accéder à la page billetterie, il doit **s’inscrire** ou **se connecter**.  
   Une fois connecté, il accède à son **espace personnel**.  
4. Sur la page de réservation :  
   - choix du **concert**,   
   - choix du **type de tarif** : *plein* ou *abonné*.  
5. L’utilisateur accède ensuite à son **tableau de bord**, qui récapitule l’ensemble de ses réservations.  

---

## 📏 Règles métier

- Un **utilisateur** peut effectuer **plusieurs réservations**, pour différents concerts.  
- Une **réservation** est toujours émise par **un seul utilisateur**.  
- Un **concert** peut faire l’objet de **plusieurs réservations**.  
- Une **réservation** est associée à **un seul concert**.  
- Chaque **réservation** est associée à **un seul type de tarif** (*plein* ou *abonné*).

---

# 🗄️ Base de données : `lasicroom2`


La base de données gère l’ensemble des fonctionnalités du site **LasicRoom** : billetterie, gestion des concerts, utilisateurs et demandes d’accompagnement des artistes locaux.

---

## 📊 Schéma relationnel

### 1. **Utilisateur** (`utilisateur`)

* Gère les comptes des usagers (public et administrateurs).
* Colonnes principales :

  * `id_utilisateur` *(PK)*
  * `nom` *(VARCHAR 100, NOT NULL)*
  * `email` *(VARCHAR 100, UNIQUE, NOT NULL)*
  * `mot_de_passe` *(hashé, NOT NULL)*
  * `role` *(CHECK: 'utilisateur' ou 'admin')*

🔗 Relations :

* 1 utilisateur peut avoir plusieurs **réservations** (`1,n`).

---

### 2. **Concert** (`concert`)

* Contient la programmation des concerts.
* Colonnes principales :

  * `id_concert` *(PK)*
  * `titre`, `description`
  * `date_concert` *(TIMESTAMP, NOT NULL)*
  * `nb_places_total`, `nb_places_restantes`
  * `tarif_plein`, `tarif_abonne` *(NUMERIC(6,2))*
  * `id_artiste` *(FK → artiste.id\_artiste, nullable, ON DELETE SET NULL)*

🔗 Relations :

* 1 concert est associé à **un seul artiste**.
* 1 concert peut avoir plusieurs **réservations** (`1,n`).

---

### 3. **Artiste** (`artiste`)

* Répertorie les artistes programmés dans la salle.
* Colonnes principales :

  * `id_artiste` *(PK)*
  * `nom_artiste` *(VARCHAR 100, NOT NULL)*
  * `style_musical`, `description`
  * `photo` *(chemin image)*
  * `lien_video` *(YouTube / Deezer, etc.)*

🔗 Relations :

* 1 artiste peut être lié à plusieurs **concerts** (`1,n`).

---

### 4. **Panier** (`panier`)

* Gère les articles en attente d'achat pour chaque utilisateur.
* Colonnes principales :

  * `id_panier` *(PK)*
  * `id_utilisateur` *(FK → utilisateur.id\_utilisateur, ON DELETE CASCADE)*
  * `id_concert` *(FK → concert.id\_concert, ON DELETE CASCADE)*
  * `type_tarif` *(CHECK: 'plein' ou 'abonne')*
  * `quantite` *(INT, NOT NULL, DEFAULT 1)*
  * `prix_unitaire` *(NUMERIC(6,2), NOT NULL)*
  * `date_ajout` *(TIMESTAMP, DEFAULT NOW)*

🔗 Relations :

* 1 utilisateur peut avoir plusieurs articles en panier (`1,n`).
* Un panier contient plusieurs concerts (`n,n`).

---

### 5. **Commande** (`commande`)

* Enregistre les commandes de paiement via Stripe.
* Colonnes principales :

  * `id_commande` *(PK)*
  * `id_utilisateur` *(FK → utilisateur.id\_utilisateur, ON DELETE CASCADE)*
  * `montant_total` *(NUMERIC(10,2), NOT NULL)*
  * `nombre_articles` *(INT, NOT NULL)*
  * `paiement_id` *(VARCHAR 255, FK → Stripe PaymentIntent ID)*
  * `paiement_statut` *(CHECK: 'pending', 'success', 'failed', 'refunded')*
  * `date_commande` *(TIMESTAMP, DEFAULT NOW)*
  * `date_paiement` *(TIMESTAMP, nullable)*

⚙️ Index :

* Index sur `id_utilisateur` pour requêtes rapides par utilisateur.
* Index sur `paiement_id` pour vérification du statut.

🔗 Relations :

* 1 utilisateur peut créer plusieurs commandes (`1,n`).
* Une commande déclenche N réservations après paiement.

---

### 6. **Réservation** (`reservation`)

* Centralise les réservations faites par les utilisateurs (après paiement confirmé).
* Colonnes principales :

  * `id_reservation` *(PK)*
  * `date_reservation` *(TIMESTAMP, DEFAULT NOW)*
  * `id_utilisateur` *(FK → utilisateur.id\_utilisateur)*
  * `id_concert` *(FK → concert.id\_concert, ON DELETE CASCADE)*
  * `type_tarif` *(CHECK: 'plein' ou 'abonne')*
  * `montant` *(NUMERIC(6,2))*
  * `quantite` *(INT, DEFAULT 1)*

⚙️ Trigger :

* `trg_decrementer_places` : à chaque réservation, décrémente `nb_places_restantes` du concert associé.

🔗 Relations :

* Une réservation concerne **un seul utilisateur** et **un seul concert** (`n,1`).

---

### 7. **Accompagnement** (`accompagnement`)

* Permet aux artistes locaux de demander un suivi professionnel.
* Colonnes principales :

  * `id_demande` *(PK)*
  * `nom_artiste`, `email_artiste`, `style_musical`
  * `message` *(texte libre)*
  * `date_envoi` *(DEFAULT CURRENT\_TIMESTAMP)*
  * `traite` *(boolean, DEFAULT false)*

🔗 Relations :

* Table indépendante (pas de clé étrangère).

---

## 📐 Schéma conceptuel (cardinalités)

* **Utilisateur** `1,n` → **Panier** (avant paiement) ou **Commande** → **Réservation** `n,1` → **Concert** `n,1` → **Artiste**
* **Accompagnement** est indépendante.

* [Diagramme UML](/documentation_technique/diagrammeUML.png)

---

## ✅ Points forts de la modélisation

* Contraintes de cohérence (`CHECK`, `UNIQUE`, `NOT NULL`).
* Trigger pour garantir la mise à jour des places restantes.
* Gestion des rôles (`utilisateur` / `admin`).
* Séparation claire entre la programmation (`concert`, `artiste`) et les demandes locales (`accompagnement`).
* **Intégration Stripe** : table `commande` pour tracer les paiements et synchroniser avec PaymentIntent.
* **Panier éphémère** : permet aux utilisateurs de modifier leur sélection avant paiement.


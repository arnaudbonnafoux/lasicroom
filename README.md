# 🎶 La sicRoom – Application Web pour une S.M.A.C. 😎

🌐 **Live :** [La sicRoom](https://lasicroom.duckdns.org/) (Démo sur demande)

---

## 🌳 Branches du Projet

Ce projet utilise **deux branches distinctes** :

### 🔴 `main` - Production Stable

- Version **JavaScript** classique (JS vanilla)
- **Stable** et prête pour la production
- Mises à jour indépendantes

### 🟦 `dev` - Développement TypeScript

- ✅ **Migration TypeScript complétée** (30 fichiers backend .ts, 37 frontend .tsx)
- Fonctionnalités expérimentales
- Tests unitaires avec Vitest
- Stack moderne : Express 5 + React 19 + PostgreSQL 14

**Choix de votre branche selon vos besoins :**

```bash
# Pour la stabilité
git checkout main

# Pour les dernières features en TypeScript
git checkout dev
```

---

## 📌 Présentation

Le projet consiste à développer une application web pour une salle de concert **S.M.A.C.**, spécialisée dans les musiques actuelles : **La sicRoom**.

Cette plateforme permet de :

- présenter la programmation musicale,
- vendre des billets en ligne,
- proposer un espace d’accompagnement pour les artistes locaux,
- rendre accessible du contenu multimédia _(vidéos, live stream, ressources pédagogiques)_.

Le site s’adresse à plusieurs types d’utilisateurs :

- **Grand public** : découvrir la salle et acheter des billets,
- **Artistes locaux** : bénéficier d’un espace dédié pour leur accompagnement,
- **Administrateurs** : gérer la billetterie et la programmation.

---

## 🚀 Fonctionnalités principales

- 🎤 **Programmation** : affichage clair des concerts à venir.
- 🎟 **Billetterie en ligne** : achat et réservation sécurisés.
- 👩‍🎤 **Espace artistes** : dépôt de dossiers, suivi et accompagnement.
- 📺 **Contenu multimédia** : vidéos, live stream, supports pédagogiques.
- 🛠 **Interface admin** : gestion simplifiée de la salle et des événements.

---

## 🛠 Tech Stack

### `dev` - TypeScript (Recommandé)

**Backend :**

- Express.js 5.1.0 (TypeScript)
- PostgreSQL 14 avec pg
- JWT pour l'authentification
- Stripe pour les paiements
- Tests unitaires : Vitest

**Frontend :**

- React 19.1.0 (TypeScript)
- React Router 6.26.0
- Bootstrap 5.3.7
- Stripe integration
- Build optimisé : 112.92 kB gzipped JS

### `main` - JavaScript Classique

- Stack JavaScript vanilla
- Configuration production stable
- Moins de dépendances

---

## 🚀 Démarrage Rapide

### Branche `dev` (TypeScript)

#### Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm 9+

#### Backend

```bash
cd lasicroom_back
npm install --legacy-peer-deps
npm run build      # Compile TypeScript → dist/
npm start         # Démarrage production
npm run dev       # Dev avec nodemon
npm test          # Tests Vitest
```

#### Frontend

```bash
cd lasicroom_front
npm install --legacy-peer-deps
npm run build     # Build optimisé
npm start         # Dev server
```

#### Configuration

Créer `.env` dans `lasicroom_back/` :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/lasicroom2
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
YOUTUBE_API_KEY=your_youtube_key  # Pour live streaming
```

### Branche `main`

```bash
# Similar setup but with JavaScript stack
cd lasicroom_back
npm install
npm start
```

---

## 📚 Documentation

Consultez le dossier `documentation_technique/` :

- **[/core/](documentation_technique/core)** - Architecture et tech stack
- **[/deployments/](documentation_technique/deployments)** - Guides de déploiement
- **[/assets/](documentation_technique/assets)** - Ressources (diagrams, PDFs)

---

## ✅ État du Projet

| Feature          | main | dev         |
| ---------------- | ---- | ----------- |
| TypeScript       | ❌   | ✅          |
| Express 5        | ❌   | ✅          |
| React 19         | ❌   | ✅          |
| Tests unitaires  | ❌   | ✅ (Vitest) |
| Stripe intégré   | ✅   | ✅          |
| Production ready | ✅   | ✅          |

---

## 📝 Notes

- Branches indépendantes : chaque branche peut évoluer de manière autonome
- Documentation synchronisée entre les branches

---

## 📞 Support

Pour plus d'informations, consulter la documentation technique dans `documentation_technique/README.md`

**Dernière mise à jour :** Août 2026

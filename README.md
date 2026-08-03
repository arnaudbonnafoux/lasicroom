# 🎶 La sicRoom – Application Web pour une S.M.A.C.

🌐 **Live :** [La sicRoom](https://lasicroom.duckdns.org/) | **Démo sur demande**

---

## 🌳 Deux Branches

- **`main`** : JavaScript stable, production-ready
- **`dev`** : TypeScript moderne (Express 5, React 19, Vitest) - Recommandé

---

## À propos

Plateforme web pour la salle de concert **La sicRoom** (SMAC). Gestion complète : programmation, billetterie en ligne, espace artistes, contenu multimédia.

---

## 🚀 Démarrage Rapide

### Prérequis
Node.js 18+, PostgreSQL 14+, npm 9+

### Backend (`dev` - TypeScript)
```bash
cd lasicroom_back
npm install --legacy-peer-deps
npm run build
npm test
npm start
```

### Frontend
```bash
cd lasicroom_front
npm install --legacy-peer-deps
npm start
```

### Configuration
Créer `.env` dans `lasicroom_back/` :
```env
DATABASE_URL=postgresql://user:password@localhost:5432/lasicroom2
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

---

## 📚 Documentation

Voir [`documentation_technique/README.md`](documentation_technique/README.md) pour :
- Architecture & Tech Stack
- Guides de déploiement
- Migrations SQL

---

## ✅ Tech Stack (`dev`)

| Backend | Frontend |
|---------|----------|
| Express 5 + TypeScript | React 19 + TypeScript |
| PostgreSQL 14 | React Router 6 |
| JWT + Stripe | Bootstrap 5 |
| Vitest (tests) | Stripe integration |

---

**Note :** Branches indépendantes, chaque branche évolue autonomement.

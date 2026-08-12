# 📚 Documentation Technique - La sicRoom

Index principal de la documentation du projet.

## 🚀 Démarrage Rapide

**Nouvel arrivant ?** Commencez par :

1. Lire [Outils Backend](fondamentaux/backend.md)
2. Lire [Outils Frontend](fondamentaux/frontend.md)
3. Consulter [Déploiement](deploiement/déploiement.md)

## 📁 Structure de la Documentation

### `/fondamentaux/` - Fondamentaux

- **[backend.md](fondamentaux/backend.md)** - Tech stack backend (Express, TypeScript, PostgreSQL)
- **[frontend.md](fondamentaux/frontend.md)** - Tech stack frontend (React, Vite, Stripe)
- **[sécurité.md](fondamentaux/sécurité.md)** - Aspects sécurité (JWT, CSRF, rate limiting)
- **[base_de_donées.md](fondamentaux/base_de_donées.md)** - Schema PostgreSQL et relations
- **[SEO.md](fondamentaux/SEO.md)** - Optimisation SEO et sitemap

### `/deploiement/` - Déploiement

- **[déploiement.md](deploiement/déploiement.md)** - Guide de déploiement complet
- **[HTTPS_DEPLOYMENT.md](deploiement/HTTPS_DEPLOYMENT.md)** - Configuration HTTPS et SSL
- **[setup_stripe.md](deploiement/setup_stripe.md)** - Intégration Stripe
- **[live_streaming.md](deploiement/live_streaming.md)** - Streaming YouTube en direct
- **[nginx.conf](deploiement/nginx.conf)** - Configuration Nginx

### `/ressources/` - Ressources

- **diagrammeUML.png** - Diagramme UML du projet
- **PDFs** - Documentation de projet et critères d'évaluation

### `/migrations_sql/` - Migrations Base de Données

- Migration quantité réservation
- Migration panier
- Migration commande Stripe
- Backup base de données

## 🔧 Tâches Courantes

**Je veux déployer le projet**
→ Lire [déploiement.md](deploiement/déploiement.md)

**Je veux ajouter une fonctionnalité**
→ Lire [backend.md](fondamentaux/backend.md) ou [frontend.md](fondamentaux/frontend.md)

**Je veux comprendre la base de données**
→ Lire [base_de_donées.md](fondamentaux/base_de_donées.md)

**Je veux intégrer Stripe**
→ Lire [setup_stripe.md](deploiement/setup_stripe.md)

**Je veux voir les améliorations prévues**
→ Lire [backend.md](fondamentaux/backend.md) (section "Proposition d'amélioration")

## 📝 Notes

- Documentation pour **TypeScript** (migration complétée)
- Stack: Express 5 + React 19 + PostgreSQL 14
- Frontend build optimisé (gzip: 112.92 kB JS + 3.76 kB CSS)
- Tests unitaires: Vitest (npm run test)

---

**Dernière mise à jour:** Août 2026

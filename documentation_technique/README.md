# 📚 Documentation Technique - La sicRoom

Index principal de la documentation du projet.

## 🚀 Démarrage Rapide

**Nouvel arrivant ?** Commencez par :

1. Lire [Outils Backend](core/backend.md)
2. Lire [Outils Frontend](core/frontend.md)
3. Consulter [Déploiement](deployments/déploiement.md)

## 📁 Structure de la Documentation

### `/core/` - Fondamentaux

- **[backend.md](core/backend.md)** - Tech stack backend (Express, TypeScript, PostgreSQL)
- **[frontend.md](core/frontend.md)** - Tech stack frontend (React, Vite, Stripe)
- **[sécurité.md](core/sécurité.md)** - Aspects sécurité (JWT, CSRF, rate limiting)
- **[base_de_donées.md](core/base_de_donées.md)** - Schema PostgreSQL et relations
- **[SEO.md](core/SEO.md)** - Optimisation SEO et sitemap

### `/deployments/` - Déploiement

- **[déploiement.md](deployments/déploiement.md)** - Guide de déploiement complet
- **[HTTPS_DEPLOYMENT.md](deployments/HTTPS_DEPLOYMENT.md)** - Configuration HTTPS et SSL
- **[setup_stripe.md](deployments/setup_stripe.md)** - Intégration Stripe
- **[live_streaming.md](deployments/live_streaming.md)** - Streaming YouTube en direct
- **[nginx.conf](deployments/nginx.conf)** - Configuration Nginx

### `/assets/` - Ressources

- **diagrammeUML.png** - Diagramme UML du projet
- **PDFs** - Documentation de projet et critères d'évaluation

### `/sql_migrations/` - Migrations Base de Données

- Migration quantité réservation
- Migration panier
- Migration commande Stripe
- Backup base de données

## 🔧 Tâches Courantes

**Je veux déployer le projet**
→ Lire [déploiement.md](deployments/déploiement.md)

**Je veux ajouter une fonctionnalité**
→ Lire [backend.md](core/backend.md) ou [frontend.md](core/frontend.md)

**Je veux comprendre la base de données**
→ Lire [base_de_donées.md](core/base_de_donées.md)

**Je veux intégrer Stripe**
→ Lire [setup_stripe.md](deployments/setup_stripe.md)

## 📝 Notes

- Documentation pour **TypeScript** (migration complétée)
- Stack: Express 5 + React 19 + PostgreSQL 14
- Frontend build optimisé (gzip: 112.92 kB JS + 3.76 kB CSS)
- Tests unitaires: Vitest (npm run test)

---

**Dernière mise à jour:** Août 2026

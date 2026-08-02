# 📁 Structure du projet - La sicRoom

## 🎯 Vue d'ensemble

```
.
├── .copilot-instructions.md        # Directives de sécurité pour l'IA
├── .gitignore                      # Configuration Git
├── LICENSE                         # Licence du projet
├── README.md                       # Documentation du projet
├── structure_générale.md           # Ce fichier
│
├── 📜 Scripts de déploiement
│   ├── ouverture_site.sh          # ✅ Démarre Nginx + Frontend + Backend
│   ├── fermeture_site.sh          # ✅ Arrête tout le stack
│   └── generer_logs_nginx.sh      # Utilitaire - Archive logs Nginx
│
├── 📚 Documentation technique
│   └── documentation_technique/
│       ├── accessibilité.md
│       ├── backend.md
│       ├── base_de_donées.md
│       ├── cadre_légal.md
│       ├── configuration_nginx
│       ├── déploiement.md
│       ├── frontend.md
│       ├── HTTPS_DEPLOYMENT.md
│       ├── implementation_finale_resume.md
│       ├── live_streaming.md
│       ├── optimisation.md
│       ├── parcours_admin.md
│       ├── parcours_utilisateur.md
│       ├── présentation.md
│       ├── PRODUCTION_READINESS.md
│       ├── sécurité.md
│       ├── SEO.md
│       ├── setup_stripe.md
│       ├── sommaire.md
│       ├── backup_lasicroom2.sql
│       ├── migration_*.sql (3 fichiers de migration)
│       ├── bd_structure.txt
│       ├── diagrammeUML.png
│       ├── regex_validation.md
│       └── PDFs de référence
│
├── 🏗️ Backend TypeScript (Express + PostgreSQL)
│   └── lasicroom_back/
│       ├── tsconfig.json           # Configuration TypeScript strict
│       ├── package.json            # Dépendances backend
│       ├── package-lock.json
│       ├── app.ts                  # 🔴 Entry point Express
│       ├── db.ts                   # Connexion PostgreSQL
│       ├── email.ts                # Nodemailer SMTP
│       │
│       ├── 📂 dist/                # ✅ Compilé TypeScript (généré)
│       │   ├── app.js
│       │   ├── db.js
│       │   ├── email.js
│       │   ├── controleurs/        # 9 contrôleurs compilés
│       │   ├── middlewares/        # 8 middlewares compilés
│       │   ├── routes/             # 9 routes compilées
│       │   ├── types/              # Types TypeScript compilés
│       │   └── *.js.map            # Source maps
│       │
│       ├── controleurs/            # 🔴 Logique métier TypeScript
│       │   ├── accompagnement_controleur.ts
│       │   ├── artiste_controleur.ts
│       │   ├── concert_controleur.ts
│       │   ├── connexion_controleur.ts
│       │   ├── live_controleur.ts
│       │   ├── panier_controleur.ts
│       │   ├── reservation_controleur.ts
│       │   ├── stripe_controleur.ts
│       │   └── utilisateur_controleur.ts
│       │
│       ├── routes/                 # 🔴 Endpoints API TypeScript
│       │   ├── accompagnements.ts
│       │   ├── artistes.ts
│       │   ├── concerts.ts
│       │   ├── connexions.ts
│       │   ├── live.ts
│       │   ├── panier.ts
│       │   ├── reservations.ts
│       │   ├── stripe.ts
│       │   ├── utilisateurs.ts
│       │   └── test_*.sh           # Tests API curl
│       │
│       ├── middlewares/            # 🔴 Middleware TypeScript
│       │   ├── authMiddleware.ts
│       │   ├── compressionImage.ts # Sharp - WebP 800px
│       │   ├── csrfMiddleware.ts
│       │   ├── isAdmin.ts
│       │   ├── multerConfig.ts     # Upload fichiers
│       │   ├── paginationMiddleware.ts
│       │   ├── rateLimitMiddleware.ts (4 limiters)
│       │   └── validationMiddleware.ts
│       │
│       ├── types/                  # 🔴 Définitions TypeScript
│       │   └── index.ts            # 6 interfaces
│       │
│       ├── photos_artistes/        # Stockage images (WebP)
│       ├── back.log                # Logs serveur
│       └── structure_backend.md    # Documentation backend
│
├── 🎨 Frontend React + TypeScript
│   └── lasicroom_front/
│       ├── tsconfig.json           # Configuration TypeScript
│       ├── package.json            # Dépendances frontend
│       ├── package-lock.json       # (--legacy-peer-deps)
│       │
│       ├── 📂 build/               # ✅ Build de production (généré)
│       │   ├── index.html
│       │   ├── manifest.json
│       │   ├── robots.txt
│       │   ├── site.xml
│       │   ├── static/
│       │   │   ├── css/            # Styles minifiés
│       │   │   ├── js/             # Code optimisé 112.92 KB
│       │   │   └── media/
│       │   └── images/
│       │
│       ├── 📂 public/              # Fichiers statiques
│       │   ├── index.html          # Template HTML
│       │   ├── manifest.json       # PWA manifest
│       │   ├── robots.txt
│       │   ├── site.xml
│       │   ├── favicon.ico
│       │   ├── logo192.png, logo512.png
│       │   └── images/             # SVG et images
│       │
│       ├── 📂 src/                 # 🔴 Source TypeScript/TSX
│       │   ├── App.tsx             # 🔴 Component racine
│       │   ├── index.tsx           # 🔴 Entry point React
│       │   ├── App.css
│       │   ├── index.css
│       │   │
│       │   ├── composants/         # 🔴 Composants réutilisables
│       │   │   ├── CardConcert.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Header.tsx, HeaderAdmin.tsx, HeaderUser.tsx
│       │   │   ├── HelmetWrapper.tsx
│       │   │   ├── LiveStream.tsx
│       │   │   ├── Modal.tsx
│       │   │   ├── Navbar.tsx, NavbarAdmin.tsx, NavbarUser.tsx
│       │   │   ├── PrivateRoute.tsx (User protection)
│       │   │   └── PrivateRouteAdmin.tsx (Admin protection)
│       │   │
│       │   ├── contexts/           # 🔴 State Management (Context API)
│       │   │   ├── PanierContext.tsx
│       │   │   └── StripeContext.tsx
│       │   │
│       │   ├── pages/              # 🔴 Pages principales
│       │   │   ├── accueil.tsx
│       │   │   ├── accueil_user.tsx
│       │   │   ├── accompagnement.tsx
│       │   │   ├── agenda.tsx, agenda_user.tsx
│       │   │   ├── billetterie.tsx
│       │   │   ├── connexion.tsx, connexion_user.tsx
│       │   │   ├── inscription.tsx
│       │   │   ├── panier.tsx
│       │   │   ├── paiementpage.tsx (Stripe)
│       │   │   ├── dashboard.tsx (Admin)
│       │   │   ├── options.tsx
│       │   │   ├── conditions_utilisation.tsx
│       │   │   ├── mentions_legales.tsx
│       │   │   └── admin/
│       │   │       ├── gestion_concerts.tsx
│       │   │       ├── gestion_artistes.tsx
│       │   │       ├── gestion_reservations.tsx
│       │   │       ├── gestion_accompagnement.tsx
│       │   │       └── gestion_connexion.tsx
│       │   │
│       │   ├── styles/             # Styles CSS
│       │   │   └── (22 fichiers CSS)
│       │   │
│       │   └── utils/              # 🔴 Utilitaires TypeScript
│       │       └── validation.ts   # Validation formulaires
│       │
│       ├── README.md
│       └── structure_frontend.md
│
└── .vscode/                        # Configuration VS Code (local)
```

---

## 🔄 Migration TypeScript - État Actuel ✅

### Backend (30 fichiers .ts)
- **app.ts**: Configuration Express + middleware chains
- **9 Contrôleurs**: Logique métier complètement typée
- **9 Routes**: API REST avec validation express-validator
- **8 Middlewares**: auth, CSRF, rate-limiting, compression, etc.
- **Types centralisés**: `types/index.ts` (6 interfaces)
- **Build**: `tsc` → `dist/` (30 fichiers .js générés)

### Frontend (37 fichiers .tsx/.ts)
- **App.tsx, index.tsx**: Entry points React typés
- **13 Composants**: Tous en .tsx avec interfaces TypeScript
- **16 Pages**: Accueil, billetterie, dashboard admin, etc.
- **5 Pages Admin**: Gestion concerts, artistes, réservations
- **2 Contexts**: PanierContext, StripeContext
- **Validation**: `utils/validation.ts` (5 fonctions)
- **Build**: `npm run build` → `build/` (112.92 KB gzipped)

### Configuration TypeScript
- **Backend tsconfig**: Strict: true, CommonJS, ES2020 target
- **Frontend tsconfig**: Strict: false, ESNext
- **npm scripts**:
  - Backend: `build` (tsc), `dev` (ts-node nodemon), `start` (node dist/app.js)
  - Frontend: `start`, `build`, `test` (avec --legacy-peer-deps)

---

## 📊 Stack Technique

### Backend
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL 14+ (pg library)
- **Auth**: JWT (2h expiration) + bcrypt (10 rounds)
- **Security**: helmet, csurf, express-validator, express-rate-limit
- **File Upload**: multer + sharp (WebP 800px, quality 70)
- **Email**: nodemailer SMTP
- **Payments**: Stripe API integration

### Frontend
- **Framework**: React 19.1.0 + TypeScript 5.6.0
- **Router**: react-router-dom 6.26.0
- **State**: React Context API (PanierContext, StripeContext)
- **Styling**: Bootstrap 5.3.7 + CSS custom
- **Payments**: @stripe/react-stripe-js
- **HTTP**: axios 1.10.0
- **SEO**: react-helmet

---

## 🚀 Déploiement

**Scripts automatisés:**
```bash
./ouverture_site.sh    # ✅ Full stack: Nginx + React build + Node.js
./fermeture_site.sh    # ✅ Clean shutdown
```

**Build production:**
```bash
cd lasicroom_back && npm run build     # TypeScript → dist/
cd ../lasicroom_front && npm run build # React → build/
```

---

## 📌 Branches Git

- **main**: Production (HEAD: sécurisation dépôt)
- **dev**: ✅ Full TypeScript migration (ready to push)
- feature/backend-typescript-migration
- feature/frontend-typescript-migration

---

## 🔒 Sécurité

- ✅ `.env` files excluded (.gitignore)
- ✅ Parameterized SQL queries (XSS prevention)
- ✅ JWT token validation on all protected routes
- ✅ Role-based access control (admin/user)
- ✅ CSRF token middleware (selective exemption)
- ✅ Rate limiting (4 tiers: general, login, stripe, form)
- ✅ Helmet CSP for Stripe/Bootstrap integration
- ✅ bcrypt password hashing (10 salt rounds)

---

## 📝 Notes de migration

**Supprimé (legacy):**
- ❌ 69 fichiers .js (backend + frontend) → remplacés par .ts/.tsx
- ❌ ouvrir_serveur.sh, fermeture_serveur.sh (remplacés par full-stack scripts)
- ❌ mail.txt (feedback archive)

**Ajouté:**
- ✅ tsconfig.json (backend + frontend)
- ✅ dist/ (backend compilé) → ajouté à .gitignore
- ✅ @types/* packages (11 paquets)
- ✅ Validation TypeScript stricte

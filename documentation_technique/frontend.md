# 🎨 Frontend (React)

[Structure du frontend](./structure_frontend.md)

L’interface utilisateur a été conçue avec **Figma**.
Le graphisme se veut **sobre et minimaliste**, en cohérence avec l’identité des structures représentées (associations, S.M.A.C. de petite taille, etc.).

Du point de vue **expérience utilisateur (UX)**, l’objectif est d’éviter toute complexité inutile.
Le site a été pensé pour être **simple d’utilisation**, afin de rester accessible à un public parfois éloigné du numérique, comme les séniors.

---

## ⚛️ React

Le frontend repose sur **React**, permettant de développer une **SPA** (Single Page Application) robuste et sécurisée.
Les principaux concepts fondamentaux y sont utilisés :

* **JSX**
* **Hooks** : `useState`, `useEffect`, `useNavigate`, etc.
* **Props**
* **Routing** avec `react-router-dom` (voir `App.js`)
* **Appels API** avec Axios et Fetch pour communiquer avec le backend
* Rendu dynamique via `.map()`
* Gestion du token via `sessionStorage()`
* Build React servi par **Nginx** : `lasicroom_front/build/index.html`

---

## 🎨 CSS

Aucun framework CSS externe n’a été retenu : le style est entièrement codé à la main.
Les techniques principales utilisées sont :

* **Flexbox**
* **Media Queries** (responsive design)
* **Pseudo-classes**
* **Transitions et animations** avec `@keyframes`


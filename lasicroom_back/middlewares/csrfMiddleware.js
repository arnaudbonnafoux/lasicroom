const cookieParser = require("cookie-parser");
const csrf = require("csurf");

// Middleware pour parser les cookies
const cookieMiddleware = cookieParser();

// Middleware CSRF - utilise les cookies pour stocker les tokens
// Le token CSRF est nécessaire pour toutes les requêtes POST, PUT, DELETE
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS en production
    sameSite: "strict",
  },
});

// Middleware pour attacher le token CSRF à la réponse (en headers)
// Les clients récupèrent ce token et le renvoient dans les requêtes POST/PUT/DELETE
const attachCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.set("X-CSRF-Token", req.csrfToken());
  next();
};

module.exports = {
  cookieMiddleware,
  csrfProtection,
  attachCsrfToken,
};

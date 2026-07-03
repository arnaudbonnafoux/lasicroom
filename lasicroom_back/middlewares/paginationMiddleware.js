/**
 * Middleware de pagination réutilisable
 * Extrait et valide les paramètres de pagination depuis la query string
 * Ajoute les infos de pagination dans req.pagination
 */

const paginationMiddleware = (req, res, next) => {
  // Paramètres par défaut
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 100;

  // Extraire les paramètres de la query string
  let page = parseInt(req.query.page) || DEFAULT_PAGE;
  let limit = parseInt(req.query.limit) || DEFAULT_LIMIT;

  // Valider la page (minimum 1)
  if (page < 1) {
    page = DEFAULT_PAGE;
  }

  // Valider la limite
  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  }
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  // Calculer l'offset (OFFSET = (page - 1) * limit)
  const offset = (page - 1) * limit;

  // Stocker les infos de pagination dans req.pagination
  req.pagination = {
    page,
    limit,
    offset,
  };

  // Ajouter les infos de pagination aux response locals pour utilisation dans les routes
  res.locals.pagination = req.pagination;

  next();
};

/**
 * Utilitaire pour ajouter les headers de pagination à la réponse
 * À appeler après avoir le nombre total d'éléments
 *
 * @param {Response} res - Objet réponse Express
 * @param {number} totalCount - Nombre total d'éléments
 * @param {object} pagination - Objet pagination de req.pagination
 */
const sendPaginatedResponse = (res, data, totalCount, pagination) => {
  const totalPages = Math.ceil(totalCount / pagination.limit);

  // Ajouter les headers de pagination
  res.set("X-Total-Count", totalCount.toString());
  res.set("X-Total-Pages", totalPages.toString());
  res.set("X-Current-Page", pagination.page.toString());
  res.set("X-Page-Size", pagination.limit.toString());

  // Ajouter les liens de pagination (RFC 5988)
  const links = [];

  // Lien self
  links.push(`<>; rel="self"; page=${pagination.page}`);

  // Lien first
  links.push(`<>; rel="first"; page=1`);

  // Lien last
  if (totalPages > 1) {
    links.push(`<>; rel="last"; page=${totalPages}`);
  }

  // Lien prev
  if (pagination.page > 1) {
    links.push(`<>; rel="prev"; page=${pagination.page - 1}`);
  }

  // Lien next
  if (pagination.page < totalPages) {
    links.push(`<>; rel="next"; page=${pagination.page + 1}`);
  }

  if (links.length > 0) {
    res.set("Link", links.join(", "));
  }

  // Envoyer la réponse avec les données
  res.status(200).json(data);
};

module.exports = {
  paginationMiddleware,
  sendPaginatedResponse,
};

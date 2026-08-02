import { Request, Response, NextFunction } from "express";

// Étendre l'interface Request pour ajouter pagination
declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        limit: number;
        offset: number;
      };
    }
  }
}

/**
 * Middleware de pagination réutilisable
 * Extrait et valide les paramètres de pagination depuis la query string
 * Ajoute les infos de pagination dans req.pagination
 */
const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Paramètres par défaut
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 100;

  // Extraire les paramètres de la query string
  const queryPage = parseInt(req.query.page as string);
  const queryLimit = parseInt(req.query.limit as string);

  let page = !isNaN(queryPage) ? queryPage : DEFAULT_PAGE;
  let limit = !isNaN(queryLimit) ? queryLimit : DEFAULT_LIMIT;

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
 */
const sendPaginatedResponse = (
  res: Response,
  data: any[],
  totalCount: number,
  pagination: { page: number; limit: number; offset: number },
): void => {
  const totalPages = Math.ceil(totalCount / pagination.limit);

  // Ajouter les headers de pagination
  res.set("X-Total-Count", totalCount.toString());
  res.set("X-Total-Pages", totalPages.toString());
  res.set("X-Current-Page", pagination.page.toString());
  res.set("X-Page-Size", pagination.limit.toString());

  // Envoyer la réponse avec les données et les infos de pagination
  res.json({
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      totalCount,
      totalPages,
    },
  });
};

export { paginationMiddleware, sendPaginatedResponse };
export default paginationMiddleware;

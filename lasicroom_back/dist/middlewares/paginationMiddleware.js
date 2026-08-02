"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaginatedResponse = exports.paginationMiddleware = void 0;
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
    const queryPage = parseInt(req.query.page);
    const queryLimit = parseInt(req.query.limit);
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
exports.paginationMiddleware = paginationMiddleware;
/**
 * Utilitaire pour ajouter les headers de pagination à la réponse
 * À appeler après avoir le nombre total d'éléments
 */
const sendPaginatedResponse = (res, data, totalCount, pagination) => {
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
exports.sendPaginatedResponse = sendPaginatedResponse;
exports.default = paginationMiddleware;
//# sourceMappingURL=paginationMiddleware.js.map
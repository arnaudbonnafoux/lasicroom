import { Request, Response, NextFunction } from "express";
declare const cookieMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare const csrfProtection: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare const csrfProtectionSelective: (req: Request, res: Response, next: NextFunction) => void;
declare const attachCsrfToken: (req: Request, res: Response, next: NextFunction) => void;
export { cookieMiddleware, csrfProtection, csrfProtectionSelective, attachCsrfToken, };

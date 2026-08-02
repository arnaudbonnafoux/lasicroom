"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importe la classe Pool du module 'pg' pour gérer les connexions PostgreSQL
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Charge les variables d'environnement depuis le fichier .env
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// Exporte le pool pour permettre son utilisation dans les autres fichiers de l'application
exports.default = pool;
//# sourceMappingURL=db.js.map
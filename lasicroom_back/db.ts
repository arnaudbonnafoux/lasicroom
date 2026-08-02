// Importe la classe Pool du module 'pg' pour gérer les connexions PostgreSQL
import { Pool } from "pg";
import dotenv from "dotenv";

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Exporte le pool pour permettre son utilisation dans les autres fichiers de l'application
export default pool;

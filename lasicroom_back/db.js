// Importe la classe Pool du module 'pg' pour gérer les connexions PostgreSQL
const { Pool } = require('pg');

// Charge les variables d'environnement depuis le fichier .env
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Exporte le pool pour permettre son utilisation dans les autres fichiers de l'application
module.exports = pool;

const dotenv = require("dotenv");
const path = require("path");

// Détermine quel fichier d'environnement charger en fonction de NODE_ENV
const envFile =
  process.env.NODE_ENV === "production" ? ".env.back-prod" : ".env.back-dev";

// Charge les variables d'environnement à partir du fichier spécifié
dotenv.config({ path: path.join(__dirname, "../..", envFile) });

module.exports = {
  APP_PORT: process.env.APP_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TIMING: process.env.JWT_TIMING,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
};

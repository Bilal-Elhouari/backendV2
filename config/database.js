const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Désactive les logs SQL
  }
);

// Vérifier la connexion
sequelize.authenticate()
  .then(() => console.log('🟢 Connexion à PostgreSQL réussie !'))
  .catch((err) => console.error('🔴 Erreur de connexion à PostgreSQL :', err));

module.exports = sequelize;

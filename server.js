const express = require('express');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');
const Stock = require('./models/Stock');
const Order = require('./models/Order');
const Finance = require('./models/Finance');
const sequelize = require('./config/database'); // Charger la DB avant de démarrer le serveur

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Serveur Express en marche !');
});

// Synchronisation de la base de données
sequelize.sync({ force: false }) // Modifie en { force: true } si tu veux supprimer et recréer les tables (attention aux données)
  .then(() => {
    console.log('🟢 Base de données synchronisée');

    // Démarrer le serveur après la connexion à la DB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('🔴 Erreur de synchronisation de la base de données :', err);
  });
  
// Routes pour les utilisateurs
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Routes pour les produits
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// Routes pour les commandes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);




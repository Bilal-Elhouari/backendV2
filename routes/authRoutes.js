const express = require('express');
const router = express.Router();
const { generateToken, comparePassword } = require('../utils/auth');
const authMiddleware = require('../middlewares/authMiddleware'); // Import du middleware
const User = require('../models/User');

// Route GET pour récupérer tous les utilisateurs (sans authentification)
router.get('/', async (req, res) => { // Le middleware d'authentification est enlevé ici
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route POST pour la connexion utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Mettre à jour un utilisateur par ID (avec authentification pour la modification)
router.put('/:id', async (req, res) => { // Le middleware d'authentification est enlevé ici aussi
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des champs (seulement si fournis)
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    res.json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

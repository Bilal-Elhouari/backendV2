const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// Créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password, role } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des champs (seulement si fournis)
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();

    res.json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
 // Supprimer tous les produits associés à cet utilisateur
 await Product.destroy({
  where: { userId: userId }
});

// Supprimer l'utilisateur
await user.destroy();

res.json({ message: "Utilisateur et ses produits supprimés avec succès" });
} catch (error) {
res.status(500).json({ error: error.message });
}
});




module.exports = router;

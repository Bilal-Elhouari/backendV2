const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const Product = require('../models/Product');
const User = require('../models/User'); // Assurez-vous d'importer User


// ✅ Créer un produit lié à l'utilisateur connecté
router.post('/', authenticate, async (req, res) => {
  try {
    const { nameProduct, price, stockQuantity } = req.body;
    const userId = req.user.id; // L'ID de l'utilisateur connecté
    const userName = req.user.firstName; // Nom de l'utilisateur
    const userLastName = req.user.lastName; // Prénom de l'utilisateur

    const product = await Product.create({
      nameProduct,
      price,
      stockQuantity,
      userId,
      userName,
      userLastName
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ Récupérer tous les produits de l'utilisateur connecté
router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') {
      // Si c'est un admin, il récupère tous les produits
      const products = await Product.findAll();
      return res.json(products);
    } else {
      // Sinon, il ne voit que ses propres produits
      const products = await Product.findAll({ where: { userId: req.user.id } });
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Modifier un produit si c'est celui de l'utilisateur connecté ou un admin
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { nameProduct, price, stockQuantity } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

  
    if (req.user.role.toLowerCase() !== 'admin' && Number(product.userId) !== Number(req.user.id)) {
      return res.status(403).json({ message: 'Accès refusé : vous ne pouvez modifier que vos produits' });
    }

    await product.update({ nameProduct, price, stockQuantity });

    res.json({ message: 'Produit mis à jour avec succès', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Supprimer un produit si c'est celui de l'utilisateur connecté
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (req.user.role !== 'ADMIN' && product.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé : vous ne pouvez supprimer que vos produits' });
    }

    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

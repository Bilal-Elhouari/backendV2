const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User'); // Import du modèle User pour les relations

// ✅ Créer une commande (sans authentification)
router.post('/', async (req, res) => {
  try {
    const { userId, productId, totalPrice } = req.body;

    if (!userId || !productId || !totalPrice) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const order = await Order.create({ userId, productId, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande.', details: error.message });
  }
});


// ✅ Récupérer toutes les commandes avec les infos utilisateur
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: User });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes.', details: error.message });
  }
});

// ✅ Récupérer une commande par ID avec les infos utilisateur
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: User });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande.', details: error.message });
  }
});

// ✅ Modifier une commande (sans `status`)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, totalPrice } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée.' });
    }

    await order.update({ userId, totalPrice });

    res.json({ message: 'Commande mise à jour avec succès.', order });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande.', details: error.message });
  }
});

// ✅ Supprimer une commande
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée.' });
    }

    await order.destroy();
    res.json({ message: 'Commande supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la commande.', details: error.message });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role // ✅ Ajout du rôle
    };

    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

module.exports = { authenticate };

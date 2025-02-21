const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });
};

// Hacher un mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Vérifier le mot de passe
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); // Compare le mot de passe avec le hash stocké
};

module.exports = { generateToken, hashPassword, comparePassword };

//JWT_SECRET: secret
console.log('JWT_SECRET:', process.env.JWT_SECRET);

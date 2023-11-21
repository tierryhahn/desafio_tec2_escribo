const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
  
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
  };

module.exports = { authMiddleware };

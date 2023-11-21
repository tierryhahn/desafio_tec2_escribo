const express = require('express');
const { getUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('', authMiddleware,getUser);

module.exports = router;

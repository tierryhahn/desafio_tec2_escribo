const express = require('express');
const { signUp, signIn } = require('../controllers/authController');

const router = express.Router();

router.post('', signUp);
router.post('', signIn);

module.exports = router;
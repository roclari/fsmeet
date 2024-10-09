const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/register', authMiddleware, register);
router.post('/login', authMiddleware, login);

module.exports = router;

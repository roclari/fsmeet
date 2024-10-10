const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

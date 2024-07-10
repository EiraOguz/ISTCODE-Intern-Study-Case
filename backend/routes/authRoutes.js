const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/middleware', authMiddleware.token);

module.exports = router;

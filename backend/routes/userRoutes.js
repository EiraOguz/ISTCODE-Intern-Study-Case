const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../config/multer');
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.put('/users/:id/profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

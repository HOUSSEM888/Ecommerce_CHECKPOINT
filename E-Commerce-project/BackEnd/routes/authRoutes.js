const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authDto = require('../dtos/authDto');
const authMiddleware = require('../middlewares/authMiddleware')
const dtoMiddleware = require('../middlewares/dtoMiddleware');

// Route pour la connexion
router.post('/login', authDto.loginDto, dtoMiddleware, authController.login);
router.post('/forgetPassword', authDto.forgetPasswordDto, dtoMiddleware, authController.Forgetpassword);
router.post('/resetPassword', authDto.resetpasswordDto, dtoMiddleware,authMiddleware.resetPasswordMiddleware,authController.resetPassword)

module.exports = router;

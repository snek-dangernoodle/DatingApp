const express = require('express');
const userController = require('../controllers/userController');
const encryptionController = require('../controllers/encryptionController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post(
  '/register',
  encryptionController.passEncrypt,
  userController.registerUser,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json({ message: 'Registration successful' });
  }
);

router.post(
  '/login',
  userController.loginUser,
  encryptionController.decryptPass,
  sessionController.isLoggedIn,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json({ message: 'Login successful' });
  }
);

module.exports = router;

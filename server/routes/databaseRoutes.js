const express = require('express');
const userController = require('../controllers/userController');
const encryptionController = require('../controllers/encryptionController');
const router = express.Router();

router.post(
  '/register',
  encryptionController.passEncrypt,
  userController.registerUser, (req, res) => {
  res.status(201).json({ message: 'Registration successful' })}
);

router.post(
  '/login',
  encryptionController.passEncrypt,
  userController.loginUser,
  (req, res) => {
    res.status(201).json({ message: 'Login successful' })}
);

module.exports = router;

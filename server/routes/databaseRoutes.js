const express = require('express');
const userController = require('../controllers/userController');
const encryptionController = require('../controllers/encryptionController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post(
  '/signup',
  encryptionController.passEncrypt,
  userController.registerUser,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json({ message: 'Registration successful' });
  }
);

router.post('/update',
  sessionController.isLoggedIn,
  userController.updateInterests,
  (req, res) => {
    res.status(202).json({message: "Interest Update Successful"})
  }
)

router.post(
  '/login',
  userController.loginUser,
  encryptionController.decryptPass,
  sessionController.isLoggedIn,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json({ message: `res.cookie ${res.cookie}` });
  }
);

router.get(
  '/search',
  sessionController.isLoggedIn,
  userController.searchUsers,
  (req, res) => {
    res.status(200).json({ message: 'Search Successful!' });
  }
);
module.exports = router;

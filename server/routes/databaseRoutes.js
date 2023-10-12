const express = require('express');
const userController = require('../controllers/userController');
const encryptionController = require('../controllers/encryptionController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/interests', userController.getInterests, (req, res) => {
  res.status(200).json(res.locals.interests);
});

router.post(
  '/signup',
  encryptionController.passEncrypt,
  userController.registerUser,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json({ message: 'Registration successful' });
  }
);

router.post(
  '/update',
  sessionController.isLoggedIn,
  userController.updateInterests,
  userController.searchUsers,
  (req, res) => {
    res.status(200).json(res.locals.matches);
  }
);

router.post(
  '/login',
  userController.loginUser,
  encryptionController.decryptPass,
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

router.get(
  '/logout',
  sessionController.isLoggedIn,
  sessionController.endSession,
  (req, res) => {
    res.status(200).json({ message: 'User Logged Out!' });
  }
);

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const encryptionController = require('../controllers/encryptionController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/',userController.getUsers, (req, res) => {
  res.status(200).json({message: 'Recieved users'})
})

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
  userController.searchUsers,
  (req, res) => {
    res.status(200).send(res.locals.matches)
  }
)

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
module.exports = router;

const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json({ message: 'User Verified' });
});

module.exports = router;
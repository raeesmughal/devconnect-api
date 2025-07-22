const express = require('express');
const router = express.Router();

const {signup,login,getProfile} = require('../controllers/authController.js');
const verificationMiddleware = require('../middleware/authMiddleware.js');

router.use(express.json());

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',verificationMiddleware,getProfile);



module.exports = router;
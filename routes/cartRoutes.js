const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to add an item to the cart with authentication
router.post('/add', authMiddleware, addToCart);

module.exports = router;

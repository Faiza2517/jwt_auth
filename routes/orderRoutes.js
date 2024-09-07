// routes/productRoutes.js
const express = require('express');
const { fetchOrders, createOrder, updateOrder, deleteOrder} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/orders', authMiddleware, fetchOrders);
router.post('/orders', authMiddleware, createOrder);
router.put('/orders/:id', authMiddleware, updateOrder);
router.delete('/orders/:id', authMiddleware, deleteOrder);

module.exports = router;
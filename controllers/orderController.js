const { Order } = require('../models').models;

exports.fetchOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, status } = req.body;
        const newOrder = await Order.create({ userId, totalAmount, status });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalAmount, status } = req.body;
        const [updated] = await Order.update({ totalAmount, status }, {
            where: { id }
        });
        if (updated) {
            const updatedOrder = await Order.findByPk(id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to update order', details: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to delete order', details: error.message });
    }
};

const { Cart, CartItem, Product } = require('../models').models;

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find or create a cart for the user
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Find the product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find or create a cart item for the product
        let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
        if (cartItem) {
            // If the item already exists, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Otherwise, create a new cart item
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
            });
        }

        // Respond with the updated cart item
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

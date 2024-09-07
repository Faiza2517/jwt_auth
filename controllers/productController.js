const { Product } = require('../models').models;

exports.fetchProducts = async (req, res) => {
    try {
        const products = await Product.findAll(); // Fetch all products from the database
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const newProduct = await Product.create({ name, price, description, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.update({ name, price, description, stock });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

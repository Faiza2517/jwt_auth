const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Set up Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

// Import all models
const User = require('./User')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const Cart = require('./Cart')(sequelize, DataTypes);
const CartItem = require('./CartItem')(sequelize, DataTypes);
// Export the sequelize instance and models separately
module.exports = {
    sequelize,
    models: {
        User,
        Product,
        Order,
        Cart,
        CartItem,
    },
};

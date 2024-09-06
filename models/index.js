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

// Import all models (e.g., User)
const User = require('./User')(sequelize, DataTypes);

// Export the sequelize instance and models separately
module.exports = {
    sequelize,
    models: {
        User,
    },
};

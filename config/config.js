require('dotenv').config(); // Load .env file

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || 'auth_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },

};


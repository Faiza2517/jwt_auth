module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Order;
};

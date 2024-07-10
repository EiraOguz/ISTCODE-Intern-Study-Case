const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meetgate', 'root', '!MYsqlServer!', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
});

module.exports = sequelize;

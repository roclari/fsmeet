const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize("postgresql://postgres:EjZRDftFGlDGoWQUYpgzuMmsBZgmGyrO@autorack.proxy.rlwy.net:33147/railway", {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;

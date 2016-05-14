'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('ollehotel', 'ollehotel@ollehotel', 'F587Ikj8Th65L', {
    host: 'ollehotel.database.windows.net',
    dialect: 'mssql',
    pool: {
        maxConnections: 100,
        minConnections: 0,
        maxIdleTime: 10000
    },
    dialectOptions: {
      encrypt: true
    },
    omitNull: true
});
module.exports = sequelize;
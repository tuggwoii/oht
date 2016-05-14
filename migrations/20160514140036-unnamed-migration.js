'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
        'hotels',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sid: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            rank: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DECIMAL
            },
            map: {
                type: Sequelize.STRING(4000)
            }
        }).then(function () {
            console.log('success');
        }).catch(function (err) {
            console.log(err);
        });
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.createTable(
         'hotels');
  }
};

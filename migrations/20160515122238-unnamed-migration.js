'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
             'hotels','area',
        {
            type: Sequelize.STRING
        }).then(function () {
               console.log('success');
        }).catch(function (err) {
               console.log(err);
        });
  },
  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'John',
      author: 'Doe',
      genre: 'history',
      year: 2009
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};

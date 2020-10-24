'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Characters', [{
      name: 'Gandalf',
      character_code: 1,
      power: 100,
      value: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Legolas',
      character_code: 2,
      power: 60,
      value: 68,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Frodo',
      character_code: 3,
      power: 10,
      value: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Characters', null, {})
  }
};

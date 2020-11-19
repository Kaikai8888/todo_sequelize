'use strict';
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
const createTodos = Promise.all(Array.from({ length: 10 },))


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const UserId = await queryInterface.bulkInsert('Users', [{
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})

      const todos = Array.from({ length: 10 }, (_, i) => {
        return {
          UserId,
          name: 'todo-' + i,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      await queryInterface.bulkInsert('Todos', todos)
      console.log('Complete Seed Data Creation')
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Todos', null, {})
      await queryInterface.bulkDelete('Users', null, {})
      console.log('Delete all data in database')
    } catch (error) {
      console.log(error)
    }
  }
};

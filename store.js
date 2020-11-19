async (queryInterface, Sequelize) => {
  try {
    const { userId } = await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10))
    }], {})
    const todos = Array.from({ length: 10 }, (_, i) => { name: 'todo-' + i, UserId })
    console.log('@@1', todos)
    await queryInterface.bulkInsert('Todo', todos)
    console.log('Complete Seed Data Creation')
  } catch (error) {
    console.log(error)
  }
}
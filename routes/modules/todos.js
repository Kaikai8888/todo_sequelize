const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    const todo = await Todo.findOne({ where: { id, UserId } })
    res.render('detail', { todo: todo.toJSON() })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
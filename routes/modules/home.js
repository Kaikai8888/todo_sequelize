const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', async (req, res) => {
  const todos = await Todo.findAll({ raw: true, nest: true })
  res.render('index', { todos })
})


module.exports = router
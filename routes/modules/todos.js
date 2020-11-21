const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => res.render('new'))
router.post('/', async (req, res) => {
  try {
    const UserId = req.user.id
    await Todo.create({ ...req.body, UserId })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

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

router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    const todo = await Todo.findOne({ where: { id, UserId } })
    if (!todo) return res.redirect('/') //need flash message
    res.render('edit', { todo: todo.toJSON() })
  } catch (error) {
    console.log(error)
  }
})
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    const todo = await Todo.findOne({ where: { id, UserId } })
    if (!todo) return res.redirect('/') //need flash message
    Todo.update({ ...req.body }, { where: { id, UserId } })
    return res.redirect(`/todos/${id}`)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    const todo = await Todo.findOne({ where: { id, UserId } })
    if (!todo) return res.redirect('/') //need flash message
    Todo.destroy({ where: { id, UserId } })
    return res.redirect(`/`)
  } catch (error) {
    console.log(error)
  }
})



module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => res.render('new'))
router.post('/', async (req, res) => {
  try {
    const UserId = req.user.id
    await Todo.create({ ...req.body, UserId })
    req.flash('successMessage', 'Successfully create the todo')
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
    if (!todo) {
      req.flash('errorMessage', 'Records not found.')
      return res.redirect('/')
    }
    req.flash('successMessage', 'Successfully edit the todo')
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
    if (!todo) {
      req.flash('errorMessage', 'Records not found.')
      return res.redirect('/')
    }
    if (req.body.isDone === 'on') {
      req.body.isDone = true
    }
    await Todo.update({ ...req.body }, { where: { id, UserId } })
    return res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const UserId = req.user.id
    const todo = await Todo.findOne({ where: { id, UserId } })
    if (!todo) {
      req.flash('errorMessage', 'Records not found.')
      return res.redirect('/')
    }
    await Todo.destroy({ where: { id, UserId } })
    req.flash('successMessage', 'Successfully delete the todo')
    return res.redirect(`/`)
  } catch (error) {
    console.log(error)
  }
})



module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.create({ name, email, password })
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
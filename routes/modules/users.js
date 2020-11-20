const express = require('express')
const bcrypt = require('bcryptjs')
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
  try {
    const { name, email, password, confirmPassword } = req.body
    let user = await User.findOne({ where: { email } })
    if (user) return res.render('register', { ...req.body })
    user = await User.create({ name, email, password })
    res.redirect('/users/login')
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
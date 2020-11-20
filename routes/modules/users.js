const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    let user = await User.findOne({ where: { email } })
    if (user) return res.render('register', { ...req.body })
    user = await User.create({
      name, email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
    res.redirect('/users/login')
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
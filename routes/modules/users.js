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
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const error = []
    let user = await User.findOne({ where: { email } })

    if (!name || !email || !password || !confirmPassword) {
      error.push({ message: 'All fields are required.' })
    }
    if (user) {
      error.push({ message: 'The email is already registered.' })
    }
    if (password !== confirmPassword) {
      error.push({ message: 'Password and confirm password does not match.' })
    }
    if (password.length < 8 || password.length > 12) {
      error.push({ message: 'Password should be between 8 to 12 characters.' })
    }

    if (error.length) return res.render('register', { ...req.body, error })

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
  req.flash('successMessage', 'Successfully logout')
  res.redirect('/users/login')
})

module.exports = router
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models').User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      let user = await User.findOne({ where: { email } })
      user = user.toJSON()
      if (!user) return done(null, false, { message: 'That email is not registered!' })
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: 'Email or Password incorrect.' })
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)
      if (!user) return done(null, false)
      done(null, user.toJSON())
    } catch (error) {
      done(error, false)
    }
  })
}
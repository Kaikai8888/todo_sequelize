const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models').User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      let user = await User.findOne({ where: { email } })
      if (!user) return done(null, false, { message: 'That email is not registered!' })
      user = user.toJSON()
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: 'Email or Password incorrect.' })
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { email, name } = profile._json
      let user = await User.findOne({ where: { email, name } })
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      user = await User.create({
        name, email,
        password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10))
      })
      done(null, user)
    } catch (error) {
      done(error, false)
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
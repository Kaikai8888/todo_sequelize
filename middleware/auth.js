module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('errorMessage', 'Please login')
    res.redirect('/users/login')
  }
}
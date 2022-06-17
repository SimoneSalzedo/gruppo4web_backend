//functions for Login, Session and Authentication
const User = require('../models/user')
const passport = require('passport')
const Role = require('../models/role')

exports.checkAuth = function(req) {
    console.log('Your authenticaton is ', req.isAuthenticated())}

exports.authLogout = function (req, res) { req.session.destroy(function (err) {
    console.log('##You are logged out now')
    res.redirect('/')})}
//functions for Login, Session and Authentication
const User = require('../models/user')
const passport = require('passport')
const Role = require('../models/role')

exports.checkAuthDebug = function(req) {
    console.log('Your authenticaton is ', req.isAuthenticated())}

exports.authLogout = function (req, res) { req.session.destroy(function (err) {
    console.log('##You are logged out now')
    res.redirect('/')})}

exports.getAuthenticatedUsername = function (req, res) {
   if(req.isAuthenticated()){
   console.log('### User is authenticated as: ',req.session.passport.user,' ###')
   return req.session.passport.user}
   else{console.log('### User is not authenticated')}
}

exports.checkAuth =  function (req, res, authToCheck){
    if(req.isAuthenticated()){
        console.log('Your authenticaton is ', req.isAuthenticated())
        Role.findOne({username: req.session.passport.user}).then(result => {
            console.log(result.userType)
            if (result.userType===authToCheck) {
                console.log('User permission match the requirement needed to access this page')}
            else{
                console.log('User Unauthorized')
                res.render('failure.ejs')
                //TODO FARE UN HTML PER I CLIENTI NON AUTORIZZATI E REINDIRIZZARLI, come il login
            }
        })
    }else{
        res.redirect('/auth/redirectingLogin')
    }}

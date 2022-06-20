//functions for Login, Session and Authentication
const User = require('../models/user')
const passport = require('passport')
const Role = require('../models/role')
const {check} = require("express-validator");

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

exports.checkAuth = async function (req, res, authToCheck){
    //return true if user is authenticated with the matching requirement, false otherwise
    if(req.isAuthenticated()){
        console.log('Your authenticaton is ', req.isAuthenticated())
        return await Role.findOne({username: req.session.passport.user}).then(result =>{
            console.log(result.userType)
            if (result.userType === authToCheck) {
                console.log('User permission match the requirement needed to access this page')
                return true;
            } else {
                console.log('User Unauthorized')
                return false;
                //res.render('failure.ejs')
            }
        }).catch(err => console.log("An error occurred", err))
    }else{
        //return null is there is no authorization (user/admin/chef is not logged)
        return null;
        //res.redirect('/auth/redirectingLogin')
    }
}

/*
* This controller manages all the authentication needed for the Application to work,
* The exported function 'checkAuth' is used in other controllers to check the authentications of the current User
*/

const User = require('../models/user')
const Role = require('../models/role')

exports.checkAuthDebug = function(req) {
    console.log('Your authenticaton is ', req.isAuthenticated())}

exports.authLogout = function (req, res) { req.session.destroy(function () {
    console.log('##You are logged out now')
    res.redirect('/')})}

exports.getAuthenticatedUsername = function (req) {
   if(req.isAuthenticated()){
       console.log('### User is authenticated as: ',req.session.passport.user,' ###')
       return req.session.passport.user}
   else{console.log('### User is not authenticated')}
}

exports.checkAuth = async function (req, res, authToCheck){
    //return true if user is authenticated with the matching requirement, false if the user is logged but have no authorization to see the page
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
                //this will render 'failure.ejs'
            }
        }).catch(err => console.log("An error occurred", err))
    }else{
        //return null is there is no authorization (user/admin/chef is not logged)
        return null;
        //this will redirect to '/auth/redirectingLogin'
    }
}

exports.registerAdmin = function (req){
    console.log('##registering a new Admin to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
        if (err) {
            console.log('##an error occurred while registering a new Admin to the DataBase', err)
        }
        console.log('##registering...')})
    const role = new Role({
        username: req.body.email,
        userType: 'admin'
    })
    role.save().then(savedRole => console.log('##Admin Registered Successfully ', savedRole)).catch(err =>
    {
        console.log('##An error occurred: ', err)
        if(err.toString().includes('duplicate key error')){console.log('This mail Already exist')}
    })}

exports.registerUser = function (req){
    console.log('##registering a new Admin to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
        if (err) {
            console.log('##registering a new User to the DataBase', err)
        }
        console.log('##registering...')
        const role = new Role({
            username: req.body.email,
            userType: 'user'
        })
        role.save().then(savedRole => console.log('##Admin Registered Successfully ', savedRole)).catch(err =>
        {
            console.log('##An error occurred: ', err)
            if(err.toString().includes('duplicate key error')){console.log('This mail Already exist')}
        }
        )})}

exports.registerChef = function(req) {
    console.log('##registering a new Chef to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
        if (err) {
            console.log('##registering a new Chef to the DataBase', err)
        }
        console.log('##registering...')
    })
    const role = new Role({
        username: req.body.email,
        userType: 'chef'
    })
    role.save().then(savedRole => console.log('##Chef Registered Successfully ', savedRole)).catch(err =>
    {
        console.log('##An error occurred: ', err)
        if(err.toString().includes('duplicate key error')){console.log('This mail Already exist')}
    })}

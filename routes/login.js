const User = require('../models/user')
const passport = require('passport')
const loginRouter = require('express').Router()

loginRouter

    .get('/register', (req, res)=> {
        res.render('register.ejs', {})
})

    .get('/registerAdmin', (req, res)=> {
        res.render('registerAdmin.ejs', {})
})

    .post('/registerAdmin', (req, res)=> {
        console.log('registering admin')
        User.register(new User({username: req.body.email}), req.body.password, function(err) {
            if (err) {
                console.log('error while admin register!', err)
            }
            console.log('admin registered!')
            res.redirect('/')
            //TODO ADMIN POWER
        })
})

    .post('/register', (req, res)=>{
        console.log('registering user');
        User.register(new User({username: req.body.email}), req.body.password, function(err) {
            if (err) {
                console.log('error while user register!', err)
            }
            console.log('user registered!')
            res.redirect('/')
        })
})

    .get('/login', (req, res) => {
        res.render('login.ejs', {user: req.user, message: req.flash('error')})
})

    .post('/login', passport.authenticate('local', { failureRedirect: '/failure', failureFlash: true }, ), function(req, res) {
        console.log("Connection established!")
        console.log('You just authenticated', req.isAuthenticated())
})

    .get('/logout', function(req, res) {
        req.logout()
        res.redirect('/')
});

module.exports = loginRouter
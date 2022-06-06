const User = require('../models/user')
const passport = require('passport')
const loginRouter = require('express').Router()
const Role = require('../models/roles')

loginRouter.use(passport.session())

    .get('/register', (req, res)=> {
        res.render('register.ejs', {})
        console.log('Your authenticaton is ', req.isAuthenticated())
})

    .get('/registerAdmin', (req, res)=> {
        res.render('registerAdmin.ejs', {})
        console.log('Your authenticaton is ', req.isAuthenticated())
})

    .post('/registerAdmin', (req, res)=> {
        console.log('registering admin')
        User.register(new User({username: req.body.email}), req.body.password, function(err) {
            if (err) {
                console.log('error while admin register!', err)
            }
            console.log('admin registered!')
            const role = new Role({
                username: req.body.email,
                userType: 'admin'
            })
            role.save().then(savedRole => console.log('Role Saved')).catch(err =>console.log('And error occurred: ', err))
            res.redirect('/')
        })
})

    .post('/register', (req, res)=>{
        console.log('registering user');
        User.register(new User({username: req.body.email}), req.body.password, function(err) {
            if (err) {
                console.log('error while user register!', err)
            }
            console.log('user registered!')
            const role = new Role({
                username: req.body.email,
                userType: 'user'
            })
            role.save().then(savedRole => console.log('Role Saved')).catch(err =>console.log('And error occurred: ', err))
            res.redirect('/')
        })
})

    .get('/login', (req, res) => {
        console.log('Your authenticaton is ', req.isAuthenticated())
        res.render('login.ejs', {user: req.user, message: req.flash('error')})
})

    .post('/login', passport.authenticate('local', { failureRedirect: '/failure', failureFlash: true }, ), function(req, res) {
        console.log("Connection established!")
        console.log('You just authenticated', req.isAuthenticated())
        res.redirect('register')
})

    .get('/logout', function(req, res) {
        req.session.destroy(function (err) {
        res.redirect('/')})
        console.log("You just disconnected!")
        console.log('you are not authenticated', req.isAuthenticated())
        res.redirect('/')
})
    .get('/registerChef', (req, res)=> {
        res.render('registerChef.ejs', {})
        console.log('Your authenticaton is ', req.isAuthenticated())
    })
    .post('/registerChef', function(req, res) {
        console.log('registering chef')
        User.register(new User({username: req.body.email}), req.body.password, function(err) {
            if (err) {
                console.log('error while chef register!', err)
            }
            console.log('chef registered!')
        })
        const role = new Role({
            username: req.body.email,
            userType: 'chef'
        })
        role.save().then(savedRole => console.log('Role Saved')).catch(err =>console.log('And error occurred: ', err))
        res.redirect('/')
    });

module.exports = loginRouter
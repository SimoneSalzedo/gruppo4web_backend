const User = require('../models/user')
const passport = require('passport')
const loginRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users");
const {checkAuth, authLogout} = require("../controllers/login");
loginRouter.use(passport.session())

    .get('/register', (req, res)=> {
        checkAuth(req)
        res.render('register.ejs', {})})

    .get('/registerAdmin', (req, res)=> {
        checkAuth(req)
        res.render('registerAdmin.ejs', {})})

    .post('/registerAdmin', (req, res)=> {
        registerAdmin(req, res)
        res.redirect('/')})

    .post('/register', (req, res)=>{
        registerUser(req, res)
        res.redirect('/')})

    .get('/login', (req, res) => {
        checkAuth(req)
        res.render('login.ejs', {user: req.user, message: req.flash('error')})})

    .post('/login', passport.authenticate('local', { failureRedirect: '/failure', failureFlash: true }, ), function(req, res) {
        console.log("Connection established!")
        checkAuth(req)
        res.redirect('register')})

    .get('/logout', function(req, res) {
        authLogout(req, res)})

    .get('/registerChef', (req, res)=> {
        res.render('registerChef.ejs', {})
        console.log('Your authenticaton is ', req.isAuthenticated())})

    .post('/registerChef', function(req, res) {
        registerChef(req, res)
        res.redirect('/')});

module.exports = loginRouter
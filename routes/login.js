const User = require('../models/user')
const passport = require('passport')
const loginRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users");
const {checkAuthDebug, authLogout, checkAuth} = require("../controllers/login");
const async = require("async");

loginRouter.use(passport.session())

    .get('/register', (req, res)=> {
        res.render('register.ejs', {})})

    .get('/registerAdmin', (req, res)=> {
        res.render('registerAdmin.ejs', {})})

    .post('/registerAdmin', (req, res)=> {
        registerAdmin(req, res)
        res.redirect('/')})

    .post('/register', (req, res)=>{
        registerUser(req, res)
        res.redirect('/')})

    .get('/login', (req, res) => {
        checkAuthDebug(req)
        res.render('login.ejs', {user: req.user, message: req.flash('error')})})

    .post('/login', passport.authenticate('local', { failureRedirect: '/failure', failureFlash: true }, ), function(req, res) {
        //TODO FAILURE PAGE
            console.log("Connection established!")
        checkAuthDebug(req)
        res.redirect('/')})

    .get('/logout', (req, res)=>{
        authLogout(req, res)})

    .get('/registerChef', (req, res)=>{
        res.render('registerChef.ejs')
        console.log('Your authenticaton is ', req.isAuthenticated())})

    .post('/registerChef', (req, res)=>{
        registerChef(req, res)
        res.redirect('/')})

    .get('/redirectingLogin', (req,res)=>{
         res.render('redirectingLogin.ejs')
    })

module.exports = loginRouter
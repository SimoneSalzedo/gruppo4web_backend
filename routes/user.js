const User = require('../models/user')
const passport = require('passport')
const userRouter = require('express').Router()
const Role = require('../models/roles')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuth, authLogout} = require("../controllers/login")
const menuItem = require("../models/menuItem");

userRouter.use(passport.session())

    .get('/order', (req, res)=>{
        menuItem.find({}).then(items =>{
            res.render('order.ejs', {items: items})})
    })

module.exports = userRouter

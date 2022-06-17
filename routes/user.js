const User = require('../models/user')
const passport = require('passport')
const userRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuth, authLogout} = require("../controllers/login")
const menuItem = require("../models/menuItem");
const Order = require('../models/order')

userRouter.use(passport.session())

    .get('/order', (req, res)=>{
        //support to sessions...
        menuItem.find({}).then(items =>{
            res.render('order.ejs', {items: items})})
    })

    .post('/orderstatus', (req, res)=>{
        console.log('Saving Order to the DATABASE...')
        //creating the string array for the database
        const itemNameArr = (req.body.itemNameInput)
        //TODO Creating a logging username referral
        const order = new Order({
            username: 'TODO USERNAME',
            timestamp: Date.now(),
            itemNameArray: itemNameArr,
            total: req.body.total,
            status: 'pending'
        })
        order.save().then(savedOrder => console.log('##Order Registered Successfully')).catch(err =>console.log('##An error occurred: ', err))
    })

module.exports = userRouter

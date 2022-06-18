const User = require('../models/user')
const passport = require('passport')
const userRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuthDebug, authLogout, checkAuth} = require("../controllers/login")
const menuItem = require("../models/menuItem");
const Order = require('../models/order')
const {db} = require('../public/js/app');
const async = require("async");

userRouter.use(passport.session())

    .get('/order', (req, res)=>{
        checkAuth(req, res, "user")
        menuItem.find({}).then(items =>{
            res.render('order.ejs', {items: items})})
    })

    .post('/orderstatus', (req, res)=>{
        console.log('Saving Order to the DATABASE...')
        //creating the string array for the database
        const itemNameArr = (req.body.itemNameInput)
        const order = new Order({
            username: req.session.passport.user,
            itemNameArray: itemNameArr,
            total: req.body.total,
            status: 'pending'
        })
        order.save().then(savedOrder => {console.log('##Order Registered Successfully')
            res.render('orderStatus.ejs', {savedOrder: savedOrder})
        }).catch(err =>console.log('##An error occurred: ', err))

    })

    .get('/orderstatus', (req, res)=>{
        //EVENT SOURCE HANDLING FOR CHEF AUTO-UPDATING ORDER LIST
        const changeStream = Order.collection.watch();
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        })
        changeStream.on('change', (next) => {
            res.write(`data: ping\n\n\ `)
            console.log("Refreshing the page for new content..")
        })
    })
    .get('/orderstatus/:id', (req, res)=>{
        Order.findOne({_id: req.params.id}).then(savedOrder => {
            //data must contain the new status that just changed in case of multiple reloading (go check orderstatus.ejs eventsource)
            console.log("Updating the page..")
            console.log(JSON.stringify(savedOrder))
            res.render('orderStatus.ejs', {savedOrder: savedOrder})})
            .catch(err => console.log('An error occurred:', err))
    })

module.exports = userRouter

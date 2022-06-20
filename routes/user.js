
const passport = require('passport')
const userRouter = require('express').Router()
const {checkAuth} = require("../controllers/login")
const menuItem = require("../models/menuItem");
const Order = require('../models/order')

userRouter.use(passport.session())

    .get('/order', (req, res)=>{
        checkAuth(req,res,'user').then(result => {console.log(result);if(result){
        menuItem.find({}).then(items =>{
            res.render('order.ejs', {items: items})})
    }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

    .post('/orderstatus', (req, res)=>{
        checkAuth(req,res,'user').then(result => {console.log(result);if(result){
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
        }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

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

const User = require('../models/user')
const passport = require('passport')
const chefRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuthDebug, authLogout} = require("../controllers/login")
const menuItem = require("../models/menuItem");
const Order = require('../models/order')
const {startTransaction, commitTransaction, abortTransaction, startSession} = require('mongoose')
const Receipt = require('../models/receipt')
const {checkAuth} = require('../controllers/login')

chefRouter.use(passport.session())

    .get('/chefpanel', (req, res) =>{
        checkAuth(req,res,'chef').then(result => {console.log(result);if(result){
        Order.find({}).then(items =>{
            res.render('chefpanel.ejs', {items: items})
    })}else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

    .post('/chefpanel',(req, res) => {
        checkAuth(req,res,'chef').then(result => {console.log(result);if(result){
        if (req.body.changestatus) {
            //cambia lo stato in mongodb e fanne avvertire dell'accaduto l'utente nella pagina orderStatus
            Order.updateOne({_id: req.body._id}, {$set: {'status': req.body.status}}).catch(err => console.log('An error occurred: ', err))
            //res.redirect('/chef/chefpanel')
        } else {
            //THIS OPERATION MUST BE ATOMIC
            Order.findOneAndDelete({_id: req.body._id})
                .then(deletedOrder => {
                    const receipt = new Receipt({
                        username: deletedOrder.username,
                        itemNameArray: deletedOrder.itemNameArray,
                        total: deletedOrder.total
                    })
                    receipt.save().then(savedOrder => {
                        console.log('##Order Registered Successfully')
                    })
                })
                .catch(err => console.log('An error occurred: ', err))}
        }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

    .get('/chefstream/:id', async (req, res) => {
        //handling eventSource
        console.log('IM HERE')
        const changeStream = await Order.collection.watch()
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        })
        changeStream.on('change', (next) => {
            console.log('im here', req.params.id)
            Order.findOne({_id: req.params.id}).then(result => {
                //data must contain the new status that just changed
                res.write(`data: ${result.status}\n\n\ `)
            }).catch(err => console.log('An error occurred:', err))
            console.log("Updating the page..")
        })
    })

module.exports = chefRouter
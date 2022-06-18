const User = require('../models/user')
const passport = require('passport')
const chefRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuthDebug, authLogout} = require("../controllers/login")
const menuItem = require("../models/menuItem");
const Order = require('../models/order')

chefRouter.use(passport.session())

    .get('/chefpanel', (req, res) =>{
        Order.find({}).then(items =>{
            res.render('chefpanel.ejs', {items: items})
    })})

    .post('/chefpanel', (req, res)=>{
        //cambia lo stato in mongodb e fanne avvertire dell'accaduto l'utente nella pagina orderStatus
        Order.updateOne({_id: req.body._id}, {$set: {'status': req.body.status}}).catch(err =>console.log('An error occurred: ', err))
        //res.redirect('/chef/chefpanel')
    })

    .get('/chefstream/:id', (req, res) => {
        //gestisci l'eventSource
        console.log('IM HERE')
        const changeStream = Order.collection.watch();
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',

            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        })
        changeStream.on('change', (next) => {
            console.log('im here',req.params.id)
            Order.findOne({_id: req.params.id}).then(result => {
            //data must contain the new status that just changed
            res.write(`data: ${result.status}\n\n\ `)}).catch(err => console.log('An error occurred:', err))
            console.log("Updating the page..")
        })
    })
module.exports = chefRouter

const passport = require('passport')
const userRouter = require('express').Router()
const {getOrder, getOrderStatus, postOrderStatus, getOrderStatusID} = require("../controllers/user");

//router to handle all user privileged functionalities

userRouter.use(passport.session())

    .get('/order', (req, res)=>{
        getOrder(req, res)
    })

    .post('/orderstatus', (req, res)=>{
        postOrderStatus(req, res)
    })

    .get('/orderstatus', (req, res)=>{
        getOrderStatus(req, res)
    })

    .get('/orderstatus/:id', (req, res)=>{
        getOrderStatusID(req, res)
    })

module.exports = userRouter

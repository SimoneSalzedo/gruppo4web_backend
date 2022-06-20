const adminRouter = require('express').Router()
const menuItem = require('../models/menuItem')
const Role = require("../models/role")
const passport = require("passport");
const {checkAuth} = require('../controllers/login')
const Receipt = require('../models/receipt')

//router to handling all admin priviledged functionalities

adminRouter.use(passport.session())

    .get('/', (req, res) => {
        res.redirect('admin/controlpanel')
    })

    .get('/controlpanel', (req, res) => {
        checkAuth(req,res,'admin').then(result => {console.log(result);if(result){
        Receipt.find({}).then( receipts =>{
        menuItem.find({}).then(items =>{
            res.render('controlpanel.ejs', {items: items, receipts: receipts})
        })})}
        else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

    .post('/controlpanel', (req, res) => {
        checkAuth(req,res,'admin').then(result => {console.log(result);if(result){
        if(req.body.createupdate){
        menuItem.find({itemName: req.body.itemName}).then(async result => {
            if (JSON.stringify(result).substring(47, 47 + req.body.itemName.length) !== req.body.itemName) {
                const item = new menuItem({
                    itemName: req.body.itemName,
                    price: req.body.price,
                    description: req.body.description
                })
                item.save().then(savedItem => {
                    console.log('Item Saved')
                    res.redirect('/admin/controlpanel')
                })
                    .catch(err => console.log('And error occurred: ', err))
            } else {
                await menuItem.updateOne({itemName: req.body.itemName}, {$set: {'price': req.body.price}})
                res.redirect('/admin/controlpanel')
            }
        }).catch(err =>console.log('And error occurred: ', err))}
        else{
            menuItem.deleteOne({itemName: req.body.itemName}).then(async result => {
                console.log(req.body.itemName , ' DELETED SUCCESSFULLY, with result: ', result)
                res.redirect('/admin/controlpanel')})
        }
    }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})})

module.exports = adminRouter
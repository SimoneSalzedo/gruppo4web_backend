const adminRouter = require('express').Router()
const menuItem = require('../models/menuItem')
const Role = require("../models/role")
const passport = require("passport");
//router to handling all admin priviledged functionalities

adminRouter.use(passport.session())

    .get('/', (req, res) => {
        menuItem.find({}).then(items =>{
        res.render('adminControlPanel.ejs',{data: "items"} )})})

    .get('/menudata', (req, res) => {
        console.log('menudata')
        menuItem.find({}).then(promise=>{res.json(promise)})})

    .get('/controlpanel', (req, res) => {
        menuItem.find({}).then(items =>{
            res.render('controlpanel.ejs', {items: items})})})

    .post('/controlpanel', (req, res) => {
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
    })

    .post('/PATH:TO:ADD:ITEM', (req, res) =>{
        //adding item to database handling

        const item = new menuItem({
            itemName: req.body.itemName,
            price: req.body.price,
            description: req.body.description
        })
        item.save().then(savedItem => {
            console.log('Item Saved')
            res.render('adminAddItem.ejs')})
            .catch(err =>console.log('And error occurred: ', err))
})

module.exports = adminRouter
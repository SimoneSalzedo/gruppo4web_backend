/*
* This Controller handles all request from the usertype 'Admin'
*/

const menuItem = require('../models/menuItem')
const {checkAuth} = require('../controllers/login')
const Receipt = require('../models/receipt')

exports.getControlPanel = function (req, res) {
    //sending Receipts and items to the control panel page to be rendered accordingly to controlpanel.ejs and controlpanel.css file
    checkAuth(req,res,'admin').then(result => {if(result){
        Receipt.find({}).then( receipts =>{
            menuItem.find({}).then(items =>{
                res.render('controlpanel.ejs', {items: items, receipts: receipts})
            })})}
    else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})
}

exports.postControlPanel = function (req, res) {
    //Create or Update entry based on its name
    checkAuth(req,res,'admin').then(result => {if(result){
        if(req.body.createupdate){
            menuItem.findOne({itemName: req.body.itemName}).then(async result => {
                //if no such item exist, result is null
                console.log(typeof result)
                if (result === null) {
                    const item = new menuItem({
                        itemName: req.body.itemName,
                        price: req.body.price,
                        description: req.body.description
                    })
                    item.save().then(savedItem => {
                        console.log('Item Saved', savedItem)
                        res.redirect('/admin/controlpanel')
                    })
                        .catch(err => console.log('And error occurred: ', err))
                } else {
                    if(req.body.description.trimStart()===""){
                        await menuItem.updateOne({itemName: req.body.itemName}, {$set: {'price': req.body.price}})
                    }
                    else {
                        await menuItem.updateOne({itemName: req.body.itemName}, {$set: {'price': req.body.price, 'description': req.body.description}})}
                    res.redirect('/admin/controlpanel')
                }
            }).catch(err =>console.log('And error occurred: ', err))}
        else{
            //if the user doesn't submit createupdate it means that is deleting something, handle it
            menuItem.deleteOne({itemName: req.body.itemName}).then(async result => {
                console.log(req.body.itemName , ' DELETED SUCCESSFULLY, with result: ', result)
                res.redirect('/admin/controlpanel')})
        }
    }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})
}
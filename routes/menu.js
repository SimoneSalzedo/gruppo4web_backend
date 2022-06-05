const express = require('express')
let router = express.Router()
let menuItem= require('../models/menuItem')
//all routes for this js file starts with /menu/

router.route('/')
    .get((req, res)=> {
        menuItem.find({}).then(items =>{
           res.json(items)
        })
        //give back the menu page
    })

router.route('/:id')
    .get((req, res)=> {
        menuItem.find({}).then(items =>{
            res.json(items)
            //TODO Allergeni
        })
        //give back the menu page
    })


module.exports = router
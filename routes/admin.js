const bcrypt = require('bcrypt')
const adminRouter = require('express').Router()
const User = require('../models/user')
const {render} = require("ejs");

adminRouter.get('/', (req, res) => {
    res.render('registerAdmin.ejs')
})
    .post('/', async (req, res) => {
        const email = req.body.email
        if(req.body.password === undefined){console.log('Password is not defined')}
        const passwordHash = await bcrypt.hash( req.body.password, 10)
        let isAdmin = true  //ADMIN HAS ISADMIN TRUE
        const admin = new User({
            email,
            passwordHash,
            isAdmin
        })
        const savedAdmin = await admin.save()
        res.status(201).json(savedAdmin)
    })
module.exports = adminRouter

//TODO: two different routes were defined to avoid using multer for multipart messages, may change this later
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const {render} = require("ejs");

usersRouter.get('/', (req, res) => {
    res.render('register.ejs')
})
    .post('/', async (req, res) => {
        const email = req.body.email
        let isAdmin = false //USER HAVE SET ADMIN FALSE
        if(req.body.password === undefined){console.log('Password is not defined')}
        const passwordHash = await bcrypt.hash( req.body.password, 10)
        const user = new User({
            email,
            passwordHash,
            isAdmin
     })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})
module.exports = usersRouter
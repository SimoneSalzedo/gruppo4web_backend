const passport = require('passport')
const chefRouter = require('express').Router()
const {getChefPanel, postChefPanel, getChefStream} = require("../controllers/chef");

//router to handle all chef privileged functionalities

chefRouter.use(passport.session())

    .get('/chefpanel', (req, res) =>{
        getChefPanel(req, res)
    })

    .post('/chefpanel',(req, res) => {
        postChefPanel(req, res)
    })

    .get('/chefstream/:id', async (req, res) => {
        await getChefStream(req, res)
    })

module.exports = chefRouter
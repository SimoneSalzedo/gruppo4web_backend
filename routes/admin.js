const adminRouter = require('express').Router()
const passport = require("passport");
const {getControlPanel, postControlPanel} = require("../controllers/admin");

//router to handle all admin privileged functionalities

adminRouter.use(passport.session())

    .get('/', (req, res) => {
        res.redirect('admin/controlpanel')
    })

    .get('/controlpanel', (req, res) => {
        getControlPanel(req, res)
    })

    .post('/controlpanel', (req, res) => {
        postControlPanel(req, res)
    })

module.exports = adminRouter
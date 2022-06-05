const config = require('../../utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('../../utils/logger')
const mongoose = require('mongoose')
const upload = require('../../utils/storageUtil')
const menu = require('../../routes/menu')
const usersRouter = require("../../routes/user")
const bodyParser = require('body-parser')
const adminRouter = require("../../routes/admin")
//connecting to mongodb...
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI) //Bug that gives warning
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

//app uses...
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view-engine', 'ejs')
app.use("menu", menu)
app.use('/register', usersRouter)
app.use('/registerAdmin', adminRouter)
//request handling...
app.get('/',(req, res, next)=>{
    logger.info(`Hey, you, you're finally awake!`)
})

//exporting the module...
module.exports = app;
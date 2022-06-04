const config = require('../../utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('../../utils/logger')
const mongoose = require('mongoose')


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

//request handling...
app.get('/',(request, response, next)=>{
    logger.info(`Hey, you, you're finally awake!`)
})

//exporting the module...
module.exports = app;
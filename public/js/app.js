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
const passport = require("passport")
const loginRouter = require("../../routes/login")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const User = require('../../models/user')
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
app.use(cookieParser());
app.use(session({
    secret: 'youwouldnevernow',
    resave: false,
    saveUninitialized: true,
    maxAge: 3600000
}));
app.use(flash());
app.use("menu", menu)
app.use('/register', usersRouter)
app.use('/registerAdmin', adminRouter)
app.use('/auth', loginRouter)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//request handling...
app.get('/',(req, res, next)=>{
    logger.info(`Hey, you, you're finally awake!`)
})

//exporting the module...
module.exports = app;
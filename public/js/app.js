/*
* Importing all App needed functionalities
* */

const config = require('../../utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const adminRouter = require("../../routes/admin")
const passport = require("passport")
const loginRouter = require("../../routes/login")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const User = require('../../models/user')
const {checkAuthDebug} = require("../../controllers/login")
const path = require('path')
const menuItem = require("../../models/menuItem")
const chefRouter = require("../../routes/chef")
const userRouter = require("../../routes/user")

//connecting to mongodb...

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI) //Bug that gives warning
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

//app uses...

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view-engine', 'ejs')
app.use(cookieParser())
app.use(session({
    secret: 'youwouldnevernow',
    resave: false,
    saveUninitialized: true,
    maxAge: 3600000
}));
app.use(flash())
let dirname= __dirname.substring(0,__dirname.length-2)
dirname = path.join(dirname, 'css')
app.use(express.static(dirname))
app.use("/chef", chefRouter)
app.use('/admin', adminRouter)
app.use('/auth', loginRouter)
app.use('/user', userRouter)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//basic request handling...

app.get('/',(req, res)=>{
    checkAuthDebug(req)
    console.log(dirname)
    menuItem.find({}).then(items =>{
        res.render('index.ejs', {items: items, isAuth: req.isAuthenticated()})})
    console.log(`Hey, you, you're finally awake!`)
})
app.get('/failure', (req, res) => {
    res.render('failure.ejs')
})
app.get('/unauthorized', (req, res) => {
    res.render('unauthorized.ejs')
})

//exporting the module...

module.exports = app;
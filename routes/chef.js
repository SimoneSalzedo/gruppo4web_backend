const User = require('../models/user')
const passport = require('passport')
const chefRouter = require('express').Router()
const Role = require('../models/role')
const {registerAdmin, registerUser, registerChef} = require("../controllers/users")
const {checkAuth, authLogout} = require("../controllers/login")


module.exports = chefRouter

const User = require("../models/user");
const Role = require("../models/role");


exports.registerAdmin = function (req, res){
    console.log('##registering a new Admin to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
    if (err) {
        console.log('##an error occurred while registering a new Admin to the DataBase', err)
    }
    console.log('##registering...')})
    const role = new Role({
        username: req.body.email,
        userType: 'admin'
    })
    role.save().then(savedRole => console.log('##Admin Registered Successfully')).catch(err =>console.log('##An error occurred: ', err))}

exports.registerUser = function (req, res){
    console.log('##registering a new Admin to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
        if (err) {
            console.log('##registering a new User to the DataBase', err)
        }
        console.log('##registering...')
        const role = new Role({
            username: req.body.email,
            userType: 'user'
        })
        role.save().then(savedRole => console.log('##Admin Registered Successfully')).catch(err =>console.log('##An error occurred: ', err))})}

exports.registerChef = function(req, res) {
    console.log('##registering a new Chef to the DataBase')
    User.register(new User({username: req.body.email}), req.body.password, function(err) {
      if (err) {
           console.log('##registering a new Chef to the DataBase', err)
     }
           console.log('##registering...')
    })
    const role = new Role({
        username: req.body.email,
        userType: 'chef'
    })
    role.save().then(savedRole => console.log('##Chef Registered Successfully')).catch(err =>console.log('##An error occurred: ', err))}

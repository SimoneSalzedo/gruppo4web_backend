const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
    username: { type: String, unique: true },
    passwordHash: String,
    isAdmin:Boolean
})

User.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);
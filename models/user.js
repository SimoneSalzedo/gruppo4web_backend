const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    passwordHash: String,
    isAdmin:Boolean
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
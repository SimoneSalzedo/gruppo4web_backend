const mongoose = require('mongoose')

const Receipt = new mongoose.Schema({
    username:  String,
    itemNameArray: [String],
    total: Number
})

Receipt.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Receipt', Receipt);
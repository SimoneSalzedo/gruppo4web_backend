const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    username: { type: String, unique: true },
    timeStamp: Date,
    Status: ['pending','processing','ready'],
    default: 'pending'
})

Order.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Order', Order);
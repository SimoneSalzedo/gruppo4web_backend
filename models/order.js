const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    username:  String,
    timeStamp: Date,
    itemNameArray: [String],
    total: Number,
    status: {
        type: String,
        enum: ['pending','processing','ready'],
        default: 'pending'
    },
    })

Order.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Order', Order);
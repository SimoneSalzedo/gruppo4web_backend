const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    id: Number,
    content: String,
    price: Number,
    //TODO IMAGE
})

const menuItem = mongoose.model('menuItem', menuItemSchema)

module.exports = menuItem
const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    content: String,
    price: Number,
    //TODO IMAGE
})

const menuItem = mongoose.model('menuItem', menuItemSchema)
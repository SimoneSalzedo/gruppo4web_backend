const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    itemName: { type: String, unique: true },
    price: Number,
    description: {
        type: String,
        default: "Mhm, Yummi!!"
    }
})

const menuItem = mongoose.model('menuItem', menuItemSchema)

module.exports = menuItem
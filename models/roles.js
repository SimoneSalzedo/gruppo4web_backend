const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    userType: {
        type: String,
        enum : ['user','admin','chef'],
        default: 'user'
    },
})
const Role = mongoose.model('Role', RoleSchema)

module.exports = Role
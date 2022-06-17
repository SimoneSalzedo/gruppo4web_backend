const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    userType: {
        type: String,
        enum : ['user','admin','chef'],
        default: 'user'
    },
})
RoleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Role = mongoose.model('Role', RoleSchema)

module.exports = Role
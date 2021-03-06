require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const HOST = process.env.HOST

module.exports = {
    MONGODB_URI,
    PORT,
    HOST
}
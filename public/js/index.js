const app = require('./app')
const http = require('http')
const config = require('../../utils/config')
const logger = require('../../utils/logger')

const url = process.env.MONGODB_URI



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
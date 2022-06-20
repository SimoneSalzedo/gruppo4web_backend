const app = require('./app')
const config = require('../../utils/config')
//server starting to listen
const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
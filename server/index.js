const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const router = require('./routes')
const keys = require('./config/keys')


mongoose.connect(keys.database.url, {
}).catch((error) => {
    console.log(error)
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database', keys.database.url)
})

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// api router
app.use(keys.app.apiEndpoint, router)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'It works'})
})

/*app.use((req, res, next) => {
    next(createError(404, 'NotFound'))
})*/
 
app.listen(PORT, function(error){
    if(error) {
        console.log("Error in server setup")
    }
    console.log("Server listening on port", PORT)
})

module.exports = app
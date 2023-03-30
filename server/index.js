const dotenv = require('dotenv').config()
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

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// api router
app.use(keys.app.apiEndpoint, router)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")))
    
    app.all("*", (req, res, next) => {
      res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
    })
  }
 
app.listen(process.env.PORT, function(error){
    if(error) {
        console.log("Error in server setup")
    }
    console.log("Server listening on port", process.env.PORT)
})

module.exports = app
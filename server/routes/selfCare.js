const express = require('express')

const router = express.Router()

router.get('/selfcare', async (req, res, next) => {
    const response = fetch('https://zenquotes.io/api/random').then(res => res.json()).then(data => data.quote)
    if (response) {
        console.log(response)
        res.status(200).json(response)
    } else {
        res.status(404).json({ error: "No response" })
    }

})
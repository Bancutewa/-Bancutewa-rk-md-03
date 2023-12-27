const express = require("express")
const asking = express.Router()
const path = require('path')

asking.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/ask.html"))

})

module.exports = asking
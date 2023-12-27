const express = require("express")
const home = express.Router()
var path = require('path')
const fs = require("fs")


home.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = home
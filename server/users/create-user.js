const fs = require("fs")
var bodyParser = require('body-parser')
module.exports = (req, res) => {
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    //await
    const usersData = JSON.parse(data)


    res.end()
}
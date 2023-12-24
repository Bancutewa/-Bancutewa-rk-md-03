const fs = require("fs")

module.exports = (req, res) => {
    const users = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    //await
    res.status(200).json(JSON.parse(users))
    res.end()
}
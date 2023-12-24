const fs = require("fs")

module.exports = (req, res) => {
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    //await
    const usersData = JSON.parse(data)
    const userID = req.params.id
    const user = usersData.find(user => user.id == userID)

    if (!user) {
        res.status(404).json("ERROR")
    }
    res.status(200).json(user)
}
const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const port = 8080
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Get all users
app.get("/api/v1/users", (req, res) => {

    // B1 lay duoc data tu file USER.JSON
    const users = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    // B2 tra ve thong qua ré.status
    res.status(200).json(JSON.parse(users))
    res.end
})

// Get User by id 
app.get("/api/v1/users/:id", (req, res) => {
    // B!: Lay data tu file JSON
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    // B2: CHuyen sang obj
    const usersData = JSON.parse(data)
    // B3: Lay duoc ID ma minh cang get :id
    const userID = req.params.id
    // B4: Tim kiem thang User tuojng ung voi ID minh tim dc
    const user = usersData.find(user => user.id == userID)
    // B5: tra ve
    if (!user) {
        res.status(404).json("Not found")
    }
    res.status(200).json(user)
})


app.post("/api/v1/users", (req, res) => {
    const { id, name, email, role, active, photo, password } = req.body
    // B1: Doc file
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    // B2: Chuyen sang OBJ
    const usersData = JSON.parse(data)
    // B3: Tao user moi
    const newUser = {
        "id": id,
        "name": name,
        "email": email,
        "role": role,
        "active": active,
        "photo": photo,
        "password": password
    }
    // B4: Day user moi users ma minh co san


    const userExits = usersData.find(user => user.email == email)

    if (!userExits) {
        usersData.push(newUser)
        // B5: send status code va ghi de vao file JSOn
        fs.writeFileSync("./database/users.json", JSON.stringify(usersData), { encoding: "utf-8" })
        res.status(201).json(newUser)
        res.end()
    } else {
        res.status(404).json("User already exists")
        res.end()
    }
})

app.put("/api/v1/users/:id", (req, res) => {
    // B1: Doc file
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    // B2: Chuyen sang OBJ
    const usersData = JSON.parse(data)
    const id = req.params.id

    const listAfterUpdate = usersData.map(user => {
        if (user.id == id) {
            return req.body
        }
        return user
    })


    const userExits = usersData.find(user => user.id == id)

    if (!userExits) {
        res.status(404).json("User not found")
        res.end()
    } else {
        fs.writeFileSync("./database/users.json", JSON.stringify(listAfterUpdate), { encoding: "utf-8" })
        res.status(200).json("User has been updated")
    }
})

app.delete("/api/v1/users/:id", (req, res) => {
    // B1: Doc file
    const data = fs.readFileSync("./database/users.json", { encoding: "utf-8" })
    // B2: Chuyen sang OBJ
    const usersData = JSON.parse(data)
    const id = req.params.id

    const userIndex = usersData.findIndex(user => user.id == id)

    if (userIndex != -1) {
        usersData.splice(userIndex, 1)
        fs.writeFileSync("./database/users.json", JSON.stringify(usersData), { encoding: "utf-8" })
        res.status(200).json("Delete success")
    } else {
        res.status(404).json("User not found")
    }


    const userExits = usersData.find(user => user.id == id)

    if (!userExits) {
        res.status(404).json("User not found")
        res.end()
    } else {
        fs.writeFileSync("./database/users.json", JSON.stringify(listAfterUpdate), { encoding: "utf-8" })
        res.status(200).json("User has been updated")
    }
})
app.listen(port, () => console.log("Server running!!"))
const express = require("express");
const fs = require("fs")
const questionAPI = express.Router()
const bodyParser = require("body-parser")


// Use Body parse
// parse application/x-www-form-urlencoded
questionAPI.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
questionAPI.use(bodyParser.json())

questionAPI.get("/", (req, res) => {
    const dataString = fs.readFileSync("./data/question.json")
    const data = JSON.parse(dataString)
    res.status(200).json(data)
    res.end()
})


questionAPI.get("/:id", (req, res) => {
    const dataString = fs.readFileSync("./data/question.json")
    const data = JSON.parse(dataString)
    const userID = req.params.id
    const user = data.find(user => user.id == userID)

    if (!user) {
        res.status(404).json("Not found")
    } else {
        res.status(200).json(user)
    }
    res.end()
})

questionAPI.post("/", (req, res) => {
    const { content, like, dislike, id } = req.body
    const dataString = fs.readFileSync("./data/question.json")
    const data = JSON.parse(dataString)

    const newQuestion = {
        "content": content,
        "like": like,
        "dislike": dislike,
        "id": id
    }
    const questionExists = data.find(question => question.id == id)


    if (!questionExists) {
        data.push(newQuestion)
        fs.writeFileSync("./data/question.json", JSON.stringify(data, null, 2), { encoding: "utf-8" })
        res.status(201).json(newQuestion)
    } else {
        res.status(404).json("Question already exists")
    }

})
questionAPI.put("/:id", (req, res) => {
    const dataString = fs.readFileSync("./data/question.json");
    const data = JSON.parse(dataString);
    const questionID = req.params.id;

    const updatedData = data.map(question => {
        if (question.id == questionID) {
            if (req.body.action == "like") {
                question.like = (question.like || 0) + 1;
            } else if (req.body.action == "dislike") {
                question.dislike = (question.dislike || 0) + 1;
            }

        }
        return question;
    });

    const questionExists = data.find(question => question.id == questionID);

    if (!questionExists) {
        res.status(404).json("Question not found");
    } else {
        fs.writeFileSync("./data/question.json", JSON.stringify(updatedData, null, 2), { encoding: "utf-8" });

        // Assuming you want to send the updated question as the response
        const updatedQuestion = updatedData.find(question => question.id == questionID);
        res.status(200).json(updatedQuestion);
    }
});
questionAPI.delete("/:id", (req, res) => {
    const dataString = fs.readFileSync("./data/question.json")
    const data = JSON.parse(dataString)
    const questionID = req.params.id

    const questionIndex = data.findIndex(question => question.id == questionID)

    if (questionIndex != -1) {
        data.splice(questionIndex, 1)
        fs.writeFileSync("./data/question.json", JSON.stringify(data, null, 2), { encoding: "utf-8" })
        res.status(200).json("Delete successfully")
    } else {
        res.status(404).json("User not found")
    }

})

module.exports = questionAPI
const express = require("express")
const path = require('path');
// const checkUser = require("./middleware/check-user.middleware")

// Router Page PATH
const homeRouter = require("./routes/home.router")
const askRouter = require("./routes/ask.router")
const questionRouter = require("./routes/question-detail.router")

// API PATH
const questionAPI = require("./api/question-detail.api")

const app = express()
// Export file from public folder
app.use(express.static(path.join(__dirname, 'public')))

// Page Router
app.use("/", homeRouter)
app.use("/ask", askRouter)
app.use("/question-detail", questionRouter)


// API Path
app.use("/api/v1/questions", questionAPI)


app.use((req, res) => {
    res.status(404).send("Page not found")
})

app.listen(8080, () => console.log("Server is running"))
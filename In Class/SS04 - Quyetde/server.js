const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/main.html");
})

app.get("/randomquestion", (req, res) => {
    const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
    const randomNum = Math.floor(Math.random() * questions.length);
    const questionFound = questions[randomNum];
    res.send({ question: questionFound });
})

app.post("/answer", (req, res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
    if (vote == "yes") questions[questionId].yes += 1
    else questions[questionId].no += 1;
    res.redirect(`/${questionId}`);
})

app.get("/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
    const questionFound = questions[questionId];
    res.send({ questionFound });
})

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/views/ask.html");
})

app.post("/ask", (req, res) => {
    const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
    let newQuestion = {
        id: questions.length,
        content: req.body.question,
        yes: 0,
        no: 0,
    };
    questions.push(newQuestion);
    fs.writeFileSync("questions.json", JSON.stringify(questions));
    res.redirect("/");
})

app.listen(5000, (err) => {
    if (err) console.log(err)
    else console.log("Server start success at port 5000!!");
})
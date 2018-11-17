const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended:false }));

app.get("/", (req,res) => {
    res.send("Homepage");
})

app.use(express.static("views"));

// app.get("/ask", (req, res) => {
//     res.sendFile(__dirname + "/views/ask.js");
// });

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/views/ask.html");
});

app.post("/ask", (req, res) => {
    console.log(req.body);
    const questions = JSON.parse(fs.readFileSync('./questions.json', "utf-8"));
    console.log(questions, questions.length);
    let newQuestion = {
        id: questions.length,
        yes: 0,
        no: 0,
        content: req.body.question
    }
    questions.push(newQuestion);
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
})

app.use(bodyParser.urlencoded({extended : false}));
function getRandomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

app.get("/randomquestion", (req,res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json','utf-8'));
    let id = getRandomNumber(0,questions.length-1);
    res.send(questions[id].content);
});

app.get("/question/:questionId", (req,res) => {
    const id = req.params.questionId;
    const questions = JSON.parse(fs.readFileSync('./questions.json','utf-8'));
    if (id < questions.length) {
        res.send(questions[id].content);
    } else res.redirect("/");
});

app.listen(7000, (err) => {
    if(err) console.log(err)
    else console.log("success!")
})
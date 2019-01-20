const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const QuestionModel = require("./models/questionModel");

mongoose.connect("mongodb://localhost/quyetde", (err) => {
    if(err) console.log(err);
    else console.log("Database connect success!!");
})

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/main.html");
})

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/views/ask.html");
})

app.post("/ask", (req, res) => {
    QuestionModel.create(
        { questionContent: req.body.question },
        (err, questionCreated) => {
            if(err) console.log(err)
            else res.redirect(`/result/${questionCreated._id}`);
        }
    )
})

app.get("/randomquestion", (req, res) => {
    QuestionModel.count({}, (err, count) => {
        const randomNum = Math.floor(Math.random() * count);

        QuestionModel.findOne({}, null, { skip: randomNum }, (err, questionFound) => {
            if (err) console.log(err);
            else res.send( questionFound );
        })
    })
})

app.get("/question/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    QuestionModel.findById(questionId, (err, questionFound) => {
        if (err) console.log(err)
        else res.send( questionFound );
    })
})

app.post("/answer", (req, res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    QuestionModel.findByIdAndUpdate(
        questionId, 
        { $inc: vote == "yes" ? { "yes": 1 } : { "no": 1 } }, 
        (err, questionUpdated) => {
            if (err) console.log(err)
            else res.send( questionUpdated );
        }
    )
})

app.get("/result/:questionId", (req, res) => {
    res.sendFile(__dirname + "/views/result.html");
})

app.listen(5000, (err) => {
    if (err) console.log(err)
    else console.log("Server start success at port 5000!!");
})
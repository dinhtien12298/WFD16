const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose")
const app = express();

const questionModel = require("./models/questionModel")

questionModel.find({ }, (err, questions) => {
    if(err) console.log(err)
    else console.log("List question: ", questions);
});

mongoose.connect(
    "mongodb://localhost/quyetdeapp",
    { useNewUrlParser: true },
    (err) => {
    if(err) console.log(err)
    else console.log("DB connect success!");
});

app.use(bodyParser.urlencoded({ extended:false }));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/home.html");
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
    // const questions = JSON.parse(fs.readFileSync('./questions.json', "utf-8"));
    // console.log(questions, questions.length);
    // let newQuestion = {
    //     id: questions.length,
    //     yes: 0,
    //     no: 0,
    //     content: req.body.question
    // }
    // questions.push(newQuestion);
    // fs.writeFileSync("./questions.json", JSON.stringify(questions));
    // res.redirect("/");

    questionModel.create({ content: req.body.question }, (err,questionCreated) => {
        if(err) console.log(err)
        else console.log(questionCreated)
    })
})

// questionModel.find({ }, (err, questions) => {
//     if(err) console.log(err)
//     else console.log("List question: ", questions);
// });

app.get("/randomquestion", (req, res) => {
    // const questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
    // const randomNum = Math.floor(Math.random()*questions.length);
    // res.json({ question: questions[randomNum] });
    questionModel.count({}, (err, count) => {
        if(err) console.log(err)
        else {
            const randomNum = Math.floor(Math.random()*count);
            questionModel.findOne({}, null, { skip:randomNum }, (err, questionFound) => {
                if(err) console.log(err)
                else res.json({ question: questionFound });
            });
        }
    })
});

app.get("/question/:questionId", (req, res) => {
    res.sendFile(__dirname + "/views/result.html")
});

app.get("/questiondetail/:questionId", (req, res) => {
    let questionId = req.params.questionId;
    let questionList = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
    res.json({ success: 1, question: questionList[questionId] });
});

app.post("/answer/", (req, res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    const questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
    if(vote == "yes") questions[questionId].yes += 1
    else questions[questionId].no += 1;
    fs.writeFileSync('./questions.json', JSON.stringify(questions));
    res.redirect("http://localhost:7000/question/"+questionId);;
});

app.listen(7000, (err) => {
    if(err) console.log(err)
    else console.log("success!")
})
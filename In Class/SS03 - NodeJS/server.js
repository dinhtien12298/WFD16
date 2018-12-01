const express = require("express");
const path = require("path");

let app = express();
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.send("Home");
})

app.get("/file", (req, res) => {
    res.send({ age: 20, yob: 1998})
})

app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.listen(7000, (err) => {
    if(err) console.log(err)
    else console.log("Server start success at port 7000!");
})
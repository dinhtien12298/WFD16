const express = require('express');
const path = require('path');
let app = express();

// /home
app.get("/home", (request, response) => {
    response.send({
        dt: 12,
        sm: 17
    })
})

// /about
app.get("/about", (request, response) => {
    response.send("Surprise Mother Fucker!")
})

// 
app.get("/", (request, response) => {
    console.log(__dirname);
    console.log(path.resolve(__dirname, "../Homework/Session02/index.html"));
    response.sendFile(path.resolve(__dirname, "../Homework/Session02/index.html"));
})

app.use(express.static("../Homework/Session02"))

app.listen(6969, (err) => {
    if(err) console.log(err)
    else console.log("Server start success!")
})
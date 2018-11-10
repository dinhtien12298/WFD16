const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

let app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.html")
});

app.get('/detail/:class', (req, res) => {
    const className = req.params.class;
    axios({
        url: 'https://btvn-web16s.herokuapp.com/' + className,
        method: 'GET'
    }).then(function(data) {
        res.send(data.data);
    })
});

app.listen(7000, (err) => {
    if(err) console.log(err)
    else console.log("Server start success!")
})
const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

let app = express();

// http://localhost:7000/web16 => http://localhost:7000?classname=abc

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.html")
});

// app.get('/:classname', (req, res) => {
//     const { classname } = req.params;
// app.get('/', (req,res) => {
//     const { classname } = req.query;
// app.get('/detail/:class', (req, res) => {
//     const className = req.params.class;
//     axios({ 
//         url: 'https://btvn-web16s.herokuapp.com/' + className,
//         method: 'GET'
//     }).then(function(data) {
//         res.send(data.data);
//     })
// });

app.get('/', (req,res) => {
    const { classname } = req.query;
    axios({
        method: 'GET',
        url: `https://btvn-web16s.herokuapp.com/api/${classname}`,
    }).then(({ data }) => {
        const { students } = data;
        const studentHTML = students.map(student => `<li>${student}</li>`);
        res.send(`<ol>${studentHTML.join("")}</ol>`);
    });
});

app.listen(7000, (err) => {
    if(err) console.log(err)
    else console.log("Server start success!")
})
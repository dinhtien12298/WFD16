const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/homepage.html");
})

app.post("/creategame", (req, res) => {
    const players = JSON.parse(fs.readFileSync("players.json", "utf-8"));
    const games = JSON.parse(fs.readFileSync("games.json", "utf-8"));
    let player1 = {
        id: players.length,
        game_id: games.length,
        name: req.body.namePlayer1,
        score: {},
    }
    let player2 = {
        id: players.length + 1,
        game_id: games.length,
        name: req.body.namePlayer2,
        score: {},
    }
    let player3 = {
        id: players.length + 2,
        game_id: games.length,
        name: req.body.namePlayer3,
        score: {},
    }
    let player4 = {
        id: players.length + 3,
        game_id: games.length,
        name: req.body.namePlayer4,
        score: {},
    }
    let newGames = {
        id: games.length,
        players: { player1, player2, player3, player4 },
    }
    games.push(newGames);
    fs.writeFileSync("games.json", JSON.stringify(games));
    players.push(player1, player2, player3, player4);
    fs.writeFileSync("players.json", JSON.stringify(players));
    res.redirect("/");
})

app.get("/gamedetail/:gameId", (req, res) => {
    const gameId = req.params.gameId;
    const games = JSON.parse(fs.readFileSync("games.json", "utf-8"));
    res.send({ game: games[gameId] });
})

app.get("/addround/", (req, res) => {
    res.sendFile(__dirname + "/views/addround.html");
})

app.listen(5000, (err) => {
    if (err) console.log(err)
    else console.log("Server start success at port 5000!!");
})
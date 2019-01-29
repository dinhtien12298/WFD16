const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');

const RootRouter = require("./routers");

mongoose.connect("mongodb://localhost/techkids-hotgirl",
{ useNewUrlParser: true },
(err) => {
    if (err) console.log(err)
    else console.log("Database connect success!");
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", RootRouter);
app.use(session({
    // 4 Option cơ bản chủ yếu sẽ dùng
    secret: "nomeaning", // Lưu trữ cookie của trình duyệt
    resave: false, // Thuộc tính mỗi lần truy cập vào có ghi đè dữ liệu không
    saveUninitialized: false, // không save nếu người dùng không tương tác với dữ liệu
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 7*24*60*60*1000 // Hạn sử dụng Cookie
    }
}));

// Middleware // Phần trung giãn giữa request của người dùng và response của server
app.use((req, res, next) => {
    console.log(req.sessionID);
    console.log(req.session.userInfo);
    next(); // Cho phép chạy tiếp
})

const UserModel = require('./models/users')

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
})

app.get("/loginsuccess", (req, res) => {
    res.send("Login Success!!!")
})

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        UserModel.findOne({ username }, function(err, userFound) {
            if (err) res.status(500).json({ success: 0, message: err })
            else if (!userFound || !userFound._id) res.status(404).json({ success: 0, message: "Not found!" })
            else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const { username, email, _id, role } = userFound;
                    req.session.userInfo = { username, email, userId: _id, role };
                    res.json({ success: 1, message: "Login successfully!" });
                } else res.status(401).json({ success: 0, message: "Wrong password!" });
            }
        })
    }
})

app.delete("/logout", (req, res) => {
    req.session.destroy();
    res.json({ success: 1, message: "Logout success!" });
})

const port = process.env.PORT || 6969;
app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log("Server start success at port 6969!");
})
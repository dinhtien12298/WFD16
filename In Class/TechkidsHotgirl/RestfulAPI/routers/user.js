const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const UserRouter = express.Router();

UserModel = require("../models/users");

// TODO: CRUD for user
// /api/users

UserRouter.use((req, res, next) => {
    console.log(req.sessionID);
    console.log(req.session.userInfo);
    if (req.session.userInfo && req.session.userInfo.role == "admin") {
        next();
    } else res.status(401).json({ success: 0, message: "Unaothorized" });
})

UserRouter.post("/", (req, res) => {
    const newUser = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(newUser.password, salt || 12); //Nhận vào password và số lần mã hóa
    newUser.password = hashPassword; // Nhận lại password sau khi đã mã hóa
    UserModel.create(newUser, (err, userCreated) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Created success!" })
    })
})

// Find All
UserRouter.get("/", (req, res) => {
    UserModel.find({}, null, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.json({ users: userFound });
    });
});

// Find One by Id
UserRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.json({ users: userFound });
    });
});

// Update
UserRouter.put("/:id", (req, res) => {
    const update = req.body;
    const userId = req.params.id;
    UserModel.findById(userId,  (err, userFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!userFound || !userFound._id) res.status(404).json({ success: 0, message: "Not found!" });
        else {
            if (update.password) {
                // Check xem password text có giống như password đã mã hóa không
                if (!bcrypt.compareSync(update.password, userFound.password)) {
                    update.password = bcrypt.hashSync(update.password, 12);
                } else {
                    update.password = undefined;
                }
            }
            // Update
            for (key in update) {
                if (update[key] && userFound[key]) {
                    userFound[key] = update[key];
                }
            }
            userFound.save(function(err, userUpdated) {
                if (err) res.status(500).json({ success: 0, message: err })
                else res.json({ success: 1, message: "Update success!", data: userUpdated });
            })
        }
    })
})

// Delete
UserRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.json({ success: 1, message: "Delete success!!" });
    });
});

module.exports = UserRouter;
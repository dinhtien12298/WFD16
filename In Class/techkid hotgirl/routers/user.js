const express = require("express");
const UserRouter = express.Router();

const UserModel = require("../models/user");

// TODO: CRUD for user
// Create
UserRouter.post("/", (req, res) => {
    const newUser = req.body;
    UserModel.create(newUser, (err, userCreated) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Creat success!!" });
    });
});

// Find All
UserRouter.get("/", (req, res) => {
    UserModel.find({}, null, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ users: userFound });
    });
});

// Find One by Id
UserRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ users: userFound });
    });
});

// Update
UserRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;
    UserModel.findByIdAndUpdate(id, updateUser, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Update success!!" });
    });
});

// Delete
UserRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Delete success!!" });
    });
});

module.exports = UserRouter;
const express = require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../models/user");

// TODO: CRUD for user
// Create
UserRouter.post("/", (req, res) => {
    const newUser = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(newUser.password, salt || 12)
    newUser.password = hashPassword;
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
    UserModel.findById(id, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else if (!userFound || !userFound._id)res.status(404).json({ success: 0, message: "Not Found!"})
        // else res.status(201).json({ success: 1, message: "Update success!!" });
        else {
			if(update.password && !bcrypt.compareSync(update.password, userFound.password)) {
				update.password = bcrypt.hashSync(update.password, 12);
			} else {
				update.password = undefined;
			}
        }
        for (key in update) {
            if( update[key] && userFound[key] ) {
                userFound[key] = update[key];
            }
        }
        userFound.save(function(err) {
            if(err) res.status.json({ success: 0, message: err })
            else res.json({ success: 1, message: "Update success!", data: userUpdated });
        })
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
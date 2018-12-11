const express = require("express");
const PostRouter = express.Router();

const PostModel = require("../models/post");
// TODO: CRUD for post
// Create
PostRouter.post("/", (req, res) => {
    const newPost = req.body;
    PostModel.create(newPost, (err, postCreated) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Creat success!!" });
    });
});

// Find All
PostRouter.get("/", (req, res) => {
    PostModel.find({}, null, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ posts: postFound });
    });
});

// Find One by Id
PostRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findById(id, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ posts: postFound });
    });
});

// Update
PostRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatePost = req.body;
    PostModel.findByIdAndUpdate(id, updatePost, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Update success!!" });
    });
});

// Delete
PostRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndDelete(id, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Delete success!!" });
    });
});


module.exports = PostRouter;
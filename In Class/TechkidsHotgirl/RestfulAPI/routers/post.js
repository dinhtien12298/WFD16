const express = require('express');
const PostRouter = express.Router();

PostModel = require("../models/posts");

// TODO: CRUD for user
// Create
PostRouter.post("/", (req, res) => {
    const newPost = req.body;
    PostModel.create(newPost, (err, postCreated) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, message: "Created success!" })
    })
})

// Find All
PostRouter.get("/", (req, res) => {
    PostModel.find({}, {image: 1, description: 1, title: 1, author: 1})
        .populate({
            // Chọn ra các thông tin cần
            path: "author",
            select: {
                username: 1,
                email: 1,
                fullname: 1
            }
        })
        // Sử dụng exec vì populate không có callback
        .exec((err, posts) => {
            if(err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "Success!", data: posts });
        });
});

// Find One by Id
PostRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findById(id, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else if(!postFound || !postFound._id) res.status(404).json({ success: 0, message: "Not found!" })
        else res.json({ success: 1, message: "Success!", data: postFound });
    });
});

// Update
PostRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatePost = req.body;
    PostModel.findByIdAndUpdate(id, { $set: updatePost }, { new: true }, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.json({ success: 1, message: "Update success!!", data: postUpdated });
    });
});

// Delete
PostRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndDelete(id, (err, postFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else res.json({ success: 1, message: "Delete success!!" });
    });
});

module.exports = PostRouter;
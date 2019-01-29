const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: String, require: true },
    content: { type: String, required: true }
}, {
    _id: false
})

const PostSchema = new Schema({
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [CommentSchema],
    title: { type: String, required: true },
    description: { type: String }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
})

module.exports = mongoose.model("Post", PostSchema);
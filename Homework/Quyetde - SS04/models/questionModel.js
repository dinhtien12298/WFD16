const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    //name: String ...
    // yes: Number,
    yes : { type: Number, default: 0 },
    No: { type: Number, default: 0 },
    content: { type: String, required: true, unique: true} //unique: true 
}, {
    //options
    timestamps: true // created_at updated_at,
    // _id: false
});

module.exports = mongoose.model("QuestionSchema");
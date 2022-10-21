const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fname: {
        type: String,
        unique: false,
        required: true
    },
    lname: {
        type: String,
        unique: false,
        required: true,
    },
    age: {
        type: Number,
        unique: false,
        required: true
    },
    pet: {
        type: Number,
        unique: false,
        required: false
    }
})

module.exports = mongoose.model("users", userTemplate);
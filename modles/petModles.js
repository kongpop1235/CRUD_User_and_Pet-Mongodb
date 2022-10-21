const mongoose = require("mongoose");

const petTemplate = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    type: {
        type: String,
        unique: false,
        required: true
    }
})

module.exports = mongoose.model("pet", petTemplate);
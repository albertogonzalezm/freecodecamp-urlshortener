const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        require: true
    },
    short_url: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: false
});

module.exports = mongoose.model("urls", urlSchema);
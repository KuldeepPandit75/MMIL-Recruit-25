// models/AndroidData.js

const mongoose = require('mongoose');

const AndroidSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    gDriveLink: {
        type: String,
        required: true
    }
});

const Android = mongoose.model('Android', AndroidSchema);

module.exports = Android;

// models/WebDevData.js

const mongoose = require('mongoose');

const webDevSchema = new mongoose.Schema({
    phoneNo: {
        type: Number,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    hostedSiteLink: {
        type: String,
        required: true
    }
});

const WebDev = mongoose.model('WebDev', webDevSchema);

module.exports = WebDev;

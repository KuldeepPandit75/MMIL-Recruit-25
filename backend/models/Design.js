// models/DesignData.js

const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    figmaLink: {
        type: String,
        required: true
    }
   
    
});

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;

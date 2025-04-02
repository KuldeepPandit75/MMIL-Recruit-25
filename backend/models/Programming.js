// models/ProgrammingData.js

const mongoose = require('mongoose');

const ProgrammingSchema = new mongoose.Schema({
    phoneNo: {
        type: Number,
        required: true
    }
});

const Programming = mongoose.model('Programming', ProgrammingSchema);

module.exports = Programming;

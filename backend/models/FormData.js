const mongoose = require('mongoose');
const FormData = new mongoose.Schema({
   
    name:{
        type:String,
        required: true
    },
    year:{
        type:String,
        required:true
    },
    rollNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    }
})

const MMIL = mongoose.model('MMIL',FormData);

module.exports = MMIL;
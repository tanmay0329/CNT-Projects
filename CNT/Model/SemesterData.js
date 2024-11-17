const mongoose = require("mongoose");

const semesterMarksSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    PRN:{
        type:String,
        required: true,
        unique:true,
    },
    rollNumber:{
        type:String,
        required: true
    },
    division:{
        type:String,
        required: true
    },
    marksOfDAA:{
        type:String,
        required: true
    },
    marksOfCNT:{
        type:String,
        required: true
    },
    marksOfCC:{
        type:String,
        required: true
    },
    marksOfANN:{
        type:String,
        required: true
    }
}, {timestamps:true});

const semResult = mongoose.model('semesterResultSchema',semesterMarksSchema);

module.exports = {semResult};
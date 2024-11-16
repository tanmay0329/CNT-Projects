const mongoose = require("mongoose");

const semesterMarksSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    PRN:{
        type:String,
        required: true
    },
    rollNumber:{
        type:String,
        required: true
    },
    division:{
        type:String,
        required: true
    },
    DAA:{
        type:String,
        required: true
    },
    CNT:{
        type:String,
        required: true
    },
    ANN:{
        type:String,
        required: true
    },
    ANN:{
        type:String,
        required: true
    }
}, {timestamps:true});

const semResult = mongoose.model('semesterResultSchema',semesterMarksSchema);

module.exports = {semResult};
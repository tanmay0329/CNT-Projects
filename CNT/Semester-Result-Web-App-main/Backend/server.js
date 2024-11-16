const express = require("express")
const connectDB = require("./ConnectDb");

const app = express();

connectDB.connectToDB(process.env.MONGODB ?? "mongodb://127.0.0.1:27017/semesterResultWebAppDB")
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error occured while connecting to database = ",err);
})

const {
    AddNewResult,
} = require("./Controller/SemesterResult");

app.post("/api/user/AddNewResult", async(req,res)=>{
    const result = req.body;
    console.log("Result = ",result);
    if(!result){
        res.json({response:"Error Data Not Found"})
    }else{
        res.json({response:"All Good"})
    }
})


const PORT = 8000;
app.listen(PORT, ()=>{console.log("Server Started at ",8000)})
const express = require("express")
const connectDB = require("./ConnectDb");

const app = express();
app.use(express.json());

connectDB.connectToDB(process.env.MONGODB ?? "mongodb://127.0.0.1:27017/semesterResultWebAppDB")
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error occured while connecting to database = ",err);
})

const {
    AddNewResult,
    ShowAllData,
    getSingleUserResult,
    modifyData,
} = require("./Controller/SemesterResult");

app.post("/api/user/AddNewResult", async(req,res)=>{
    const result = req.body;
    console.log("Result of all data  = ", req.body);
    const result1 = await AddNewResult(req.body);
    // console.log("result of data submission - ",result1);

    if(!result){
        res.json({response:"Error Data Not Found"})
    }else{
        res.json({response:"All Good"})
    }
})

app.get("/api/user/allSemData", async(req,res)=>{
    try {
        const result = await ShowAllData();
        console.log("All Sem Data Retrived = ",result)
        if(!result){
            res.json({result:"No Data Found"})
        }else{
            res.json({result: result});
        }
    } catch (error) {
        
    }
})
app.put("/api/user/UpdateResultInfo", async (req, res) => {
    try {
        // Extract data from req.body
        const { userName, PRN, rollNumber,division, marksOfDAA, marksOfCNT, marksOfCC, marksOfANN } = req.body;
        console.log(userName, PRN, rollNumber,division, marksOfDAA, marksOfCNT, marksOfCC, marksOfANN);

        // Modify data logic
        const result = await modifyData(userName, PRN, rollNumber, marksOfDAA, marksOfCNT, marksOfCC, marksOfANN);
        console.log("Response of modifyData = ", result);

        // Send success response
        res.json({ msg: "Good" });
    } catch (error) {
        console.error("Error while updating result info:", error);
        res.status(500).json({ msg: "Error updating result" });
    }
});


app.post("/api/user/single-user-result",async(req,res)=>{
    try {
        const PRN = req.body;
        console.log("PRN = ",PRN)
        const result = await getSingleUserResult(PRN.reqPRN);
        console.log(result)
        if(!result){
            res.send(undefined);
        }
        else{
            res.json({data:result});
        }
    } catch (error) {
        console.log("Error occured while getting single user data = ",error);
    }
})


const PORT = 8000;
app.listen(PORT, ()=>{console.log("Server Started at ",8000)})
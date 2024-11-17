const { get } = require("mongoose");
const {semResult} = require("../Model/SemesterData");

async function AddNewResult(data) {
    const result =  await semResult.create(data);
    return result;
}

async function ShowAllData(){
    const result = await semResult.find({});
    return result;
}

async function getSingleUserResult(PRN) {
    const result = await semResult.find({PRN:PRN})
    return result;
}

async function modifyData(userName, PRN, rollNumber,division, marksOfDAA, marksOfCNT, marksOfCC, marksOfANN) {
    const result = await semResult.updateOne(

    { PRN: PRN }, // Filter to find the document by PRN
    {
      $set: {
        
        userName: userName,
        PRN: PRN,
        rollNumber: rollNumber,
        division: division,
        marksOfDAA: marksOfDAA,
        marksOfCNT: marksOfCNT,
        marksOfCC: marksOfCC,
        marksOfANN: marksOfANN,
      }
    }
)
return result
}

module.exports = {
    AddNewResult,
    ShowAllData,
    getSingleUserResult,
    modifyData,
}
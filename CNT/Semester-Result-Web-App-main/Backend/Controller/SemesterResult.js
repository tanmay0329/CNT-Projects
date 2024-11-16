const {semResult} = require("../Model/SemesterData");

async function AddNewResult(data) {
    const reuslt =  await semResult.create(data);
}

module.exports = {
    AddNewResult,
}
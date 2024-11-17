import { useEffect, useState } from "react";
import axios from "axios"

const SideBar = () => {
    const [chooseButton, setChooseButton] = useState('');
    const [userName, setUserName] = useState("")
    const [PRN, setPRN] = useState("")
    const [rollNumber, setRollNumber] = useState("")
    const [division, setDivision] = useState("")
    const [marksOfDAA, setMarksOfDAA] = useState("")
    const [marksOfCNT, setMarksOfCNT] = useState("")
    const [marksOfANN, setMarksOfANN] = useState("")
    const [marksOfCC, setMarksOfCC] = useState("")
    const [load, setLoad] = useState(false);

    const [reqPRN, setReqPRN] = useState(0);

    const [allSemData, setAlltSemData] = useState([]);

    const [dragData, setDragData] = useState("");

    async function addSemResults() {
        setLoad(true);
        try {
            const resp = await axios.post("/api/user/AddNewResult", {
                userName,
                PRN,
                rollNumber,
                division,
                marksOfDAA,
                marksOfCNT,
                marksOfANN,
                marksOfCC,
            })
            setUserName("")
            setPRN("")
            setRollNumber("")
            setDivision("")
            setMarksOfANN("")
            setMarksOfCC("")
            setMarksOfCNT("")
            setMarksOfDAA("")
            console.log("Response after sending data to backend  - ", resp);
            if (resp.data.response == "All Good") {
                setLoad(false)
            }
        } catch (error) {
            console.log("Error = ", error);
        }
    }

    async function getSingleUserData() {
        console.log(reqPRN);
        try {
            const resp = await axios.post("/api/user/single-user-result", {
                reqPRN,
            })
            console.log("Resp for sem data update = ", resp)
            setUserName(resp.data.data[0].userName)
            setPRN(resp.data.data[0].PRN)
            setRollNumber(resp.data.data[0].rollNumber)
            setDivision(resp.data.data[0].division)
            setMarksOfDAA(resp.data.data[0].marksOfDAA)
            setMarksOfCNT(resp.data.data[0].marksOfCNT)
            setMarksOfANN(resp.data.data[0].marksOfANN)
            setMarksOfCC(resp.data.data[0].marksOfCC)
            // console.log(resp.data.data[0].userName)
        } catch (error) {
            console.log("Error while updating the info = ", error);
        }
    }

    async function updateResult() {  // Fixed typo in function name
        console.log(userName,
            PRN,
            rollNumber,
            division,
            marksOfCNT,
            marksOfCC,
            marksOfANN,
        );
        try {
            const resp = await axios.put("/api/user/UpdateResultInfo", {
                userName,
                PRN,
                rollNumber,
                division,
                marksOfDAA,
                marksOfCNT,
                marksOfCC,
                marksOfANN,
            });
            console.log("Update response = ", resp);
            if (resp.data.msg === "Good") {
                setLoad(false);
            } else {
                setLoad(true);
            }
        } catch (error) {
            console.log("Error while updating info:", error);
        }
    }



    useEffect(() => {
        console.log(load)
        async function getAllSemesterResultData() {
            const resp = await axios.get('/api/user/allSemData');
            console.log("Response for all sem data = ", resp);
            setAlltSemData(resp.data.result);
        }
        getAllSemesterResultData();
    }, [dragData])




    function displayChange() {
        console.log(chooseButton)
    }

    return (
        <div className="bg-[#0a2342]">
    
            <div className="text-2xl mx-4 text-white">
                All Operations
            </div>
            <div className="flex justify-center">
                <button className="border-sky-950 border-2 mx-2 py-1 px-2 my-5 rounded-lg bg-[#5c95ff] text-sky-50" onClick={() => { setChooseButton(1), displayChange() }}>Create New Result Holder</button>
                <button className="border-sky-950 border-2 mx-2 py-1 px-2 my-5 rounded-lg bg-[#5c95ff] text-sky-50" onClick={() => { setChooseButton(2), displayChange() }}>Update Existing Result Holder</button>
                <button className="border-sky-950 border-2 mx-2 py-1 px-2 my-5 rounded-lg bg-[#5c95ff] text-sky-50" onClick={() => { setChooseButton(3), displayChange(), setDragData(!dragData) }}>Delete Exiting Result Holder</button>
            </div>
            <div className="flex flex-col justify-center items-center text-white">
                {chooseButton == 1 ? (<>


                    <div className="my-2 ">Add new result</div>
                    <div className="my-2 ">Enter Name</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    <div className="my-2 ">Enter PRN</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="PRN" value={PRN} onChange={(e) => { setPRN(e.target.value) }} />
                    <div className="my-2 ">Enter ROLL</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Roll" value={rollNumber} onChange={(e) => { setRollNumber(e.target.value) }} />
                    <div className="my-2 ">Enter Division</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Div" value={division} onChange={(e) => { setDivision(e.target.value) }} />
                    <div className="my-2 ">Enter Marks Of DAA</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="DAA Marks" value={marksOfDAA} onChange={(e) => { setMarksOfDAA(e.target.value) }} />
                    <div className="my-2 ">Enter Marks Of CNT</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="CNT Marks" value={marksOfCNT} onChange={(e) => { setMarksOfCNT(e.target.value) }} />
                    <div className="my-2 ">Enter Marks Of ANN</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="ANN Marks" value={marksOfANN} onChange={(e) => { setMarksOfANN(e.target.value) }} />
                    <div className="my-2 ">Enter Marks Of CC</div>
                    <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="CC Marks" value={marksOfCC} onChange={(e) => { setMarksOfCC(e.target.value) }} />
                    <button className="border-2 border-black rounded-lg py-2 px-3 m-5" onClick={addSemResults}>{load ? "|" : "Submit"}</button>
                </>) :
                    chooseButton == 2 ? (<>
                        <div>Update new result</div>
                        <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" placeholder="Enter Student PRN to Modify Data" value={reqPRN} onChange={(e) => setReqPRN(e.target.value)} />
                        <button className="border-2 border-black rounded-lg py-2 px-3 m-5" onClick={() => getSingleUserData()}>Submit PRN</button>
                        <div>
                            <div>Name: <strong>{userName}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />

                        </div>
                        <div>
                            <div>PRN: <strong>{PRN}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="PRN" value={PRN} onChange={(e) => { setPRN(e.target.value) }} />

                        </div>
                        <div>
                            <div>Roll Number: <strong>{rollNumber}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Roll" value={rollNumber} onChange={(e) => { setRollNumber(e.target.value) }} />

                        </div>
                        <div>
                            <div>Division: <strong>{division}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="Div" value={division} onChange={(e) => { setDivision(e.target.value) }} />

                        </div>
                        <div>
                            <div>Marks of DAA: <strong>{marksOfDAA}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="DAA Marks" value={marksOfDAA} onChange={(e) => { setMarksOfDAA(e.target.value) }} />

                        </div>
                        <div>
                            <div>Marks of CNT: <strong>{marksOfCNT}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="CNT Marks" value={marksOfCNT} onChange={(e) => { setMarksOfCNT(e.target.value) }} />

                        </div>
                        <div>
                            <div>Marks of ANN: <strong>{marksOfANN}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="ANN Marks" value={marksOfANN} onChange={(e) => { setMarksOfANN(e.target.value) }} />

                        </div>
                        <div>
                            <div>Marks of CC: <strong>{marksOfCC}</strong></div>
                            <input className="border-2 border-sky-950 py-1 px-2 rounded-lg bg-gray-200 text-slate-800" type="text" name="" id="" placeholder="CC Marks" value={marksOfCC} onChange={(e) => { setMarksOfCC(e.target.value) }} />

                        </div>
                        <button className="border-2 border-black rounded-lg py-2 px-3 m-5" onClick={() => { updateResult() }}>{load ? "|" : "Update Data"}</button>

                    </>) :
                        (<>
                            {allSemData == "No Data Found" ? (<>Data Not Found</>) : (<>
                                {allSemData.map((item) => (
                                    <div key={item._id} className="p-4 border-b">
                                        <div className="m-2 ">Name: <strong>{item.userName}</strong></div>
                                        <div className="m-2 ">PRN: <strong>{item.PRN}</strong></div>
                                        <div className="m-2 ">Roll Number: <strong>{item.rollNumber}</strong></div>
                                        <div className="m-2 ">Division: <strong>{item.division}</strong></div>
                                        <div className="m-2 ">Marks of DAA: <strong>{item.marksOfDAA}</strong></div>
                                        <div className="m-2 ">Marks of CNT: <strong>{item.marksOfCNT}</strong></div>
                                        <div className="m-2 ">Marks of ANN: <strong>{item.marksOfANN}</strong></div>
                                        <div className="m-2 ">Marks of CC: <strong>{item.marksOfCC}</strong></div>
                                        <button className="border-2 border-black rounded-lg py-2 px-3 m-5 bg-red-500">Delete Result</button>
                                    </div>
                                ))}

                            </>)}
                        </>)}
            </div>

        </div>
    )
};

export default SideBar;
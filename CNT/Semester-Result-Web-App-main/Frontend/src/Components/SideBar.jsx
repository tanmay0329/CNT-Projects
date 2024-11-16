import { useState } from "react";

const SideBar = () => {
    const [chooseButton, setChooseButton] = useState('');

    function displayChange() {
        console.log(chooseButton)
    }

    return (
        <div>
            <div>
                All Operations
            </div>
            <button onClick={() => { setChooseButton(1), displayChange() }}>Create New Result Holder</button>
            <button onClick={() => { setChooseButton(2), displayChange() }}>Update Existing Result Holder</button>
            <button onClick={() => { setChooseButton(3), displayChange() }}>Delete Exiting Result Holder</button>
            {chooseButton == 1 ? (<>
                <div>Add new result</div>
                <div>Enter Name</div>
                <input type="text" name="" id="" placeholder="Name" />
                <div>Enter PRN</div>
                <input type="text" name="" id="" placeholder="PRN" />
                <div>Enter ROLL</div>
                <input type="text" name="" id="" placeholder="Roll" />
                <div>Enter Division</div>
                <input type="text" name="" id="" placeholder="Div" />
                <div>Enter Marks Of DAA</div>
                <input type="text" name="" id="" placeholder="DAA Marks" />
                <div>Enter Marks Of CNT</div>
                <input type="text" name="" id="" placeholder="CNT Marks" />
                <div>Enter Marks Of ANN</div>
                <input type="text" name="" id="" placeholder="ANN Marks" />
                <div>Enter Marks Of CC</div>
                <input type="text" name="" id="" placeholder="CC Marks" />
            </>) :
                chooseButton == 2 ? (<>
                    <div>Update new result</div>
                </>) :
                    (<>
                        <div>Delete new result</div>
                    </>)}
        </div>
    )
};

export default SideBar;
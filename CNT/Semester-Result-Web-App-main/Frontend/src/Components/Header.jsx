const Header = () => {
    return (
        <>
            <div className="flex justify-between bg-[#9cf6f6] py-5 px-2">
                <div className="text-2xl text-[#8f2d56]  ">SemHolder</div>
                <div>

                    <button className="font-bold text-lg rounded-lg border-2 border-sky-950 py-1 px-2 mx-2 text-sky-50 bg-[#f05d5e]">About Dev</button>
                    <button className="font-bold text-lg rounded-lg border-2 border-sky-950 py-1 px-2 mx-2 text-sky-50 bg-[#f05d5e]">Tech</button>
                </div>
            </div>
        </>
    )
};

export default Header;
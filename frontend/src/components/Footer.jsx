function Footer() {
    return (
        <div>
            <hr />
            <div className="p-5 flex flex-col gap-3 justify-center items-center">
                {/* <div>Contact: 01795019802</div> */}
                {/* <div>Email: riadkabir45@gmail.com</div> */}
                <div className="flex flex-col sm:flex-row gap-2 text-center">
                    <div>Copyright © 2024 ByteBit</div><span className="hidden sm:inline">|</span>
                    <div>All Rights Reserved</div><span className="hidden sm:inline">|</span>
                    <div>Bangladesh</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
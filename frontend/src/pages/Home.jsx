
function Home() {

    const category = {
        'tablet-pc': 'nf-md-tablet_cellphone',
        'smart-watch': 'nf-md-watch',
        'earbuds': 'nf-md-earbuds',
        'mobile-phone-charger-adapter': 'nf-md-cable_data',
        'speaker-and-home-theater': 'nf-md-speaker',
        'headphone': 'nf-fa-headphones_simple',
        'chair': 'nf-md-chair_rolling',
        'laptop': 'nf-fa-laptop',
        'mouse': 'nf-md-mouse',
        'keyboard': 'nf-md-keyboard',
        'monitor': 'nf-md-desktop_mac',
        'console': 'nf-fa-gamepad',
        'pen-drive': 'nf-md-usb_flash_drive',
        'server': 'nf-fa-server',
        'camera': 'nf-md-camcorder'
    };

    return (
        <div className="flex flex-col gap-20 mx-10">
            <section>
            <div id="latest" className="flex flex-col md:flex-row min-h-10 border-black border">
                <div id="text" className="flex flex-col flex-1 justify-center items-center p-5 xs:p-10">
                    <div>
                    <div className="flex text-xs xs:text-lg sm:text-2xl md:text-2xl items-center gap-2"><span className="w-11 h-[2px] bg-[#414141] inline-block"></span> Our Best Products</div>
                    <div className="text-xl xs:text-4xl md:text-5xl">Latest Arrivals</div>
                    <div className="flex text-xs xs:text-lg sm:text-2xl md:text-2xl items-center gap-2">Show Now <span className="w-11 h-[2px] bg-[#414141] inline-block"></span> </div>
                    </div>
                </div>
                <div id="pic" className="bg-green-600 flex-1">
                    <img src="https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
            </div>
            <hr />
            </section>
            <section className="flex flex-col gap-10">
                <div className="text-center font-bold text-lg xs:text-3xl md:text-4xl lg:text-6xl">Featured Categories</div>
                <div id="category" className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                    {
                        Object.entries(category).map(([key, value]) => (
                        <a key={key} href={"/category/" + key}>
                            <div className="p-20 rounded-xl transition duration-500 hover:bg-slate-100 bg-slate-300 flex justify-center items-center"> 
                          <i className={"nf text-5xl " + value}></i>
                        </div>
                        </a>
                      ))
                    }
                </div>
            </section>
            <hr />
            <section className="min-h-screen flex flex-col gap-10 mb-10">
                <div className="text-center text-lg xs:text-3xl md:text-4xl lg:text-6xl flex flex-col justify-center gap-14">
                    <span className="font-bold">Why chose us?</span>
                    <i className="text-8xl nf nf-fa-face_kiss"></i>
                </div>
                <div className="flex flex-col md:flex-row gap-10 justify-evenly items-center flex-grow">
                    <div className="flex flex-col text-center gap-8">
                        <i className="text-7xl nf nf-cod-issue_reopened"></i>
                        <span>
                        <span>Easy Exchange</span><br />
                        <span className="text-slate-400">We offer hassle free exchange policy</span>
                        </span>
                    </div>
                    <div className="flex flex-col text-center gap-8">
                        <i className="text-7xl nf nf-md-checkbox_marked_circle_outline"></i>
                        <span>
                        <span>7 Days Return Policy</span><br />
                        <span className="text-slate-400">We Provide 7 Days Return policy</span>
                        </span>
                    </div>
                    <div className="flex flex-col text-center gap-8">
                        <i className="text-7xl nf nf-md-face_agent"></i>
                        <span>
                        <span>Best Customer Support</span><br />
                        <span className="text-slate-400">We provide 24/7 Customer Support</span>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;

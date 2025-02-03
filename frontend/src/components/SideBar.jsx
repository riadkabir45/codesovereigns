import { useState } from "react";

let open,setOpen;
let toggleOpen;

function SideBar({children}) {

    [open,setOpen]= useState(true);

    toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className="overflow-x-clip overflow-y-auto bg-slate-200">
            <div className={`sticky top-0 transition-all duration-300 ${open ? 'w-[0px]' : 'w-[80vw]'}`}>
                <div className="m-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

export { SideBar, setOpen, toggleOpen };
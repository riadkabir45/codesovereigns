import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"


let open,setOpen;
let toggleOpen;
function getState() {
    return open;
}

function SideBar({ children, state = true }) {

    [open,setOpen]= useState(state);

    toggleOpen = (callback = null) => {
        setOpen(!open);
        if(callback != null)
            callback(open);
    }

    return (
        <div className="bg-slate-200">
            <div className="sticky top-0">
                <ScrollArea className={`h-screen transition-all duration-300 ${ !open ? 'w-[0px]' : 'w-[30vw]'}`}>
                    <div className="m-10">
                        {children}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

export { SideBar, setOpen, toggleOpen };
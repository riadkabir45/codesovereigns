import React from "react";
import laptop from "./laptops.json";

function Title(){
    return(
        <div>
            <h1 className="product-title">{laptop[0].name}</h1>
        </div>
    );
}

export default Title;
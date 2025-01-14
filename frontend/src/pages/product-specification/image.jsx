import React from "react";
import laptop from "./laptops.json";

function Image() {
    return (
        <div>
            <img src={laptop[0].main_image} alt="laptop" className="product-img" />
        </div>
    );
}

export default Image;
import React from "react";
import Image from "./image";
import Title from "./title";
import KeyFeatures from "./KeyFeatures";
import Checkout from "./checkout";
import Specification from "./specification";

function ProductSpecification() {  
    return (
        <div className="container">
            <div className="product-details">
                <div className="left-column">
                    <Image />
                </div>
                <div className="right-column">
                    <Title />
                    <KeyFeatures />
                    <Checkout />
                </div>
            </div>
            <div className="section">
                <Specification />
            </div>
        </div>
    );
}

export default ProductSpecification;


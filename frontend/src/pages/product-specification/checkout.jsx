import React from "react";
import laptop from "./laptops.json";

function Checkout() {
    return (
        <div className="checkout">
            <span className="price">{laptop[0].price}</span>
            <div className="button-group">
                <button className="buy-now">Buy Now</button>
                <button className="add-to-wishlist">Add to Wishlist</button>
            </div>
        </div>
    );
}

export default Checkout;
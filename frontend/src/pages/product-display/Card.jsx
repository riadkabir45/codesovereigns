import React from "react";

function Card(props){
    return(
        <div className="card">
            <img className="homepage-img" src={props.imgURL}/>
            <h2 className="product-heading">{props.name}</h2>
            <ul className="product-description-list">
                <li className="product-description">{props.Processor}</li>
                <li className="product-description">{props.Ram}</li>
                <li className="product-description">{props.Display}</li>
                <li className="product-description">{props.Features}</li>
            </ul>
            <hr className="horizontal-line" />
            <p className="product-price">{props.Price}</p>
            <p className="buy-now">Buy Now</p>
            <p className="add-to-wishlist">Add to Wishlist</p>
            
        </div>
    );
}

export default Card;
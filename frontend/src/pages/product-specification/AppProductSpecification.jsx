import React from "react";
import Image from "./image";
import Title from "./title";
import KeyFeatures from "./KeyFeatures";
import Checkout from "./checkout";
import Specification from "./specification";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ProductSpecification() {

    const [product,setProdcut] = useState([])
    const { productId } = useParams();

    useEffect(() => {
        const fetctData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/laptops/'+productId);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProdcut(data['data']);
                
            } catch (error) {
                console.error('Error fetching product', error);
                
            }
        }
        const intervalId = setInterval(fetctData,500);

        return () => clearInterval(intervalId);
    },[]);
    
    
    return (
        <div className="container">
            <div className="product-details">
                <div className="left-column">
                <img src={product.image} alt="laptop" className="product-img" />
                </div>
                <div className="right-column">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="key-features">{product.description}</p>
                    <Checkout />
                </div>
            </div>
            <Specification>{product.features}</Specification>
        </div>
    );
}

export default ProductSpecification;


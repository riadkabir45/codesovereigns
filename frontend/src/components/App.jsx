import React from "react";
import database from "./database";
import Card from "./Card";
import { useState } from 'react';

function createCard(props){
    return(
        <Card 
            key={props.id}
            imgURL={props.image}
            name={props.name}
            Processor={props.processor}
            Ram={props.ram}
            Display={props.display}
            Features={props.feature}
            Price={props.price}
        />
    );
}

function App(){

    const [laptops,setLaptops] = useState([]);

    fetch('http://localhost:5000/api/laptops').then(response => {
        if(response.ok){
            return response.json();
        }else{
            console.error("Error fetching product list:");
        }
    }).then(data => {
        setLaptops(data['data']);
    })

    console.log(laptops);
    

    return(
        <div>
            <h1 className="heading">Laptops:</h1>
            <div className="products-container">{laptops.map(createCard)}</div>
        </div>
    );
}

export default App;
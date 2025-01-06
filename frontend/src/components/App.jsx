import React from "react";
import database from "./database";
import Card from "./Card";
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/laptops');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLaptops(data['data']);
          } catch (error) {
            console.error("Error fetching product list:", error); 
          }
        };
    
        const intervalId = setInterval(fetchData, 500); 
    
        return () => clearInterval(intervalId); 
      }, []);

    console.log(laptops);
    

    return(
        <div>
            <h1 className="heading">Laptops:</h1>
            <div className="products-container">{laptops.map(createCard)}</div>
        </div>
    );
}

export default App;
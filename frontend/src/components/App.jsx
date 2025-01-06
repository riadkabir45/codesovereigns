import React from "react";
import database from "./database";
import Card from "./Card";

function createCard(props){
    return(
        <Card 
            key={props.id}
            imgURL={props.imgURL}
            name={props.name}
            Processor={props.Processor}
            Ram={props.Ram}
            Display={props.Display}
            Features={props.Features}
            Price={props.Price}
        />
    );
}

function App(){
    return(
        <div>
            <h1 className="heading">Laptops:</h1>
            <div className="products-container">{database.map(createCard)}</div>
        </div>
    );
}

export default App;
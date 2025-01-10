import React from "react";
import laptop from "./laptops.json";

function Specification() {
    const specifications = laptop[0].Specifications;

    return (
        <div>
            <h3 className="specification-heading">Specifications:</h3>
            <ul className="specification">
                {Object.entries(specifications).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Specification;

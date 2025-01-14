import React from "react";
import laptop from "./laptops.json";

function Specification() {
    const specifications = laptop[0].Specifications;

    return (
        <div>
            <h3 className="specification-heading">Specifications:</h3>
            <ul className="specification">
                {Object.entries(specifications).map(([key, value]) => (
                    <div>
                        <li key={key} className="specification-item">
                            <strong>{key}:</strong> {value}
                        </li>
                        <hr className="horizontal-line" />
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Specification;

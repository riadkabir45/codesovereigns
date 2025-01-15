import React from "react";

function Specification({children: features}) {
    
    return (
        <div>
            <h3 className="specification-heading">Specifications:</h3>
            <ul className="specification">
                {features?(
                    features.map(([key, value]) => (
                    <div>
                        <li key={key} className="specification-item">
                            <strong>{key}:</strong> {value}
                        </li>
                        <hr className="horizontal-line" />
                    </div>
                ))
                ):(
                    <p className="loading-message">Loading specifications...</p>
                )}
            </ul>
        </div>
    );
}

export default Specification;

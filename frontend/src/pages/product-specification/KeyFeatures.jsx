import react from 'react';
import laptop from './laptops.json';

function KeyFeatures(){
    return(
        <div>
            <p className="key-features">{laptop[0].description}</p>
        </div>
    )
}

export default KeyFeatures;